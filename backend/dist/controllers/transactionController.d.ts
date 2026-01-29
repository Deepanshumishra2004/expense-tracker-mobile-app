import type { Request, Response } from "express";
export declare function getTransaction(req: Request, res: Response): Promise<void>;
export declare function getAllTransaction(req: Request, res: Response): Promise<void>;
export declare function createNewTransaction(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteTransaction(req: Request, res: Response): Promise<void>;
export declare function summaryTransactions(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=transactionController.d.ts.map