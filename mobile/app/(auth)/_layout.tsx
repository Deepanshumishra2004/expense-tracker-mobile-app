import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { PageLoading } from "@/src/components/PageLoading";
import { getToken } from "../../src/utils/token";

export default function AuthLayout() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = await getToken();
      if (token) router.replace("/(root)");
      setCheckingAuth(false);
    }
    checkAuth();
  }, []);

  if (checkingAuth) return <PageLoading />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
