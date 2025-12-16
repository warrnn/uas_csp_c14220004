import { createClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const supabase = await createClient();

        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }

        if (session) {
            await supabase.auth.signOut();
        }

        return NextResponse.json({ message: "Signed out successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}