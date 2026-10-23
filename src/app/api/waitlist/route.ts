import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { handle, email, category } = body;

    // Validate inputs
    if (!handle || !email) {
      return NextResponse.json(
        { error: "Handle and email are required." },
        { status: 400 }
      );
    }

    const cleanHandle = handle.trim().replace(/^@/, "").toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Handle format check (letters, numbers, underscores)
    if (!/^[a-zA-Z0-9_]{2,30}$/.test(cleanHandle)) {
      return NextResponse.json(
        {
          error:
            "Handle must be 2-30 characters long and contain only letters, numbers, and underscores.",
        },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    // If Supabase credentials are not yet configured in .env.local
    if (!supabase) {
      console.warn(
        "[Waitlist API] Supabase credentials not found in environment. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      // Return simulated success so the frontend continues working while credentials are being setup
      return NextResponse.json({
        success: true,
        isSimulated: true,
        message:
          "Handle reserved! (Note: Supabase credentials are not yet configured in .env.local)",
        data: {
          handle: cleanHandle,
          email: cleanEmail,
          category: category || "General",
        },
      });
    }

    // Check if handle already exists
    const { data: existingHandle, error: handleCheckError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("handle", cleanHandle)
      .maybeSingle();

    if (existingHandle) {
      return NextResponse.json(
        {
          error: `@${cleanHandle} has already been claimed. Please try another handle.`,
        },
        { status: 409 }
      );
    }

    // Insert into Supabase waitlist table
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          handle: cleanHandle,
          email: cleanEmail,
          category: category || "General",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      // Postgres unique violation code 23505
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error:
              "This handle or email has already been registered on the waitlist.",
          },
          { status: 409 }
        );
      }

      console.error("[Waitlist API Error]:", error);
      return NextResponse.json(
        {
          error:
            error.message ||
            "Unable to reserve handle at this moment. Please try again.",
        },
        { status: 500 }
      );
    }

    // Get count of waitlisted users for queue position
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      success: true,
      message: "Handle reserved successfully!",
      queuePosition: (count || 4824) + 1,
      data,
    });
  } catch (err: any) {
    console.error("[Waitlist API Server Exception]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
