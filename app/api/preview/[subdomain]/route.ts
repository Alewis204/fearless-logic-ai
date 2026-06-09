import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  const { subdomain } = await params;

  // 1. Look up published site by subdomain
  const { data: site, error: siteError } = await supabase
    .from("published_sites")
    .select("project_id")
    .eq("subdomain", subdomain)
    .single();

  if (siteError || !site) {
    return new Response("Site not found", { status: 404 });
  }

  // 2. Look up project by project_id
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("title, site_data")
    .eq("id", site.project_id)
    .single();

  if (projectError || !project) {
    return new Response("Project not found", { status: 404 });
  }

  // 3. Render HTML (Placeholder for now)
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${project.title} - Site Preview</title>
      <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; color: #333; background-color: #fcfcfc; }
        header { border-bottom: 2px solid #1a1a2e; padding-bottom: 1rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; }
        h1 { color: #1a1a2e; margin: 0; }
        .badge { background: #e0e7ff; color: #4338ca; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; }
        .site-data { background: #fff; padding: 1.5rem; border-radius: 12px; border: 1px solid #e1e4e8; shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        pre { white-space: pre-wrap; word-wrap: break-word; font-size: 0.85rem; color: #475569; }
        .placeholder-hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 4rem 2rem; border-radius: 12px; text-align: center; margin-bottom: 2rem; }
        .placeholder-hero h2 { font-size: 2.5rem; margin-bottom: 1rem; }
        .btn { background: #e8a838; color: #1a1a2e; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; }
      </style>
    </head>
    <body>
      <header>
        <h1>${project.title}</h1>
        <span class="badge">Preview Mode</span>
      </header>
      <main>
        <div class="placeholder-hero">
          <h2>Welcome to ${project.title}</h2>
          <p>This is a live preview of your AI-generated business.</p>
          <a href="#" class="btn">Get Started</a>
        </div>
        
        <h3>Site Data JSON</h3>
        <div class="site-data">
          ${project.site_data ? `<pre>${JSON.stringify(project.site_data, null, 2)}</pre>` : "<p>No site data generated yet. Start building in the editor!</p>"}
        </div>
      </main>
      <footer style="margin-top: 4rem; text-align: center; color: #94a3b8; font-size: 0.8rem;">
        <p>Built with Fearless Logic AI &bull; Subdomain: ${subdomain}</p>
      </footer>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
