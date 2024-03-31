"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import Login from "../login/page";
import {  useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Logout() {

    const supabase = supabaseForClientComponent;
   
    
    useEffect(() => {
        const handleLogout = async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                toast.error('Error logging out');
            } else {
                toast.success('Logged out successfully');
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