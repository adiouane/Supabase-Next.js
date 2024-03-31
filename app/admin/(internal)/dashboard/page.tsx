"use client";

import { useEffect, useState } from "react";
import CreateB2b from "./CreateBussness/page";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import Listings from "@/components/listing";
import FetchUser from "@/app/api/fetchUser/fetchUser";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [createNewBusinessModalOpen, setCreateNewBusinessModalOpen] =
    useState(false);
  const [isSetUser, setIsSetUser] = useState(false);
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUser() {
      const user = await FetchUser();
      if (user)
        setIsSetUser(true);
      setUser(user?.user_metadata.username);
    }
    fetchUser();
  }, [user]);

  // fetch businesses from the database
  useEffect(() => {
    const getAllBusinesses = async () => {

      const { data } = await supabaseForClientComponent.from("business").select(
        `
          *,
          users (
            *
          )
          `
          );

          if (data) {
            setBusinesses(data);
            console.log("businesses", data);
          }
        };
      

    getAllBusinesses();
  }, [user]);

  return (
    <div className="m-0 p-0">
      <div className="p-4 bg-[#1f2b34] sm:w-[90vw] w-[70vw] rounded-t-md">
        <h1 className="text-2xl font-semibold text-white">
          Welcome,{" "}
          <span className="font-bold  uppercase text-red-500">{user}</span>
        </h1>
      </div>
      <div className="flex flex-row  sm:w-[90vw] w-[70vw] h-[70vh] shadow-md rounded-lg">
        <div className="flex-1 flex flex-col md:p-6 w-full h-full ">
          <div className="grid gap-4 md:gap-6 ">
            <div className="flex items-center gap-4 md:gap-6 border-b border-gray-300 mt-4 p-5">
              <h1 className="text-3xl font-semibold ">Listings</h1>
              <button
                onClick={() => setCreateNewBusinessModalOpen(true)}
                className="inline-flex items-center justify-center text-sm bg-[#2d3748]
                 text-white font-bold rounded-md px-4 py-2"
              >
                Create new
              </button>
            </div>
            <div
              className="rounded-lg  shadow-sm  font-semibold text-sm max-h-[50vh] overflow-auto
             "
              data-v0-t="card"
            >
              <div className="p-6 lg:flex grid max-w-[80vw] sm:max-w-[100%]  ">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <div className="relative w-full overflow-auto ">
                    {createNewBusinessModalOpen && (
                      <button
                        onClick={() => setCreateNewBusinessModalOpen(false)}
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
                          className="w-6 h-6"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}
                    <table className="sm:w-[80vw]  w-full text-[#2d3748] font-semibold ">
                      {
                        <>
                          {!createNewBusinessModalOpen && (
                            <>
                              <HeaderListings />
                              <Listings businesses={businesses} />
                            </>
                          )}
                        </>
                      }
                    </table>
                    {createNewBusinessModalOpen && (
                      <>
                        <button
                          className=" text-sm bg-[#2d3748] text-white font-bold rounded-md  py-2 absolute bottom-56 w-96 left-1/2 transform -translate-x-1/2"
                          onClick={() => setCreateNewBusinessModalOpen(false)}
                        >
                          Cannel
                        </button>
                        <CreateB2b />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HeaderListings = () => {
  return (
    <thead className=" border-b-2 ">
      <tr>
        <th className="h-12 px-4 text-left text-gray-950 text-base font-bold uppercase  ">
          Business name
        </th>
        <th className="h-12 px-4 text-left text-gray-950 text-base font-bold uppercase  ">
          Creator's email
        </th>
        <th className="h-12 px-4 text-left text-gray-950 text-base font-bold uppercase   w-[200px]">
          Created at
        </th>
        <th className="h-12 px-4 text-gray-950 text-base font-bold uppercase   w-[100px] text-right">
          Actions
        </th>
      </tr>
    </thead>
  );
};
