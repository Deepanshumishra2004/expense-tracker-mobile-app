import { COLORS } from "@/src/assets/styles/colors";
import { styles } from "@/src/assets/styles/home.styles";
import { Text, View } from "react-native";

interface SummaryProps {
  balance: number;
  income: number;
  expenses: number;
}

interface BalanceCardProps {
  summary: SummaryProps;
}

export const BalanceCard = ({ summary }: BalanceCardProps) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>

      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance.toString()).toFixed(2)}
      </Text>

      <View style={styles.balanceStats}>
        {/* Income */}
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: COLORS.income }
            ]}
          >
            +${parseFloat(summary.income.toString()).toFixed(2)}
          </Text>
        </View>

        {/* Divider */}
        <View style={[styles.balanceStatItem, styles.statDivider]} />

        {/* Expenses */}
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: COLORS.expense }
            ]}
          >
            -${Math.abs(parseFloat(summary.expenses.toString())).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
