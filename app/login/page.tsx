import Link from "next/link";
import { LoginForm } from "../form/loginForm";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Admin Panel Signconnect</h1>
        <LoginForm />
        <p className="text-center">Made with ❤ By Inti Bumi</p>
      </div>
    </div>
  );
}
