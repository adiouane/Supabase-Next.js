import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import Login from "../login/page";

export default function Logout() {
    const supabase = createSupabaseForServerComponent();

    const logout = async () => {
        alert('You have been logged out');
        await supabase.auth.signOut();
    }
    logout();

    return(
        <>
            <Login />
        </>
    )
}