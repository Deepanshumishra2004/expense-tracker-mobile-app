import z from "zod";
const transactionType = z.enum(["INCOME", "EXPENSE"]);
const categoryEnum = z.enum([
    "FOOD",
    "TRANSPORT",
    "SHOPPING",
    "BILLS",
    "ENTERTAINMENT",
    "HEALTH",
    "EDUCATION",
    "TRAVEL",
    "INVESTMENT",
    "SALARY",
    "BUSINESS",
    "TRANSFER",
    "OTHER",
]);
const createUserProfile = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(15),
    profileImage: z.string().url().optional(),
});
const createTransaction = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    amount: z.number().positive(),
    category: categoryEnum,
    transactionType: transactionType,
});
export { createUserProfile, createTransaction };
//# sourceMappingURL=type.js.map