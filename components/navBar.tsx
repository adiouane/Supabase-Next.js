"use client";
import Image from "next/image";
import React from "react";
export default function NavBar() {
  return (
    <nav className="bg-gray-800">
      <header className="flex items-center h-16 border-b px-4 shrink-0 md:px-6">
        <h1 className="text-white text-5xl font-semibold">
          B<span className="text-red-500 text-4xl">2</span>
          <span className="text-white text-2xl font-semibold">B</span>
        </h1>
        <nav className="ml-auto flex items-center gap-4 md:gap-5">
          <button>
            <a
              className=" text-white bg-red-500 px-4 py-2 rounded-md
                "
              href="/logout"
            >
              Logout
            </a>
          </button>
        </nav>
      </header>
    </nav>
  );
}
