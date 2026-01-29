import { COLORS } from "@/src/assets/styles/colors"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

export const PageLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textLight,
  },
})
