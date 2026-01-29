import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/middleware.js";
export declare function signup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function signin(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function me(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=userController.d.ts.map