"use client";
import { LoadingPage } from "./utils/loadingPage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/login");
  return <LoadingPage></LoadingPage>;
}
