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

const LoginPage = () => {
    const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const user = Object.fromEntries(formData.entries());

  const password = user.password.toString();

  console.log(user);

  const {data, error} = await authClient.signIn.email({
        email: user?.email as string,
        password: user?.password as string
  })
  if(error){
     return toast.add({
            type: "error",
            description: error.message || "Registration failed!",
          })
  }

  if(data){
    router.push('/')
    return toast.add({
            type: "success",
            description: "Account login successfully!",
          })
  }

};

const handleGoogleLogin = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });

  if (error) {
    console.log("Google Login Failed:", error.message);
    return;
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
            Login Account
          </CardTitle>

          <CardDescription>
            Join CareConnect and make a difference in your community.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">

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
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 font-semibold hover:bg-emerald-700"
            >
              {loading ? (
                "login Account..."
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>

          </form>

          <Button
          onClick={handleGoogleLogin}
           className="w-full my-4">Login With Google</Button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Register
            </Link>
          </p>

        </CardContent>
      </Card>
      
    </div>
    );
};

export default LoginPage;