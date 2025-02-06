"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="w-96 border-2 rounded-xl shadow-2xl p-8">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-4 ">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 mt-5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block mb-1">
              Password
            </Label>
            <div className="flex">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="block mb-1">
              Confirm Password
            </Label>
            <div className="flex">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="password"
                value={confirmPassword}
                placeholder="Enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            Register
          </Button>
          <p className="text-center mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
