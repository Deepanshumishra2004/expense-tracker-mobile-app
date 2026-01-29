import { createUserProfile } from "../Types/type.js";
import  type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import type { AuthRequest } from "../middleware/middleware.js";

export async function signup(req : Request, res : Response) {

  console.log("body : ",req.body);
    const parsed = createUserProfile.safeParse(req.body);
    console.log("new>>>>>>")
  if (!parsed.success)
    return res.status(400).json({ message: "Invalid input" });

  const { username, email, password, profileImage } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hash : ",hashedPassword);
  try {
    const user = await prisma.user.create({
      data: { 
        username : username, 
        email : email, 
        password: hashedPassword, 
        profileImage : profileImage ?? null,
    },
    });

    console.log("user : ",user);

    const token = jwt.sign(
      { userId: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    console.log("token : ",token);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch {
    res.status(409).json({ message: "User already exists" });
  }
}

export async function signin(req : Request, res : Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Signin successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
  });
}


export async function me(req: AuthRequest, res: Response) {
  if (!req.userId || !req.email || !req.username) {
    return res.status(401).json({ message: "getting user detail failed" });
  }

  res.json({
    message: "User detail",
    user: {
      id: req.userId,
      username: req.username,
      email: req.email,
    },
  });
}