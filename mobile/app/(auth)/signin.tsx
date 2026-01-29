import axios from "axios";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { BACKEND_URL } from "../../src/utils/config";
import { saveToken, saveUserId } from "../../src/utils/token";
import { styles } from "@/src/assets/styles/auth.styles";
import AuthLayout from "@/src/components/AuthLayout";
import { Link } from "expo-router";
import { Image } from "expo-image";

export default function Signin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignin = async () => {
    const res = await axios.post(`${BACKEND_URL}/user/signin`, data);
    await saveToken(res.data.token);
    await saveUserId(res.data.user.id);
    alert("Signin successful");
  };

  return (
    <AuthLayout>
      <Image source={require("@/src/assets/images/revenue-i3.png")} style={styles.illustration}/>
      <Text style={styles.title}>Welcome Back</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <Link href={"/signup"}>
          <Text style={styles.linkText}>Sign Up</Text>
        </Link>
      </View>
    </AuthLayout>
  );
}
