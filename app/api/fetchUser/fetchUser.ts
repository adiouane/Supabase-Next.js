
// fetch user from database supabase
"use server";

import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import exp from "constants";

const FetchAllUsers = async () => {
    const supabase = createSupabaseForServerComponent();
    
    const { data, error } = await supabase.from("users").select("*");
    
    if (error) {
        throw error;
    }
    
    return data;
    }



const FetchUser = async () => {
    
    

	const supabase = createSupabaseForServerComponent();

	const {
		data: { user },
	} = await supabase.auth.getUser();

    console.log(user);
    return user;

    }

export default FetchUser;

export { FetchAllUsers };
