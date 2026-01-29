import { Router } from "express";
import { AuthMiddleware } from "../middleware/middleware.js";
import { createNewTransaction, deleteTransaction, getAllTransaction, getTransaction, summaryTransactions } from "../controllers/transactionController.js";

const createBill = Router();

createBill.get('/transaction/:id',AuthMiddleware, getTransaction);

createBill.get('/transactions/all',AuthMiddleware, getAllTransaction)

createBill.post('/transaction',AuthMiddleware, createNewTransaction)

createBill.delete('/transaction/:id',AuthMiddleware, deleteTransaction);

createBill.get('/summary', AuthMiddleware, summaryTransactions);

export  { createBill };