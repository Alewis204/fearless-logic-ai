import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const { data: user } = await supabase
      .from("users")
      .select("id, name, email")
      .eq("email", email)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const { data: pwRecord } = await supabase
      .from("passwords")
      .select("hash")
      .eq("user_id", user.id)
      .single();

    if (!pwRecord) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, pwRecord.hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Get subscription
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("tier, status, trial_end")
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      subscription: sub || { tier: "free", status: "active" },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}