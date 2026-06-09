import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const session = await getServerSession(getAuthOptions());

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, email, image")
    // @ts-ignore
    .eq("id", session.user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("tier, status, trial_end")
    // @ts-ignore
    .eq("user_id", session.user.id)
    .single();

  return NextResponse.json({
    ...user,
    subscription: subscription || { tier: "free", status: "none" },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(getAuthOptions());

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, image } = body;

  const { data: user, error } = await supabase
    .from("users")
    .update({ name, image, updated_at: new Date().toISOString() })
    // @ts-ignore
    .eq("id", session.user.id)
    .select("id, name, email, image")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(user);
}
