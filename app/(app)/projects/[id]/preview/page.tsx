"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, Loader2, Monitor, Smartphone, Tablet } from "lucide-react";

export default function ProjectPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        } else {
          router.push("/app/dashboard");
        }
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProject();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue" />
      </div>
    );
  }

  if (!project) return null;

  const subdomain = project.published_sites?.[0]?.subdomain;
  const previewUrl = subdomain ? `/api/preview/${subdomain}` : null;

  const iframeWidth = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }[viewMode];

  return (
    <div className="flex flex-col gap-6 text-darkgray">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-lightgray pb-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <Link
            href={`/app/projects/${id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-midgray hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Link>
          <h1 className="text-2xl font-bold text-navy">{project.title} - Preview</h1>
        </div>

        <div className="flex items-center gap-3">
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-sm inline-flex items-center gap-1.5"
            >
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </a>
          )}
          <Link href={`/app/projects/${id}/publish`} className="btn-cta btn-sm">
            Publish Site
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-xl border border-lightgray bg-white p-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-lg bg-offwhite p-1">
            <button
              onClick={() => setViewMode("desktop")}
              className={`rounded-md p-2 transition-all ${
                viewMode === "desktop" ? "bg-white text-navy shadow-sm" : "text-midgray hover:text-darkgray"
              }`}
              title="Desktop View"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("tablet")}
              className={`rounded-md p-2 transition-all ${
                viewMode === "tablet" ? "bg-white text-navy shadow-sm" : "text-midgray hover:text-darkgray"
              }`}
              title="Tablet View"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`rounded-md p-2 transition-all ${
                viewMode === "mobile" ? "bg-white text-navy shadow-sm" : "text-midgray hover:text-darkgray"
              }`}
              title="Mobile View"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
          <span className="ml-2 text-xs font-medium text-midgray uppercase tracking-wider">
            {viewMode} View
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-lightgray bg-offwhite px-3 py-1.5 text-xs font-medium text-darkgray sm:flex">
          <Globe className="h-3.5 w-3.5 text-midgray" />
          <span>{subdomain ? `${subdomain}.fearlesslogic.app` : "Not published yet"}</span>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex justify-center rounded-2xl border-4 border-navy/5 bg-midgray/10 p-4 shadow-inner min-h-[600px]">
        {previewUrl ? (
          <div 
            className="overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300"
            style={{ width: iframeWidth }}
          >
            <iframe
              src={previewUrl}
              className="h-full min-h-[600px] w-full border-none"
              title="Site Preview"
            />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4 text-center p-12 bg-white rounded-xl border-2 border-dashed border-lightgray">
            <div className="text-4xl">🚧</div>
            <div>
              <h3 className="text-lg font-semibold text-navy">No Preview Available</h3>
              <p className="text-sm text-midgray max-w-xs mx-auto mt-1">
                You need to set a subdomain in the Publish settings before you can see a live preview.
              </p>
            </div>
            <Link href={`/app/projects/${id}/publish`} className="btn-primary">
              Go to Publish Settings
            </Link>
          </div>
        )}
      </div>

      {/* Site Data Summary */}
      <div className="rounded-xl border border-lightgray bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-navy text-lg underline underline-offset-4 decoration-navy/20">Site Content Summary</h3>
        {project.site_data ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             {Object.entries(project.site_data).map(([key, value]: [string, any]) => (
               <div key={key} className="rounded-lg bg-offwhite p-4 border border-lightgray/50">
                 <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">{key}</h4>
                 <div className="text-sm text-darkgray line-clamp-3 italic">
                   {typeof value === 'string' ? value : JSON.stringify(value)}
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <p className="text-sm text-midgray italic">No site data generated yet. The AI is still working on your blueprint!</p>
        )}
      </div>
    </div>
  );
}
