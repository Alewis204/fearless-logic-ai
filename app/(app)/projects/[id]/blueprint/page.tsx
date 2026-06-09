"use client";

import { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Check,
  LayoutTemplate,
  Pencil,
  GripVertical,
  Plus,
  X,
  Loader2,
  Sparkles,
  Sun,
  Moon,
  Palette,
} from "lucide-react";

// ─── Mock Blueprint Data ───
interface PageSection {
  type: string;
  label: string;
}

interface BlueprintPage {
  id: string;
  name: string;
  enabled: boolean;
  sections: PageSection[];
  headline?: string;
  cta?: string;
}

interface ColorTheme {
  id: string;
  name: string;
  icon: React.ReactNode;
  colors: string[];
}

const mockPages: BlueprintPage[] = [
  {
    id: "home",
    name: "Home",
    enabled: true,
    sections: [
      { type: "hero", label: "Hero" },
      { type: "features", label: "Features" },
      { type: "cta", label: "CTA" },
    ],
    headline: "Break Through to Your Next Executive Role",
    cta: "Book a Free Discovery Call",
  },
  {
    id: "about",
    name: "About",
    enabled: true,
    sections: [
      { type: "about", label: "About" },
      { type: "credentials", label: "Credentials" },
    ],
    headline: "With 15+ Years of Executive Coaching Experience",
    cta: "Learn My Story",
  },
  {
    id: "services",
    name: "Services",
    enabled: true,
    sections: [
      { type: "pricing", label: "Pricing" },
      { type: "features", label: "Offerings" },
    ],
    headline: "Transform Your Career with Personalized Coaching",
    cta: "View Packages",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    enabled: true,
    sections: [
      { type: "testimonials", label: "Testimonials" },
      { type: "stats", label: "Results" },
    ],
    headline: "What My Clients Say",
    cta: "Read Success Stories",
  },
  {
    id: "contact",
    name: "Contact",
    enabled: true,
    sections: [
      { type: "contact", label: "Contact Form" },
      { type: "cta", label: "Final CTA" },
    ],
    headline: "Ready to Take the Next Step?",
    cta: "Get in Touch",
  },
];

const mockStrategy =
  "Position as the go-to career strategist for ambitious professionals. Your unique angle: personalized roadmaps that bridge the gap between where clients are and where they want to be. Lead with transformation stories in your marketing. Differentiate by offering a proprietary 3-phase framework (Clarify → Accelerate → Excel) that produces measurable results within 90 days.";

const colorThemes: ColorTheme[] = [
  {
    id: "professional-blue",
    name: "Professional Blue",
    icon: <Palette className="h-4 w-4" />,
    colors: ["#2D5A8E", "#1A1A2E", "#F5F7FA", "#FFFFFF", "#E8A838"],
  },
  {
    id: "navy-premium",
    name: "Navy Premium",
    icon: <Moon className="h-4 w-4" />,
    colors: ["#1A1A2E", "#0F766E", "#F5F7FA", "#FFFFFF", "#E8A838"],
  },
  {
    id: "warm-gold",
    name: "Warm Gold",
    icon: <Sun className="h-4 w-4" />,
    colors: ["#E8A838", "#1A1A2E", "#FDF6E3", "#FFFFFF", "#2D5A8E"],
  },
];

const sectionTypeIcons: Record<string, string> = {
  hero: "🖼️",
  features: "📊",
  about: "👤",
  credentials: "📜",
  testimonials: "⭐",
  stats: "📈",
  pricing: "💰",
  cta: "🚀",
  contact: "📧",
};

