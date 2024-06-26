"use client";

import { useState } from "react";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import FetchUser from "@/app/api/fetchUser/fetchUser";
import { ToastContainer, toast } from 'react-toastify';


async function createB2b(user_id: string, businessname: string) {

  const { data, error } = await supabaseForClientComponent
    .from("business")
    .insert([
      {
        user_id: user_id,
        name: businessname,
      },
    ]);
  if (error) {
    alert(error.message);
    return error;
  }
  return data;
}

export default function CreateB2b(
  

) {
  const [creator, setCreator] = useState("");
  const [businessname, setbusinessname] = useState("");
  const [email, setEmail] = useState("");

  const saveBusiness = async () => {
    const user = await FetchUser();
    if (user) setCreator(user?.app_metadata?.username);
    if (!user) return alert("User not found");
    if (!businessname) {
      return alert("Please fill all fields");
    }
    createB2b(user?.id, businessname);

    setCreator("");
    setbusinessname("");
    setEmail("");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    toast.success('Business Added successfully');
    
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
          Business Name:
          <input
            type="text"
            className="rounded-lg p-2 text-sm font-medium  border border-gray-200 text-gray-400"
            name="name"
            onChange={(e) => setbusinessname(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className=" text-white font-bold p-2 rounded-lg mt-3 bg-[#2d3748] cursor-pointer hover:bg-[#1a202c]"
          
        />
      </form>
      <ToastContainer />

    </div>
  );
}
