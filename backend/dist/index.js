import express from "express";
import cors from "cors";
import { v1 } from "./routes.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/cron.js";
const app = express();
if (process.env.NODE_ENV === "production")
    job.start();
const PORT = parseInt(process.env.PORT || "3000", 10);
app.use(express.json());
app.use(cors());
app.use("/api", rateLimiter);
app.use('/api/v1', v1);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`);
});
//# sourceMappingURL=index.js.map