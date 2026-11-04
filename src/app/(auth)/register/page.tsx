"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Camera,
  Lock,
  Eye,
  EyeOff,
  HeartHandshake,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/app/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const user = Object.fromEntries(formData.entries());

  const password = user.password.toString();

  // Password validation
  if (password.length < 6) {
    
    return toast.add({
            type: "error",
            description: "Password must be at least 6 characters!",
          })
  }

  if (!/[A-Z]/.test(password)) {
    return toast.add({
            type: "error",
            description: "Password must contain an uppercase letter!",
          })
  }

  if (!/[a-z]/.test(password)) {
     return toast.add({
            type: "error",
            description: "Password must contain a lowercase letter!",
          })
  }

  const {data, error} = await authClient.signUp.email({
        name: user?.name as string,
        email: user?.email as string,
        image: user?.image as string,
        password: user?.password as string
  })
console.log(data);
  if(error){
     return toast.add({
            type: "error",
            description: error.message || "Registration failed!",
          })
  }

  if(data){
    router.push('/login');
    return toast.add({
            type: "success",
            description: "Account created successfully!",
          })
  }

};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="w-full max-w-md border-0 shadow-xl shadow-slate-200/60">
        <CardHeader className="space-y-3 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <HeartHandshake className="h-8 w-8 text-emerald-600" />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an Account
          </CardTitle>

          <CardDescription>
            Join CareConnect and make a difference in your community.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <Label htmlFor="photoURL">Photo URL</Label>
              <div className="relative">
                <Camera className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="photoURL"
                  name="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="px-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Minimum 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 font-semibold hover:bg-emerald-700"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>

          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;