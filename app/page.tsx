"use client";
import Dashboard from "./admin/(internal)/dashboard/page";
import Head from "next/head";

export default function Home() {

  return (
    <main className="p-20">
        <Head>
         <title>
          Dashboard B2B
         </title>
       </Head>
      <Dashboard />
    </main>
  );
}
