"use client";
import { useState } from "react";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { set } from "zod";
const Listings = ({
  businesses,
}: {
  businesses: any[];
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newBusiness, setNewBusiness] = useState("");
  const [oldBusinessName, setOldBusinessName] = useState("");


  const deleteBusiness = async (business: any) => {
    const { data, error } = await supabaseForClientComponent
      .from("business")
      .delete()
      .eq("name", business.name)
    if (error) {
      alert(error.message);
      return error;
    } else {
      window.location.reload();
    }
  };

  const editeBusiness = async () => {

    const { data, error } = await supabaseForClientComponent
      .from("business")
      .update({ name: newBusiness })
      .eq("name", oldBusinessName);
    if (error) {
      alert(error.message);
      return error;
    } else {
      window.location.reload();
    }
  };

  const handleClick = (name: string, id: string) => {
    // set old business name to the input field
    // alert(id);
    setOldBusinessName(name);
  };
  return (
    <tbody className="[&amp;_tr:last-child]:border-0 ">
      {businesses?.map((business) => {
        return (
          <tr
          key={business.id} 
          onClick={() => handleClick(business.name, business.id)} // Pass business name to handler

          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 font-semibold text-green-700 text-base ">
              {business?.name}
            </td>
            <td className="p-4 font-semibold text-green-700 text-base ">
              {business?.users.email}
            </td>
            <td className="p-4 font-semibold text-green-700 text-base ">
              {business.created_at}
            </td>
            <td className="p-4 font-semibold  text-base  flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                className="inline-flex flex-col items-center  justify-center whitespace-nowrap rounded-md h-10 w-10 bg-transparent hover:bg-green-600 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                </svg>
                <span
                  
                className="sr-only">Edit</span>
              </button>
              {isEdit && (
                <div className="flex flex-col gap-2 absolute top-16 w-40 sm:96">
                  <input
                    type="text"
                    className="rounded-lg p-2 text-sm font-medium  border border-gray-200 text-gray-400"
                    name="name"
                    onChange={(e) => 

                      setNewBusiness(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      editeBusiness();
                    }}
                    className=" text-white font-bold p-2 rounded-lg mt-3 bg-[#2d3748] cursor-pointer hover:bg-[#1a202c]"
                  >
                    Submit
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  deleteBusiness(business);
                }}
                className="inline-flex items-center  justify-center whitespace-nowrap rounded-md  h-10 w-10 text-red-500 hover:bg-red-500 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span className="sr-only">Delete</span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Listings;
