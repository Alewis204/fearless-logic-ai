import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getAuthOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
});

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
  const { businessType, businessIdea, targetAudience } = body;

  if (!businessType || !businessIdea || !targetAudience) {
    return NextResponse.json(
      { error: "businessType, businessIdea, and targetAudience are required" },
      { status: 400 }
    );
  }

  try {
    const prompt = `
      You are an expert business strategist and web designer. 
      Generate a comprehensive business blueprint and website structure for a new business.
      
      Business Type: ${businessType}
      Business Idea: ${businessIdea}
      Target Audience: ${targetAudience}
      
      Return a JSON object with the following structure:
      {
        "strategy": "A brief marketing and growth strategy (2-3 paragraphs)",
        "structure": ["list", "of", "website", "sections", "e.g.", "hero", "features", "testimonials", "pricing", "faq", "cta"],
        "content": {
          "hero": { "headline": "...", "subheadline": "...", "cta": "..." },
          "features": [ { "title": "...", "description": "..." } ],
          "testimonials": [ { "quote": "...", "author": "..." } ],
          "pricing": [ { "plan": "...", "price": "...", "features": ["..."] } ],
          "faq": [ { "question": "...", "answer": "..." } ],
          "cta": { "headline": "...", "subheadline": "...", "buttonText": "..." }
        },
        "colors": { "primary": "hex code", "secondary": "hex code", "accent": "hex code" },
        "typography": { "heading": "font name", "body": "font name" }
      }
      
      Respond ONLY with the JSON.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates business blueprints in JSON format." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const blueprint = JSON.parse(response.choices[0].message.content || "{}");

    // Update project with the generated blueprint
    const { data: project, error: updateError } = await supabase
      .from("projects")
      .update({
        business_type: businessType,
        business_idea: businessIdea,
        target_audience: targetAudience,
        status: "blueprint_generated",
        blueprint: blueprint,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      // @ts-ignore
      .eq("user_id", session.user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
