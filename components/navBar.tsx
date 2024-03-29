"use client";
import React from "react";
export default function NavBar() {
  return (
    <nav className="bg-gray-800">
        <header className="flex items-center h-16 border-b px-4 shrink-0 md:px-6">
              <a className="text-lg text-white font-semibold" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
                <span className="sr-only">Acme Inc</span>
              </a>
              <nav className="ml-auto flex items-center gap-4 md:gap-5">
                <a className=" text-white font-medium" href="#">
                  Listings
                </a>
                <a className=" text-white  dark:text-gray-400" href="#">
                  Settings
                </a>
                <a className=" text-white  dark:text-gray-400" href="#">
                  Support
                </a>
                <button>
            <a className=" text-white hover:text-blue-800" href="/logout">
              Logout
            </a>
          </button>
              </nav>
            </header>
    </nav>
  );
}
