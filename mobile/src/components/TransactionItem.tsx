import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "@/src/assets/styles/colors";
import { formatDate } from "@/src/assets/styles/untils";
import { Transaction } from "@/src/utils/config";
import { CATEGORY_ICONS } from "@/src/utils/categoryIcons";

interface TransactionItemProps {
    item : Transaction,
    onDelete : (item : Transaction)=>void
}

export const TransactionItem = ({ item, onDelete }: TransactionItemProps) => {
  const isIncome = item.amount >0;
  const iconName = CATEGORY_ICONS[item.category];

  return (
    <View style={styles.transactionCard}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName as any}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>

        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.description}</Text>
        </View>

        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}₹{Math.abs(item.amount).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(new Date(item.createdAt))}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};
