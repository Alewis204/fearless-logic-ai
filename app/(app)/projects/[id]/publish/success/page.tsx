"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Rocket, Check, Copy, ExternalLink, ArrowLeft,
  BarChart3, Edit3, Palette, PlusCircle, Share2, Zap
} from "lucide-react";

export default function PublishSuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = params?.id as string;
  const domain = searchParams?.get("domain") || "your-site.fearlesslogic.app";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${domain}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-offwhite to-white px-4">
      <div className="mx-auto max-w-lg text-center">
        {/* Celebration icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal/20 to-blue/20 text-5xl animate-fade-in">
          🎉
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">
          Your site is live!
        </h1>
        <p className="mt-3 text-darkgray/70">
          Your site has been deployed and is accessible at the URL below.
        </p>

        {/* Site URL */}
        <div className="mt-8 rounded-xl border border-lightgray bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Rocket className="h-5 w-5 shrink-0 text-teal" />
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm font-medium text-blue hover:underline"
              >
                {domain}
              </a>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-sm gap-1"
                title="View site"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View Site</span>
              </a>
              <button
                onClick={handleCopy}
                className={`btn-sm inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                  copied
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-lightgray text-darkgray hover:bg-offwhite"
                }`}
              >
                {copied ? (
                  <><Check className="h-4 w-4" /> Copied!</>
                ) : (
                  <><Copy className="h-4 w-4" /> Copy Link</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-midgray">
            What would you like to do next?
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { icon: BarChart3, label: "View Analytics", href: "#", color: "text-blue", desc: "Track your site performance" },
              { icon: Edit3, label: "Continue Editing", href: `/app/projects/${projectId}/edit`, color: "text-teal", desc: "Make changes to your site" },
              { icon: Palette, label: "Change Design", href: `/app/projects/${projectId}/blueprint`, color: "text-gold-dark", desc: "Update your color theme" },
              { icon: PlusCircle, label: "Create Another", href: "/app/projects/new", color: "text-navy", desc: "Start a new project" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-3 rounded-xl border border-lightgray p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${item.color}`} />
                  <div>
                    <p className="text-sm font-semibold text-navy">{item.label}</p>
                    <p className="text-xs text-midgray">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Share on Social */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-full border border-lightgray px-5 py-2 text-sm text-darkgray hover:bg-offwhite transition-colors">
            <Share2 className="h-4 w-4" />
            Share on Social
          </button>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 border-t border-lightgray pt-6">
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-darkgray hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}