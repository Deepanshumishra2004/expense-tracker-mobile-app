import express, { Router } from "express";
import { createUser } from "./routes/user.js";
import { createBill } from "./routes/bill.js";
const v1 = Router();
v1.use('/user', createUser);
v1.use('/bill', createBill);
export { v1 };
//# sourceMappingURL=routes.js.map