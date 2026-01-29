import axios from "axios";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { BACKEND_URL } from "../../src/utils/config";
import { saveToken, saveUserId } from "../../src/utils/token";
import { styles } from "@/src/assets/styles/auth.styles";
import AuthLayout from "@/src/components/AuthLayout";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/signup`, data);
      await saveToken(res.data.token);
      await saveUserId(res.data.user.id);
      alert("Signup successful");
      router.replace("/(root)");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout>
      <Image source={require("@/src/assets/images/revenue-i1.png")} style={styles.illustration}/>
              <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={data.username}
        onChangeText={(t) => setData({ ...data, username: t })}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={data.email}
        onChangeText={(t) => setData({ ...data, email: t })}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={data.password}
        onChangeText={(t) => setData({ ...data, password: t })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href={"/signin"}>
          <Text style={styles.linkText}>Sign In</Text>
        </Link>
      </View>
    </AuthLayout>
  );
}
