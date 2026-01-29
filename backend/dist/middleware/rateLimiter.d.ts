import type { NextFunction, Response, Request } from "express";
declare const rateLimiter: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default rateLimiter;
//# sourceMappingURL=rateLimiter.d.ts.map