// ─── Skeleton Components ───
function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-offwhite ${className}`} />;
}

function BlueprintSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-lightgray bg-white p-6">
        <SkeletonBlock className="h-6 w-48 mb-4" />
        <SkeletonBlock className="h-10 w-full mb-3" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-9 w-28" />
          <SkeletonBlock className="h-9 w-32" />
        </div>
      </div>
      <div className="rounded-xl border border-lightgray bg-white p-6">
        <SkeletonBlock className="h-5 w-40 mb-3" />
        <SkeletonBlock className="h-4 w-full mb-2" />
        <SkeletonBlock className="h-4 w-full mb-2" />
        <SkeletonBlock className="h-4 w-3/4" />
      </div>
      <div className="rounded-xl border border-lightgray bg-white p-6">
        <SkeletonBlock className="h-5 w-44 mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-3 flex items-center gap-3">
            <SkeletonBlock className="h-5 w-5 rounded" />
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-6 w-40 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Business Name Card ───
function BusinessNameCard({
  name,
  onChange,
  onRegenerate,
  regenerating,
}: {
  name: string;
  onChange: (val: string) => void;
  onRegenerate: () => void;
  regenerating: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleSave = () => {
    onChange(editValue);
    setEditing(false);
  };

  return (
    <div className="rounded-xl border border-lightgray bg-white p-6 shadow-sm shadow-navy/5">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">
          AI Generated ✓
        </span>
      </div>

      {editing ? (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="input-field flex-1"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <button onClick={handleSave} className="btn-primary btn-sm">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="btn-ghost btn-sm">
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-3">
          <h2 className="text-2xl font-bold text-navy">{name}</h2>
          <button
            onClick={() => {
              setEditValue(name);
              setEditing(true);
            }}
            className="rounded-lg p-1.5 text-midgray hover:bg-offwhite hover:text-darkgray transition-colors"
            aria-label="Edit business name"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button className="btn-cta btn-sm inline-flex items-center gap-1.5">
          <Check className="h-4 w-4" />
          Sounds Good
        </button>
        <button
          onClick={onRegenerate}
          disabled={regenerating}
          className="btn-secondary btn-sm inline-flex items-center gap-1.5"
        >
          <RefreshCw className={`h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
          Regenerate
        </button>
      </div>
    </div>
  );
}

// ─── Strategy Summary Card ───
function StrategySummary({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-lightgray bg-white p-6 shadow-sm shadow-navy/5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💡</span>
        <h3 className="font-semibold text-navy">AI Strategy Brief</h3>
      </div>
      <p className="text-sm text-darkgray/80 leading-relaxed">{content}</p>
    </div>
  );
}

