import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(getAuthOptions());

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Get the original project
    const { data: originalProject, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      // @ts-ignore
      .eq("user_id", session.user.id)
      .single();

    if (fetchError || !originalProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 2. Create a copy (omit id, created_at, updated_at)
    const { id: _, created_at, updated_at, ...duplicateData } = originalProject;
    
    const { data: newProject, error: insertError } = await supabase
      .from("projects")
      .insert([
        {
          ...duplicateData,
          title: `${originalProject.title} (Copy)`,
          status: "draft", // Always start as draft or match original? Design says Card shows duplicate action, usually results in a new draft.
          published_url: null, // Reset published URL
        },
      ])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error("Project Duplication Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to duplicate project" },
      { status: 500 }
    );
  }
}
