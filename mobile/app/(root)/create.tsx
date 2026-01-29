import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getToken, getUserId } from "../../src/utils/token";
import { useTransaction } from "@/src/hooks/useTransaction";
import { styles } from "@/src/assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/assets/styles/colors";
import { CATEGORIES, Category, TransactionType } from "../../src/utils/config";

export default function Page() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.INCOME,
  );
  const [selectCategory, setSelectCategory] = useState<Category | null>(null);
  const [isExpense, setIsExpense] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);

  const { createNewTransaction } = useTransaction(userId ?? "");

  useEffect(() => {
    async function Token() {
      const result = await Promise.all([getToken(), getUserId()]);
      if (!result) {
        return router.push("/(auth)/signin");
      }
      setToken(result[0]);
      setUserId(result[1]);
    }
    Token();
  }, []);

  const handleCreate = async () => {
    if (!title.trim())
      return Alert.alert("Error", "Please enter a transaction title");
    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Error", "Please enter valid amount");
      return;
    }

    if (!selectCategory)
      return Alert.alert("Error", "Please select  a category");

    try {
      const formatedAmount = isExpense
        ? -Math.abs(numericAmount)
        : Math.abs(numericAmount);
      SetIsLoading(true);
      createNewTransaction({
        title: title,
        description: description,
        amount: formatedAmount,
        category: selectCategory,
      });
      Alert.alert("Success", "Transaction created successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create transaction");
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity
          style={[
            styles.saveButtonContainer,
            isLoading && styles.saveButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text>{isLoading ? "Saving..." : "Save"}</Text>
          {!isLoading ? (
            <Ionicons name="checkmark" size={18} color={COLORS.primary} />
          ) : null}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* EXPENSE */}
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === TransactionType.EXPENSE &&
                styles.typeButtonActive,
            ]}
            onPress={() => {
              setTransactionType(TransactionType.EXPENSE);
              setIsExpense(true);
            }}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={
                transactionType === TransactionType.EXPENSE
                  ? COLORS.white
                  : COLORS.expense
              }
            />
            <Text
              style={
                transactionType != TransactionType.EXPENSE
                  ? styles.typeButtonText
                  : styles.typeButtonTextActive
              }
            >
              Expense
            </Text>
          </TouchableOpacity>

          {/* INCOME */}
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === TransactionType.INCOME &&
                styles.typeButtonActive,
            ]}
            onPress={() => {
              setTransactionType(TransactionType.INCOME);
              setIsExpense(false);
            }}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={
                transactionType === TransactionType.INCOME
                  ? COLORS.white
                  : COLORS.income
              }
            />
            <Text
              style={
                transactionType != TransactionType.EXPENSE
                  ? styles.typeButtonTextActive
                  : styles.typeButtonText
              }
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* AMOUNT CONTAINER */}
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* TITLE CONTAINER */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Tittle"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Description"
            placeholderTextColor={COLORS.textLight}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />
          <Text style={styles.sectionTitle}>Category</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContainer}
          style={styles.categoryScroll}
        >
          {CATEGORIES.map((e) => (
            <TouchableOpacity
              key={e.id}
              style={[
                styles.categoryButton,
                selectCategory === e.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectCategory(e.id)}
            >
              <Ionicons
                name={e.icon}
                size={20}
                color={selectCategory === e.id ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectCategory === e.id && styles.categoryButtonTextActive,
                ]}
              >
                {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
