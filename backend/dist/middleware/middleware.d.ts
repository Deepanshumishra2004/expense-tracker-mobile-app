import type { NextFunction, Response, Request } from "express";
export interface AuthRequest extends Request {
    userId?: string;
    email?: string;
    username?: string;
}
export declare const AuthMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=middleware.d.ts.map