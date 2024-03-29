"use client";

import { useState } from "react";

export default function CreateB2b() {
  const [creator, setCreator] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const saveBusiness = async () => {
    //
  };
  return (
    <div className="w-full h-96">
      <form
        className="flex flex-col w-96 mx-auto mt-10
                
            "
        onSubmit={(e) => {
          e.preventDefault();
          saveBusiness();
        }}
      >
        <label className="flex flex-col font-bold  uppercase">
          creator Name:
          <input
            type="text"
            className="rounded-lg p-2 text-sm font-medium  border border-gray-200 text-gray-400"
            name="creator"
          />
        </label>
        <label className="flex flex-col font-bold  uppercase">
          Business Name:
          <input
            type="text"
            className="rounded-lg p-2 text-sm font-medium  border border-gray-200 text-gray-400"
            name="name"
          />
        </label>
        <label className="flex flex-col font-bold  uppercase">
          Business Description:
          <input
            type="text"
            className="rounded-lg p-2 text-sm font-medium  border border-gray-200 text-gray-400"
            name="description"
          />
        </label>
        <label className="flex flex-col font-bold  uppercase">
          Business Email:
          <input
            type="text"
            className="rounded-lg p-2 text-sm font-medium  border border-gray-200 text-gray-400"
            name="email"
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className=" text-white font-bold p-2 rounded-lg mt-3 bg-[#2d3748]"
        />
      </form>
    </div>
  );
}
