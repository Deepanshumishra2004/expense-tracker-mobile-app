import z from "zod";
declare const createUserProfile: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    profileImage: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
declare const createTransaction: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    category: z.ZodEnum<{
        FOOD: "FOOD";
        TRANSPORT: "TRANSPORT";
        SHOPPING: "SHOPPING";
        BILLS: "BILLS";
        ENTERTAINMENT: "ENTERTAINMENT";
        HEALTH: "HEALTH";
        EDUCATION: "EDUCATION";
        TRAVEL: "TRAVEL";
        INVESTMENT: "INVESTMENT";
        SALARY: "SALARY";
        BUSINESS: "BUSINESS";
        TRANSFER: "TRANSFER";
        OTHER: "OTHER";
    }>;
    transactionType: z.ZodEnum<{
        INCOME: "INCOME";
        EXPENSE: "EXPENSE";
    }>;
}, z.z.core.$strip>;
export { createUserProfile, createTransaction };
//# sourceMappingURL=type.d.ts.map