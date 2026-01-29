import { styles } from "@/src/assets/styles/auth.styles";
import { getToken } from "@/src/utils/token";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {

      const router = useRouter();
    
      useEffect(() => {
        async function checkAuth() {
          const token = await getToken();
          if (token) router.replace("/(root)");
        }
        checkAuth();
      }, []);
  return (
    <View style={styles.container}>
      <Image source={require("@/src/assets/images/logo.png")} style={styles.illustration}/>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.footerText}>
        Manage your account securely
      </Text>

      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/signin" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Sign In
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
