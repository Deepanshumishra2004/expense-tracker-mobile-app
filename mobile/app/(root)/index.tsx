import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  deleteToken,
  deleteUserId,
  getToken,
  getUserId,
} from "../../src/utils/token";
import { router, useRouter } from "expo-router";
import { useTransaction } from "@/src/hooks/useTransaction";
import { PageLoading } from "@/src/components/PageLoading";
import { styles } from "@/src/assets/styles/home.styles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "@/src/components/BalanceCard";
import { NoTransactionFound } from "@/src/components/NoTransactionFound";
import { Transaction } from "../../src/utils/config";
import { TransactionItem } from "@/src/components/TransactionItem";
import { COLORS } from "../../src/assets/styles/colors";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function Token() {
      const result = await Promise.all([getToken(), getUserId()]);
      if (!result) {
        return router.push("/(auth)/signin");
      }
      if (!result[0] || !result[1]) {
        return router.push("/(auth)/signin");
      }
      setToken(result[0]);
      setUserId(result[1]);
    }
    Token();
  }, []);

    const {
    transaction,
    summary,
    isLoading,
    loadingData,
    deleteTransaction,
    user,
    } = useTransaction(userId ?? "");

    useEffect(() => {
    loadingData();
    }, []);

    if (!userId) {
    return <PageLoading />;
    }

    if (isLoading && !refreshing) {
    return <PageLoading />;
    }


  const onRefesh = async () => {
    setRefreshing(true);
    await loadingData();
    setRefreshing(false);
  };



  console.log("userId : ", userId);
  console.log("token : ", token);

  function handleSignOut() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await deleteToken();
          await deleteUserId();
          router.push("/(auth)/signin");
        },
      },
    ]);
  }

  function handleDelete(item: Transaction) {
    Alert.alert(
      "delete",
      `Are you sure you want to delete transaction : ${item.id} ?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(item.id);
            await loadingData();
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("@/src/assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              {user?.email && (
                <Text style={styles.usernameText}>{user.email}</Text>
              )}
              {user?.username && (
                <Text style={styles.usernameText}>{user.username}</Text>
              )}
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color={"#FFF"} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <BalanceCard summary={summary} />
        </View>
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transaction}
        renderItem={({ item }) => (
          <TransactionItem
            item={item as any}
            onDelete={() => handleDelete(item)}
          />
        )}
        ListEmptyComponent={<NoTransactionFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefesh} />
        }
      />
    </View>
  );
}
