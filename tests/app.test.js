const request = require("supertest");
const express = require("express");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");

/* ---------------- AUTH MIDDLEWARE ---------------- */
const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ---------------- ZOD ---------------- */
const createUserProfile = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  profileImage: z.string().url().optional(),
});

const createTransaction = z.object({
  title: z.string(),
  description: z.string(),
  amount: z.number(),
});

/* ---------------- IN-MEMORY DATABASE ---------------- */
let users = [];
let transactions = [];

/* ---------------- EXPRESS APP ---------------- */
const app = express();
app.use(express.json());

const user = Router();
const bill = Router();

/* ---------------- USER ROUTES ---------------- */
user.post("/signup", async (req, res) => {
  const parsed = createUserProfile.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const { username, email, password, profileImage } = parsed.data;

  if (users.find(u => u.email === email))
    return res.status(409).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: `user-${Date.now()}`, username, email, password: hashed, profileImage };
  users.push(newUser);

  const token = jwt.sign({ userId: newUser.id }, "secret", { expiresIn: "7d" });

  res.status(201).json({ token, user: { id: newUser.id, username, email, profileImage } });
});

user.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const u = users.find(u => u.email === email);
  if (!u) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, u.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: u.id }, "secret", { expiresIn: "7d" });
  res.json({ token, user: { id: u.id, username: u.username, email: u.email, profileImage: u.profileImage } });
});

/* ---------------- TRANSACTION ROUTES ---------------- */
bill.post("/transaction", AuthMiddleware, async (req, res) => {
  const parsed = createTransaction.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const { title, description, amount } = parsed.data;
  const newTx = { id: `tx-${Date.now()}`, userId: req.userId, title, description, amount };
  transactions.push(newTx);

  res.json({ message: "SUCCESS", data: newTx });
});

bill.get("/transaction/:id", AuthMiddleware, (req, res) => {
  const tx = transactions.find(t => t.id === req.params.id && t.userId === req.userId);
  if (!tx) return res.status(404).json({ message: "Not found" });
  res.json({ data: tx });
});

bill.get("/transaction/all", AuthMiddleware, (req, res) => {
  const userTx = transactions.filter(t => t.userId === req.userId);
  if (userTx.length === 0) return res.json({ message: "No Transaction Detail" });
  res.json({ data: userTx });
});

bill.delete("/transaction/:id", AuthMiddleware, (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id && t.userId === req.userId);
  if (index === -1) return res.status(404).json({ message: "Not found" });
  transactions.splice(index, 1);
  res.json({ message: "SUCCESS" });
});

/* ---------------- REGISTER ROUTES ---------------- */
app.use("/api/v1/user", user);
app.use("/api/v1/bill", bill);

/* ---------------- TESTS ---------------- */
describe("FULL API TEST WITH REAL DATA", () => {
  let token;
  let txId;

  it("Signup works", async () => {
    const res = await request(app).post("/api/v1/user/signup").send({
      username: "deep",
      email: "a@a.com",
      password: "password",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("Signin works", async () => {
    const res = await request(app).post("/api/v1/user/signin").send({
      email: "a@a.com",
      password: "password",
    });
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("Create transaction", async () => {
    const res = await request(app)
      .post("/api/v1/bill/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Food", description: "Lunch", amount: 100 });
    expect(res.body.message).toBe("SUCCESS");
    expect(res.body.data.id).toBeDefined();
    txId = res.body.data.id;
  });

  it("Get all transactions", async () => {
    const res = await request(app)
      .get("/api/v1/bill/transaction/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].id).toBe(txId);
  });

  it("Get single transaction", async () => {
    const res = await request(app)
      .get(`/api/v1/bill/transaction/${txId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.data.id).toBe(txId);
  });

  it("Delete transaction", async () => {
    const res = await request(app)
      .delete(`/api/v1/bill/transaction/${txId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.message).toBe("SUCCESS");
  });

  it("Get all transactions empty after delete", async () => {
    const res = await request(app)
      .get("/api/v1/bill/transaction/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.message).toBe("No Transaction Detail");
  });
});
