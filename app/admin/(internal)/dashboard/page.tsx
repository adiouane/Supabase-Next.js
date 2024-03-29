"use client";

import { useEffect, useState } from "react";
import FetchUser from "@/app/api/fetchUser/fetchUser";
import CreateB2b from "./CreateBussness/page";
import {supabaseForClientComponent} from "@/lib/supabase.client";

export default function Dashboard() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [createNewBusinessModalOpen, setCreateNewBusinessModalOpen] = useState(false);
  // define an object that store all the businesses
  const [businesses, setBusinesses] = useState<any[]>([]);

type Business = {
  name: string;
  email: string;
  created_at: string;
};
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await FetchUser();
      setUser(user?.user_metadata?.username);
      setEmail(user?.email ?? "");
    };
    getCurrentUser();
  }, [user]);

  // fetch businesses from the database 
  useEffect(() => {
    const getBusiness = async () => {
      
	const { data } = await supabaseForClientComponent
		.from("Business")
		.select('*')
    data?.map((business: Business) => {
      setBusinesses((prev) => [...prev, business]);
    });
    setBusinesses(data); // data is an array of businesses
    }
    getBusiness();


  }, [user]);


  return (
    <>
    <div className="p-4 bg-[#1f2b34] w-full">
        <h1 className="text-2xl font-semibold text-white">Welcome, {user}</h1>
    </div>
    <div className="flex flex-row  w-full shadow-md rounded-lg">
      <Aside />

      <section className="flex-1 flex flex-col md:p-6 w-full h-screen ">
        <div className="grid gap-4 md:gap-6 ">
          <div className="flex items-center gap-4 md:gap-6 border-b border-gray-300">
            <h1 className="text-2xl font-semibold">Listings</h1>
            <button
              onClick={() => setCreateNewBusinessModalOpen(true)}
              className="inline-flex items-center justify-center text-sm bg-[#2d3748] text-white font-bold rounded-md px-4 py-2"
            >
              Create new
            </button>
          </div>
          <div className="rounded-lg  shadow-sm  " data-v0-t="card">
            <div className="p-6">
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
                  <table className="w-full  text-sm">
                    {
                      <>
                        {!createNewBusinessModalOpen && (
                          <>
                            <HeaderListings />
                            <Listings businesses={businesses}  user={user} email={email} />
                          </>
                        )}
                      </>
                    }
                  </table>
                  {createNewBusinessModalOpen && <CreateB2b />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

const HeaderListings = () => {
  return (
    <thead className=" border-b-2 ">
      <tr>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[150px]">
          Business name
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
          Creator's email
        </th>
        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[200px]">
          Created at
        </th>
        <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px] text-right">
          Actions
        </th>
      </tr>
    </thead>
  );
};

const Listings = (
  { businesses, user, email } : { businesses: any[], user: string, email: string}
) => {
  return (
    <tbody className="[&amp;_tr:last-child]:border-0">
      {
        businesses?.map((business) => {
          return (
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                {business?.Businessname}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {user}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {email}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {business.created_at}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 flex justify-end gap-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                  <span className="sr-only">Edit</span>
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
        }
      )}
          
          
          </tbody>
      );
};
{/* <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
    Acme Corporation
  </td>
  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    john@example.com
  </td>
  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    2023-02-15 10:23 AM
  </td>
  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 flex justify-end gap-2">
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
      <span className="sr-only">Edit</span>
    </button>
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
</tr> */}

const Aside = () => {
  return (
    <aside className="w-64 bg-primary shadow-md h-screen">
      <div className="flex items-center justify-between p-4">
        <a href="#" className="text-xl font-semibold text-primary-foreground">
          Dashboard
        </a>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        <a
          href="#"
          className="flex items-center gap-2 p-2 rounded-md text-sm font-medium text-primary-foreground bg-primary/90 hover:bg-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-2 p-2 rounded-md text-sm font-medium text-primary-foreground bg-primary/90 hover:bg-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>Users</span>
        </a>
      </nav>
    </aside>
  );
};