// ─── Site Structure ───
function SiteStructure({
  pages,
  onToggle,
  onRemove,
  onAdd,
  onReorderUp,
  onReorderDown,
  onRename,
}: {
  pages: BlueprintPage[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  onReorderUp: (index: number) => void;
  onReorderDown: (index: number) => void;
  onRename: (id: string, name: string) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="rounded-xl border border-lightgray bg-white p-6 shadow-sm shadow-navy/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-navy">Recommended Pages &amp; Sections</h3>
        <button
          onClick={onAdd}
          className="btn-ghost btn-sm inline-flex items-center gap-1 text-blue"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Page
        </button>
      </div>

      <div className="space-y-3">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={`rounded-lg border p-4 transition-all ${
              page.enabled ? "border-lightgray bg-white" : "border-dashed border-lightgray bg-offwhite/50 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Drag handle */}
              <div className="flex flex-col gap-0.5 cursor-grab text-midgray hover:text-darkgray">
                <button onClick={() => onReorderUp(index)} disabled={index === 0} className="disabled:opacity-30 leading-none text-[10px]">▲</button>
                <button onClick={() => onReorderDown(index)} disabled={index === pages.length - 1} className="disabled:opacity-30 leading-none text-[10px]">▼</button>
              </div>

              {/* Toggle checkbox */}
              <input
                type="checkbox"
                checked={page.enabled}
                onChange={() => onToggle(page.id)}
                className="h-4 w-4 rounded border-lightgray text-blue focus:ring-blue/30"
              />

              {/* Page name */}
              {editingId === page.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => {
                    onRename(page.id, editName);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRename(page.id, editName);
                      setEditingId(null);
                    }
                  }}
                  className="input-field flex-1 py-1 text-sm"
                  autoFocus
                />
              ) : (
                <span
                  className="flex-1 cursor-pointer text-sm font-medium text-navy"
                  onClick={() => {
                    setEditingId(page.id);
                    setEditName(page.name);
                  }}
                >
                  {page.name}
                </span>
              )}

              {/* Remove button */}
              <button
                onClick={() => onRemove(page.id)}
                className="rounded p-1 text-midgray hover:bg-red-50 hover:text-error transition-colors"
                aria-label={`Remove ${page.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Section tags */}
            {page.enabled && (
              <div className="mt-3 flex flex-wrap gap-1.5 pl-11">
                {page.sections.map((section) => (
                  <span
                    key={section.type}
                    className="inline-flex items-center gap-1 rounded-full bg-blue/5 px-2.5 py-1 text-xs text-blue"
                  >
                    {sectionTypeIcons[section.type] || "📄"} {section.label}
                  </span>
                ))}
              </div>
            )}

            {/* Content preview - Headline + CTA */}
            {page.enabled && page.headline && (
              <div className="mt-3 pl-11 border-t border-lightgray/50 pt-2">
                <div className="flex items-center gap-2 text-xs text-darkgray/60">
                  <span className="font-medium">Headline:</span>
                  <span className="truncate">&ldquo;{page.headline}&rdquo;</span>
                </div>
                {page.cta && (
                  <div className="flex items-center gap-2 text-xs text-darkgray/60 mt-1">
                    <span className="font-medium">CTA:</span>
                    <span>{page.cta}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Color Palette Selector ───
function ColorPaletteSelector({
  themes,
  selected,
  onSelect,
}: {
  themes: ColorTheme[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-lightgray bg-white p-6 shadow-sm shadow-navy/5">
      <h3 className="mb-4 font-semibold text-navy">Suggested Color Theme</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            className={`rounded-xl border-2 p-4 transition-all duration-200 ${
              selected === theme.id
                ? "border-navy bg-navy/5 scale-[1.02]"
                : "border-lightgray hover:border-blue/30 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-navy">{theme.icon}</span>
              <span className={`text-sm font-medium ${selected === theme.id ? "text-navy" : "text-darkgray"}`}>
                {theme.name}
              </span>
              {selected === theme.id && <Check className="ml-auto h-4 w-4 text-navy" />}
            </div>

            <div className="flex gap-1.5">
              {theme.colors.map((hex, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border border-lightgray/50 transition-transform duration-200"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Error State ───
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-lightgray py-16 text-center">
      <div className="mb-4 text-4xl">😕</div>
      <h2 className="text-xl font-semibold text-navy">We couldn&apos;t generate a blueprint</h2>
      <p className="mt-2 max-w-md text-sm text-darkgray/70">
        Something went wrong. Try being more specific about your business idea, or start from a template.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link href="/app/templates" className="btn-secondary inline-flex items-center gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Start from Template
        </Link>
      </div>
    </div>
  );
}

// ─── Main Blueprint Page ───
export default function BlueprintReviewPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [businessName, setBusinessName] = useState("Clarity Career Coaching");
  const [pages, setPages] = useState<BlueprintPage[]>(mockPages);
  const [selectedTheme, setSelectedTheme] = useState("professional-blue");
  const [regenerating, setRegenerating] = useState(false);

  // Simulate initial load
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  });

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => setRegenerating(false), 2000);
  };

  const handleTogglePage = (id: string) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  const handleRemovePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage: BlueprintPage = {
      id: newId,
      name: "New Page",
      enabled: true,
      sections: [{ type: "hero", label: "Hero" }],
      headline: "Your Headline Here",
      cta: "Get Started",
    };
    setPages((prev) => [...prev, newPage]);
  };

  const handleReorderUp = (index: number) => {
    if (index === 0) return;
    setPages((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const handleReorderDown = (index: number) => {
    if (index >= pages.length - 1) return;
    setPages((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const handleRenamePage = (id: string, name: string) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const handleApprove = () => {
    router.push(`/app/projects/${projectId}/edit`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-[720px]">
        <div className="mb-6">
          <SkeletonBlock className="h-5 w-48 mb-2" />
          <BlueprintSkeleton />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-[720px] pt-8">
        <ErrorState onRetry={() => setError(false)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px]">
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/app/projects/new"
          className="flex items-center gap-1.5 text-sm font-medium text-darkgray hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-lg font-semibold text-navy">
          Blueprint Preview: {businessName}
        </h1>
      </div>

      {/* Regenerating overlay */}
      {regenerating && (
        <div className="mb-6 rounded-xl border border-blue/30 bg-blue/5 p-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue" />
            <p className="text-sm font-medium text-blue">Regenerating your blueprint...</p>
          </div>
        </div>
      )}

      <div className={`space-y-6 ${regenerating ? "opacity-60 pointer-events-none" : ""}`}>
        {/* 1. Business Name */}
        <BusinessNameCard
          name={businessName}
          onChange={setBusinessName}
          onRegenerate={handleRegenerate}
          regenerating={regenerating}
        />

        {/* 2. Strategy Summary */}
        <StrategySummary content={mockStrategy} />

        {/* 3. Site Structure */}
        <SiteStructure
          pages={pages}
          onToggle={handleTogglePage}
          onRemove={handleRemovePage}
          onAdd={handleAddPage}
          onReorderUp={handleReorderUp}
          onReorderDown={handleReorderDown}
          onRename={handleRenamePage}
        />

        {/* 4. Color Palette */}
        <ColorPaletteSelector
          themes={colorThemes}
          selected={selectedTheme}
          onSelect={setSelectedTheme}
        />
      </div>

      {/* Action Bar */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-lightgray pt-6 sm:flex-row">
        <Link
          href="/app/projects/new"
          className="flex items-center gap-1.5 text-sm font-medium text-darkgray hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back &amp; Edit My Idea
        </Link>

        <button
          onClick={handleApprove}
          disabled={regenerating}
          className="btn-cta inline-flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          Looks Good! Start Editing
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}