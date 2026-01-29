import { ReactNode } from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "@/src/assets/styles/auth.styles";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}
