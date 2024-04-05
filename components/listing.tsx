"use client";
import { useState } from "react";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Business {
  id: string;
  name: string;
  users: { email: string };
  created_at: string;
}

const Listings: React.FC<{ businesses: Business[] }> = ({ businesses }) => {
  const [isEdit, setIsEdit] = useState<{ [id: string]: boolean }>({});
  const [editedBusinesses, setEditedBusinesses] = useState<{ [id: string]: string }>({});

  const deleteBusiness = async (business: Business) => {
    try {
      const { data, error } = await supabaseForClientComponent
        .from("business")
        .delete()
        .eq("name", business.name);

      if (data) alert(data + error);

      if (!error) {
        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        toast.success("Business deleted successfully");
      } else {
        toast.error("This business cannot be deleted. Try deleting your own business.");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error occurred while deleting business");
    }
  };

  const editeBusiness = async (businessId: string) => {
    try {
      const { data, error } = await supabaseForClientComponent
        .from("business")
        .update({ name: editedBusinesses[businessId] })
        .eq("id", businessId);

        if (data)
           alert(data + error);

      if (!error) {
        // Refresh the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        toast.success("Business updated successfully");
      } else {
        toast.error("This business cannot be updated. Try updating your own business.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error occurred while updating business:", error);
    }
  };

  const handleEditClick = (businessId: string, name: string) => {
    setIsEdit((prevEditState) => ({ ...prevEditState, [businessId]: true }));
    setEditedBusinesses((prevEditedBusinesses) => ({ ...prevEditedBusinesses, [businessId]: name }));
  };

  return (
    <>
      <tbody>
        {businesses?.map((business) => {
          const { id, name, users, created_at } = business;
          const isEditing = isEdit[id];

          return (
            <tr key={id}>
              <td className="p-4 font-bold border uppercase text-neutral-700  text-sm ">{name}</td>
              <td className="p-4 font-bold border text-green-700  text-sm lowercase">{users.email}</td>
              <td className="p-4 font-bold border text-neutral-700  text-sm lowercase">{created_at}</td>
              <td className="p-4 font-semibold text-base flex justify-end gap-2">
                <button
                  onClick={() => handleEditClick(id, name)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md h-10 w-10 bg-transparent hover:bg-green-600 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                  </svg>
                  <span className="sr-only">Edit</span>
                </button>
                {isEditing && (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      className="rounded-lg p-2 text-sm font-medium border border-gray-200 text-gray-400"
                      value={editedBusinesses[id]}
                      onChange={(e) => setEditedBusinesses((prevEditedBusinesses) => ({ ...prevEditedBusinesses, [id]: e.target.value }))}
                    />
                    <button
                      onClick={() => editeBusiness(id)}
                      className="text-white font-bold p-2 rounded-lg mt-3 bg-[#2d3748] cursor-pointer hover:bg-[#1a202c]"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setIsEdit((prevEditState) => ({ ...prevEditState, [id]: false }))}
                      className="text-white font-bold p-2 rounded-lg bg-red-500 cursor-pointer hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <button
                  onClick={() => deleteBusiness(business)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md h-10 w-10 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
      <ToastContainer />
    </>
  );
};

export default Listings;
