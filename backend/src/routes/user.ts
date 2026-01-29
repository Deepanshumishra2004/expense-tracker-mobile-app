import { Router } from "express";
import { me, signin, signup } from "../controllers/userController.js";
import { AuthMiddleware } from "../middleware/middleware.js";

const createUser = Router();

createUser.post("/signup", signup);

createUser.post("/signin", signin);
createUser.get("/me", AuthMiddleware,me);

export { createUser };