"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  signupUsingPassword,
  authenticateUsingPassword,
} from "@/lib/supabase.auth.client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await authenticateUsingPassword({ email, password });
    if (!error) {
      router.push("/");
      router.refresh();
    } else {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    alert("register");
    const { error }: any = await signupUsingPassword({
      username: username,
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/";
      setIsSignedIn(true);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold uppercase">
                Welcome to
                <span className="text-red-500 text-4xl">
                  {" "}
                  B<span className="text-blue-500 text-3xl">2</span>
                  <span className="text-red-500 text-2xl">B </span>
                </span>
                <span className="text-2xl font-bold uppercase">Dashboard</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="w-full space-y-4 sm:max-w-[400px]">
              <div className="space-y-2">
                {isSignedIn && (
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="username"
                  >
                    Username
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm "
                      id="username"
                      placeholder="example"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </label>
                )}
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
              {!isSignedIn && (
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium  w-full bg-black text-white h-10"
                >
                  Sign in
                </button>
              )}
              {!isSignedIn && (
                <button
                  onClick={() => setIsSignedIn(true)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium  w-full bg-white text-black h-10"
                >
                  Sign up
                </button>
              )}
              {isSignedIn && (
                <button
                  onClick={handleRegister} // Call handleRegister on click
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium  w-full bg-blue-500 text-white h-10"
                >
                  Sign up
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="h-screen w-1/2 bg-red-400">
          <Image
            //login image
            src="https://img.freepik.com/free-photo/business-brainstorming-graph-chart-report-data-concept_53876-41686.jpg?t=st=1711649295~exp=1711652895~hmac=1c777aef83330ebfb5f9012191fb1f21eea01ea5abe7f9212551cdfe4707a729&w=740"
            alt="login"
            width={500}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
}
