import type { Request, Response } from "express";
import { Router } from "express";
import { AuthMiddleware } from "../middleware/middleware.js";
import { createTransaction } from "../Types/type.js";
import { prisma } from "../prisma.js";

export async function getTransaction(req : Request, res : Response){
        const id = req.params.id as string;
    
        const userId = (req as any).userId;
    
        const transactionDetail = await prisma.transaction.findFirst({
            where : {
                id : id,
                userId : userId
            }
        })
    
        res.json({
            data : transactionDetail
        })
}

export async function getAllTransaction(req: Request, res: Response) {
  const userId = (req as any).userId;

  const data = await prisma.transaction.findMany({
    where: { userId }
  });
  console.log("data : ",data);
  return res.json({
    data: data // empty array if no transactions
  });
}


export async function createNewTransaction(req : Request, res : Response){

    const parsed = createTransaction.safeParse(req.body);

    if(!parsed.success)
        return res.status(400).json({ message: "Invalid input" });

    const { title, description, amount, category } = parsed.data;
    console.log("data : ",parsed.data);
    const userId = (req as any).userId;

    const signedAmount = amount >=0 ? Math.abs(amount) : - Math.abs(amount);
    console.log("signedAmount : ",signedAmount);
    try {
        const newTransaction = await prisma.transaction.create({
            data : {
                title : title,
                description : description!,
                amount : signedAmount,
                userId : userId,
                transactionType : signedAmount>=0 ? "INCOME" : "EXPENSE",
                category : category
            }
        })

        res.json({
            message : "new Transaction create : SUCCESS",
            data : newTransaction
        })
        
    } catch (error) {
        res.status(401).json({
            message : "new Transaction create : FAIL"
        })   
    }

}

export async function deleteTransaction(req : Request, res : Response){
    const id = req.params.id as string;

    const userId = (req as any).userId;

    try {
        await prisma.transaction.deleteMany({
            where : {
                id : id,
                userId : userId,
            }
        })
        
        res.json({
            message : `${id} transaction detail delete : SUCCESS`
        })

    } catch (error) {

        res.status(401).json({
            message : `${id} transaction detail delete : FAIL`
        })

    }
}

export async function summaryTransactions(req : Request, res : Response){

    const userId = (req as any).userId;

    const totalIncome = await prisma.transaction.aggregate({
        where : {
            userId : userId,
            amount : { gt : 0 }
        },
        _sum : {
            amount : true
        }
    })

    const income = Math.abs(totalIncome._sum.amount ?? 0);

    const totalExpense = await prisma.transaction.aggregate({
        where : {
            userId : userId,
            amount : { lt : 0 }
        },
        _sum : {
            amount : true
        }
    })

    const expense = Math.abs(totalExpense._sum.amount ?? 0);

    const total_balance = income - expense; 

    res.json({
        balance : total_balance,
        income : income,
        expense : expense
    })
}