"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Login successful!");
      router.push("/");
    }
  };


  return (
    <div className="flex items-center justify-center  h-[calc(100vh-64px)]">
      <div className="w-96 border-2 rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl text-center font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="block mb-1">
              Password
            </Label>
            <div className="flex items-center justify-between">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-3/4"
            />
             <Button onClick={(e) => { 
                e.preventDefault();
                setShowPassword(!showPassword)}}>
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
           </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
