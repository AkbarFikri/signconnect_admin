"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "../utils/loadingPage";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setLoading(false);
        router.push("/dashboard");
      } else {
        setLoading(false);
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  //   if (loading) {
  //     return <LoadingPage></LoadingPage>;
  //   }
  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          className="w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      {loading && (
        <div className="w-full">
          <Button className="w-full " size="lg">
            <div className="border-slate-100 h-5 w-5 animate-spin rounded-full border-[3px] border-t-purple-400"></div>
          </Button>
        </div>
      )}
      {!loading && (
        <div className="w-full">
          <Button className="w-full" size="lg">
            Login
          </Button>
        </div>
      )}
    </form>
  );
};
