"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  MoreVertical,
  ExternalLink,
  FileText,
  AlertCircle,
  RefreshCw,
  Rocket,
  Eye,
  Star,
} from "lucide-react";

// ─── Types ───
type Project = {
  id: string;
  title: string;
  status: "draft" | "blueprint_generated" | "published";
  created_at: string;
  updated_at: string;
  subdomain?: string;
};

type ProjectWithMeta = Project & {
  relativeTime: string;
};

// ─── Status Config ───
const statusConfig: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  blueprint_generated: {
    label: "Blueprint",
    className: "bg-blue-50 text-blue",
    dot: "bg-blue",
  },
  published: {
    label: "Live",
    className: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
};

// ─── Helpers ───
function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function enrichProjects(projects: Project[]): ProjectWithMeta[] {
  return projects.map((p) => ({
    ...p,
    relativeTime: getRelativeTime(p.updated_at),
  }));
}

// ─── StatCard ───
function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-lightgray bg-white p-4 shadow-sm shadow-navy/5">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold text-navy">{value}</span>
      </div>
      <p className="mt-1 text-sm text-darkgray/70">{label}</p>
    </div>
  );
}

// ─── Skeleton ───
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-lightgray bg-white overflow-hidden">
      <div className="h-40 animate-pulse bg-offwhite" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-offwhite" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-offwhite" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-offwhite" />
      </div>
    </div>
  );
}

function SkeletonStat() {
  return (
    <div className="rounded-xl border border-lightgray bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-8 animate-pulse rounded bg-offwhite" />
        <div className="h-7 w-12 animate-pulse rounded bg-offwhite" />
      </div>
      <div className="mt-2 h-4 w-20 animate-pulse rounded bg-offwhite" />
    </div>
  );
}

// ─── StatusBadge ───
function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

// ─── ProjectCard ───
function ProjectCard({
  project,
  onDelete,
}: {
  project: ProjectWithMeta;
  onDelete: (id: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group rounded-xl border border-lightgray bg-white shadow-sm shadow-navy/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/10 overflow-hidden">
      {/* Thumbnail */}
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-navy/5 to-offwhite">
        {project.status === "published" ? (
          <div className="text-center">
            <Rocket className="mx-auto h-10 w-10 text-teal/40" />
            <span className="mt-1 block text-xs text-midgray">Published</span>
          </div>
        ) : (
          <FileText className="h-10 w-10 text-midgray/40" />
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="truncate font-semibold text-navy">{project.title}</h3>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={project.status} />
              <span className="text-xs text-midgray">{project.relativeTime}</span>
            </div>
          </div>

          {/* Action Menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-1 text-midgray opacity-0 transition-opacity hover:bg-offwhite group-hover:opacity-100"
              aria-label="Project actions"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border border-lightgray bg-white py-1 shadow-lg">
                  <Link
                    href={`/app/projects/${project.id}/edit`}
                    className="block px-4 py-2 text-sm text-darkgray hover:bg-offwhite"
                    onClick={() => setMenuOpen(false)}
                  >
                    Edit
                  </Link>
                  {project.status === "published" && project.subdomain && (
                    <a
                      href={`https://${project.subdomain}.fearlesslogic.app`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-darkgray hover:bg-offwhite"
                      onClick={() => setMenuOpen(false)}
                    >
                      Preview <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <Link
                    href={`/app/projects/${project.id}/settings`}
                    className="block px-4 py-2 text-sm text-darkgray hover:bg-offwhite"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-lightgray" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(project.id);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-error hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subdomain link */}
        {project.status === "published" && project.subdomain && (
          <a
            href={`https://${project.subdomain}.fearlesslogic.app`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block truncate text-xs text-blue hover:underline"
          >
            {project.subdomain}.fearlesslogic.app
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard Page ───
export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ name?: string; subscription?: { tier?: string; trial_end?: string } } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectsRes, profileRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/user/profile"),
      ]);
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(Array.isArray(data) ? data : []);
      } else {
        // API not available — use empty state
        setProjects([]);
      }
      if (profileRes.ok) {
        const data = await profileRes.json();
        setProfile(data);
      }
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This can't be undone.")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // Silently fail
    }
  };

  const displayName = profile?.name || "there";
  const tier = profile?.subscription?.tier || "free";
  const trialEnd = profile?.subscription?.trial_end;
  const trialDaysLeft = trialEnd
    ? Math.ceil((new Date(trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const projectCount = projects.length;
  const liveCount = projects.filter((p) => p.status === "published").length;

  return (
    <div>
      {/* Trial Expiring Banner */}
      {trialDaysLeft !== null && trialDaysLeft > 0 && trialDaysLeft <= 7 && (
        <div className="mb-6 rounded-xl border border-gold/30 bg-gold/5 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gold-dark">
              <strong>Your 14-day free trial ends in {trialDaysLeft} days.</strong> Upgrade to keep your sites live.
            </p>
            <Link
              href="/app/billing"
              className="shrink-0 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark transition-colors"
            >
              Keep Your Sites → Upgrade
            </Link>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Welcome back, {displayName}</h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm text-darkgray/70">Your plan:</span>
          {tier === "free" || tier === "starter" ? (
            <span className="rounded-full bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy">
              Starter Plan
            </span>
          ) : tier === "pro" ? (
            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">
              Pro Plan
            </span>
          ) : tier === "scale" ? (
            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold-dark">
              Scale Plan
            </span>
          ) : (
            <span className="rounded-full bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy">
              Free Trial
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {loading ? (
          <>
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </>
        ) : (
          <>
            <StatCard icon="📄" value={projectCount} label="Projects" />
            <StatCard icon="🚀" value={liveCount} label="Live" />
            <StatCard icon="👁" value="0" label="Views" />
            <StatCard
              icon={<Star className="h-6 w-6 text-gold" />}
              value={tier === "pro" ? "Pro" : tier === "scale" ? "Scale" : "Starter"}
              label="Current Plan"
            />
          </>
        )}
      </div>

      {/* New Project Button */}
      <div className="mb-6">
        <Link
          href="/app/projects/new"
          className="btn-cta inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-xl border border-error/30 bg-error/5 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-error" />
            <p className="text-sm text-error">{error}</p>
            <button
              onClick={fetchData}
              className="ml-auto flex shrink-0 items-center gap-1 rounded-lg border border-error/30 px-3 py-1.5 text-sm font-medium text-error hover:bg-error/5"
            >
              <RefreshCw className="h-3 w-3" />
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-navy">Your Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-lightgray py-16 text-center">
          <Rocket className="mb-4 h-16 w-16 text-midgray/30" />
          <h2 className="text-xl font-semibold text-navy">
            You haven&apos;t created any projects yet
          </h2>
          <p className="mt-2 max-w-md text-sm text-darkgray/70">
            Describe your business idea and launch in minutes! AI will build your entire site.
          </p>
          <Link
            href="/app/projects/new"
            className="btn-cta mt-6 inline-flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            Start Your First Project →
          </Link>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-navy">Your Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrichProjects(projects).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}