import SafeScreen from "@/src/components/SafeScreen";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {



  return (
  <SafeScreen>
    <Stack screenOptions={{ headerShown : false }}/>;
  </SafeScreen>  
)}
