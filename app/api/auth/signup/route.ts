import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in Supabase
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([{ name, email }])
      .select()
      .single();

    if (userError) {
      console.error("Failed to create user:", userError);
      return NextResponse.json(
        { error: "Failed to create account. Please try again." },
        { status: 500 }
      );
    }

    // Store password
    await supabase.from("passwords").insert([
      { user_id: user.id, hash: hashedPassword },
    ]);

    // Create free subscription
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14);

    await supabase.from("subscriptions").insert([
      {
        user_id: user.id,
        tier: "free",
        status: "trailing",
        trial_end: trialEnd.toISOString(),
      },
    ]);

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        message: "Account created successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}