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
        <div 
          onClick={() => {
            window.location.href = "/logout";
          }}
        className="ml-auto flex  gap-4 md:gap-5 cursor-pointer">
  
          <button className="text-white font-bold text-sm text-center">
            Logout
          </button>
            <Image
              src="https://cdn0.iconfinder.com/data/icons/user-interface-2063/24/UI_Essential_icon_expanded-57-512.png"
              alt="logout"
              width={20}
              height={20}
              className="object-cover  bg-red-300 rounded-full"
            
            />
       
        </div>
      </header>
    </nav>
  );
}
