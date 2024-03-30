"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import Login from "../login/page";
import {  useEffect } from "react";

export default function Logout() {

    const supabase = supabaseForClientComponent;
   
    
    useEffect(() => {
        const handleLogout = async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert(error.message);
            } else {
                window.location.href = "/login";
            }
        };
        handleLogout();
    }, []);

   
    return(
        <>
            <Login />
        </>
    )
}