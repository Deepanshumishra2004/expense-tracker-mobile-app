import { Router } from "express";
import { AuthMiddleware } from "../middleware/middleware.js";
import { createTransaction } from "../Types/type.js";
import { prisma } from "../prisma.js";
export async function getTransaction(req, res) {
    const id = req.params.id;
    const userId = req.userId;
    const transactionDetail = await prisma.transaction.findFirst({
        where: {
            id: id,
            userId: userId
        }
    });
    res.json({
        data: transactionDetail
    });
}
export async function getAllTransaction(req, res) {
    const userId = req.userId;
    const data = await prisma.transaction.findMany({
        where: {
            userId: userId
        }
    });
    if (data.length === 0) {
        res.json({
            message: "No Transaction Detail"
        });
    }
    else {
        res.json({
            data: data
        });
    }
}
export async function createNewTransaction(req, res) {
    const parsed = createTransaction.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: "Invalid input" });
    const { title, description, amount, category } = parsed.data;
    const userId = req.userId;
    const signedAmount = amount >= 0 ? Math.abs(amount) : -Math.abs(amount);
    console.log("signedAmount : ", signedAmount);
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                title: title,
                description: description,
                amount: signedAmount,
                userId: userId,
                transactionType: signedAmount >= 0 ? "INCOME" : "EXPENSE",
                category: category
            }
        });
        res.json({
            message: "new Transaction create : SUCCESS",
            data: newTransaction
        });
    }
    catch (error) {
        res.status(401).json({
            message: "new Transaction create : FAIL"
        });
    }
}
export async function deleteTransaction(req, res) {
    const id = req.params.id;
    const userId = req.userId;
    try {
        await prisma.transaction.deleteMany({
            where: {
                id: id,
                userId: userId,
            }
        });
        res.json({
            message: `${id} transaction detail delete : SUCCESS`
        });
    }
    catch (error) {
        res.status(401).json({
            message: `${id} transaction detail delete : FAIL`
        });
    }
}
export async function summaryTransactions(req, res) {
    const userId = req.userId;
    const totalIncome = await prisma.transaction.aggregate({
        where: {
            userId: userId,
            amount: { gt: 0 }
        },
        _sum: {
            amount: true
        }
    });
    const income = Math.abs(totalIncome._sum.amount ?? 0);
    const totalExpense = await prisma.transaction.aggregate({
        where: {
            userId: userId,
            amount: { lt: 0 }
        },
        _sum: {
            amount: true
        }
    });
    const expense = Math.abs(totalExpense._sum.amount ?? 0);
    const total_balance = income - expense;
    res.json({
        balance: total_balance,
        income: income,
        expense: expense
    });
}
//# sourceMappingURL=transactionController.js.map