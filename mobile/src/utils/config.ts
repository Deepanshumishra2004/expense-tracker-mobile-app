export const BACKEND_URL = process.env.BACKEND_URL;

export enum Category {
  FOOD = "FOOD",
  TRANSPORT = "TRANSPORT",
  SHOPPING = "SHOPPING",
  BILLS = "BILLS",
  ENTERTAINMENT = "ENTERTAINMENT",
  HEALTH = "HEALTH",
  EDUCATION = "EDUCATION",
  TRAVEL = "TRAVEL",
  INVESTMENT = "INVESTMENT",
  SALARY = "SALARY",
  BUSINESS = "BUSINESS",
  TRANSFER = "TRANSFER",
  OTHER = "OTHER",
}

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.FOOD]: "fast-food",
  [Category.TRANSPORT]: "car",
  [Category.SHOPPING]: "cart",
  [Category.BILLS]: "receipt",
  [Category.ENTERTAINMENT]: "film",
  [Category.HEALTH]: "medical",
  [Category.EDUCATION]: "school",
  [Category.TRAVEL]: "airplane",
  [Category.INVESTMENT]: "trending-up",
  [Category.SALARY]: "cash",
  [Category.BUSINESS]: "briefcase",
  [Category.TRANSFER]: "swap-horizontal",
  [Category.OTHER]: "ellipsis-horizontal",
};

export type CategoryItem = {
  id: Category;
  name: string;
  icon: any;
};

export const CATEGORIES : CategoryItem[] = [
  { id: Category.FOOD, name: "Food & Drinks", icon: CATEGORY_ICONS[Category.FOOD] },
  { id: Category.TRANSPORT, name: "Transport", icon: CATEGORY_ICONS[Category.TRANSPORT] },
  { id: Category.SHOPPING, name: "Shopping", icon: CATEGORY_ICONS[Category.SHOPPING] },
  { id: Category.BILLS, name: "Bills", icon: CATEGORY_ICONS[Category.BILLS] },
  { id: Category.ENTERTAINMENT, name: "Entertainment", icon: CATEGORY_ICONS[Category.ENTERTAINMENT] },
  { id: Category.HEALTH, name: "Health", icon: CATEGORY_ICONS[Category.HEALTH] },
  { id: Category.EDUCATION, name: "Education", icon: CATEGORY_ICONS[Category.EDUCATION] },
  { id: Category.TRAVEL, name: "Travel", icon: CATEGORY_ICONS[Category.TRAVEL] },
  { id: Category.INVESTMENT, name: "Investment", icon: CATEGORY_ICONS[Category.INVESTMENT] },
  { id: Category.SALARY, name: "Salary", icon: CATEGORY_ICONS[Category.SALARY] },
  { id: Category.BUSINESS, name: "Business", icon: CATEGORY_ICONS[Category.BUSINESS] },
  { id: Category.TRANSFER, name: "Transfer", icon: CATEGORY_ICONS[Category.TRANSFER] },
  { id: Category.OTHER, name: "Other", icon: CATEGORY_ICONS[Category.OTHER] },
];


export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE"
}

export interface TransactionTypeProps {
    TransactionType : TransactionType;
    category : Category;
}

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  amount: number;
  category: Category;
  transactionType: TransactionType;
  createdAt: string; // backend JSON
  updatedAt: string;
}

export interface NewTransaction {
  title: string;
  description: string;
  amount: number;
  category: Category;
  transactionType: TransactionType;
}
