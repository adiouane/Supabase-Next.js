"use client";
import Dashboard from "./admin/(internal)/dashboard/page";
import Head from "next/head";

export default function Home() {
  return (
    <main className="sm:p-20 p-14 h-screen">
      <Head>
        <title>Dashboard B2B</title>
      </Head>
      <Dashboard />
    </main>
  );
}
