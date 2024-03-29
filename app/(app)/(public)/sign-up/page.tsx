"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as Supabase from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { signupUsingPassword } from "@/lib/supabase.auth.client";

export default function Register() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    const {  error } : any = await signupUsingPassword({
      username: username,
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  const SingUpWithGoogle = async () => {
    const {data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data);
    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };




  return (
    <>
          <div className="w-full">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome to the Platform</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="w-full space-y-4 sm:max-w-[400px]">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm "
                  id="username"
                  placeholder="John Doe"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm "
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm "
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={handleRegister}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium  w-full bg-black text-white h-10"
              >
                Sign up
              </button>
              <button
              // sing up with google
               onClick={
                SingUpWithGoogle
               }
                className="inline-flex items-center justify-center rounded-md text-sm font-medium  w-full bg-black text-white h-10"
              >
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}