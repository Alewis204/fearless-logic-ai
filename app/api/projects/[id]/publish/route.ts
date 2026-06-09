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

  const body = await req.json();
  const { subdomain, customDomain } = body;

  if (!subdomain && !customDomain) {
    return NextResponse.json({ error: "Subdomain or custom domain is required" }, { status: 400 });
  }

  // Check if project exists and belongs to user
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, status")
    .eq("id", id)
    // @ts-ignore
    .eq("user_id", session.user.id)
    .single();

  if (projectError || !project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Publish site
  const { data: publishedSite, error: publishError } = await supabase
    .from("published_sites")
    .upsert({
      project_id: id,
      subdomain: subdomain?.toLowerCase(),
      custom_domain: customDomain?.toLowerCase(),
      ssl_status: "pending",
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (publishError) {
    return NextResponse.json({ error: publishError.message }, { status: 500 });
  }

  // Update project status
  await supabase
    .from("projects")
    .update({ status: "published" })
    .eq("id", id);

  return NextResponse.json({
    url: subdomain ? `https://${subdomain}.fearlesslogic.app` : `https://${customDomain}`,
    sslStatus: publishedSite.ssl_status,
  });
}