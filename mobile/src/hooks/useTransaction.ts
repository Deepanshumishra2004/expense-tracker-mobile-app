import { BACKEND_URL, Transaction } from "@/src/utils/config";
import { getToken } from "@/src/utils/token";
import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native";



interface NewTransactionProps {
    title: string,
    description: string,
    amount: number,
    category: Category,
}

enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE"
}

enum Category {
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

export const useTransaction = (id: string) => {
    const [user, setUser] = useState({
        username: "",
        id: "",
        email: ""
    });

    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0
    });
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getToken().then(setToken);
    }, []);

    useEffect(() => {
        if (token) fetchMe();
    }, [token]);

    const normalizeTransaction = (tx: Transaction): Transaction => ({
        ...tx,
        createdAt: tx.createdAt,
        updatedAt: tx.updatedAt
    });

    const fetchMe = useCallback(async () => {

        if (!token) return;

        const response = await axios.get(`${BACKEND_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUser(response.data.user)
    }, [token])

    const fetchSummary = useCallback(async () => {

        if (!token) return;

        try {
            const response = await axios.get(`${BACKEND_URL}/bill/summary`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            setSummary({
                balance: data.balance,
                income: data.income,
                expenses: data.expense
            });
        } catch (error) {
            console.error("Error fetching summary : ", error);
        }
    }, [token]);

    const getAllTransaction = useCallback(async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${BACKEND_URL}/bill/transactions/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data.data as Transaction[];
            setTransaction(data.map(normalizeTransaction));
        } catch (error) {
            console.error("Error fetching all transaction : ", error)
        }
    }, [token])

    const deleteTransaction = useCallback(async (id: string) => {
        if (!token) return;

        try {
            const response = await axios.delete(`${BACKEND_URL}/bill/transaction/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await loadingData();
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (error) {
            console.error("Error deleting transaction : ", error);
            Alert.alert("Error", "Failed to delete transaction");
        }
    }, [token])

    const createNewTransaction = useCallback(async (payload: NewTransactionProps) => {
        if (!token) return;

        try {
            const response = await axios.post(`${BACKEND_URL}/bill/transaction`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data = response.data as Transaction;

            setTransaction((e) => [...e, normalizeTransaction(data)]);
        } catch (error) {
            console.error("Error fetching all transaction : ", error)
        }
    }, [token])

    const loadingData = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);

        try {
            await Promise.all([fetchSummary(), getAllTransaction()]);
        } catch (error) {
            console.error("Error loading data : ", error);
        } finally {
            setIsLoading(false);
        }
    }, [getAllTransaction, fetchSummary, token])

    useEffect(() => {
        if (token) loadingData();
    }, [token, loadingData])

    return {
        transaction,
        summary,
        isLoading,
        loadingData,
        deleteTransaction,
        user,
        createNewTransaction
    }
}