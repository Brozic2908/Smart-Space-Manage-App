import { useRouter } from "expo-router";

export default function logout() {
  const router = useRouter();
  return router.replace("/(auth)");
}
