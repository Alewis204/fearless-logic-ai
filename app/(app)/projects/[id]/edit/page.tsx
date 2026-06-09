"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Monitor, Tablet, Smartphone, Undo2, Redo2,
  Eye, Globe, Plus, X, GripVertical, Trash2, ChevronDown,
  Palette, AlignLeft, Type, Image, Columns3, Layers,
  Check, Loader2, Sparkles, LayoutTemplate, Star, DollarSign,
  HelpCircle, Send, Camera, Users, Link2, Menu,
} from "lucide-react";
import PublishModal from "./components/PublishModal";

// ─── Types ───
type SectionType =
  | "hero" | "features" | "about" | "testimonials" | "pricing"
  | "faq" | "cta" | "contact" | "gallery" | "stats" | "team" | "footer";

interface EditorSection {
  id: string;
  type: SectionType;
  props: Record<string, any>;
}

interface EditorPage {
  id: string;
  name: string;
  sections: EditorSection[];
}

// ─── Section Registry ───
const SECTION_REGISTRY: { type: SectionType; name: string; icon: string; desc: string }[] = [
  { type: "hero", name: "Hero", icon: "🖼️", desc: "Full-width headline with CTA" },
  { type: "features", name: "Features Grid", icon: "📊", desc: "3-column feature showcase" },
  { type: "about", name: "About", icon: "👤", desc: "Your story with image" },
  { type: "testimonials", name: "Testimonials", icon: "⭐", desc: "Client success stories" },
  { type: "pricing", name: "Pricing Table", icon: "💰", desc: "3-tier pricing comparison" },
  { type: "faq", name: "FAQ", icon: "❓", desc: "Expandable Q&A" },
  { type: "cta", name: "CTA Banner", icon: "🚀", desc: "Call-to-action section" },
  { type: "contact", name: "Contact Form", icon: "📧", desc: "Contact form with info" },
  { type: "gallery", name: "Gallery Grid", icon: "🖼️", desc: "Image gallery layout" },
  { type: "stats", name: "Stats", icon: "📈", desc: "Number statistics row" },
  { type: "team", name: "Team", icon: "👥", desc: "Profile cards" },
  { type: "footer", name: "Footer", icon: "🔗", desc: "Links & social icons" },
];

// ─── Mock Data ───
function createMockPages(): EditorPage[] {
  return [
    {
      id: "page-1",
      name: "Home",
      sections: [
        { id: "sec-hero", type: "hero", props: { headline: "Break Through to Your Next Executive Role", subtitle: "Personalized career coaching for ambitious professionals", cta: "Book a Free Discovery Call", bgColor: "#1A1A2E", layout: "full-width", textColor: "#FFFFFF", textAlign: "center", padding: "lg" } },
        { id: "sec-features", type: "features", props: { columns: 3, items: [{ title: "1:1 Coaching", desc: "Personal roadmap" }, { title: "Resume Rewriting", desc: "Executive polish" }, { title: "Interview Prep", desc: "Land the role" }] } },
        { id: "sec-cta-1", type: "cta", props: { headline: "Ready to Level Up?", buttonText: "Get Started", bgColor: "#0F766E" } },
      ],
    },
    {
      id: "page-2",
      name: "About",
      sections: [
        { id: "sec-about-1", type: "about", props: { title: "About Me", body: "With 15+ years of executive coaching experience..." } },
        { id: "sec-stats-1", type: "stats", props: { items: [{ label: "Clients", value: "500+" }, { label: "Years", value: "15" }, { label: "Success Rate", value: "94%" }, { label: "Countries", value: "12" }] } },
      ],
    },
    {
      id: "page-3",
      name: "Services",
      sections: [
        { id: "sec-pricing-1", type: "pricing", props: { plans: [{ name: "Starter", price: "$199", features: ["1 session", "Resume review"] }, { name: "Pro", price: "$499", features: ["4 sessions", "Full rewrite"] }, { name: "Executive", price: "$999", features: ["8 sessions", "All inclusive"] }] } },
      ],
    },
    {
      id: "page-4",
      name: "Testimonials",
      sections: [
        { id: "sec-test-1", type: "testimonials", props: { items: [{ name: "Sarah J.", role: "VP Marketing", quote: "Landing my dream role in 6 weeks" }, { name: "Michael T.", role: "Director of Ops", quote: "Transformational coaching experience" }, { name: "Priya K.", role: "CTO", quote: "Worth every penny and more" }] } },
      ],
    },
    {
      id: "page-5",
      name: "Contact",
      sections: [
        { id: "sec-contact-1", type: "contact", props: { email: "hello@claritycareer.com", phone: "+1 (555) 123-4567" } },
        { id: "sec-footer-1", type: "footer", props: { copyright: "© 2025 Clarity Career Coaching" } },
      ],
    },
  ];
}

// ─── Section Preview Components ───
function HeroPreview({ props }: { props: Record<string, any> }) {
  return (
    <div className="rounded-lg p-6 text-center" style={{ backgroundColor: props.bgColor || "#1A1A2E" }}>
      <div className="mx-auto max-w-lg">
        <div className="h-4 w-3/4 mx-auto rounded bg-white/20 mb-3" />
        <div className="h-3 w-full mx-auto rounded bg-white/10 mb-2" />
        <div className="h-3 w-2/3 mx-auto rounded bg-white/10 mb-4" />
        <div className="mx-auto h-9 w-44 rounded-lg bg-teal" />
      </div>
      <div className="mt-1 text-[10px] text-white/40">{props.headline}</div>
    </div>
  );
}

function FeaturesPreview({ props }: { props: Record<string, any> }) {
  const items = props.items || [];
  return (
    <div className="rounded-lg bg-offwhite p-4">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, 1fr)` }}>
        {items.map((item: any, i: number) => (
          <div key={i} className="rounded-lg bg-white p-3 text-center">
            <div className="mx-auto h-8 w-8 rounded-lg bg-blue/10 mb-2" />
            <div className="h-3 w-3/4 mx-auto rounded bg-navy/10 mb-1" />
            <div className="h-2 w-full mx-auto rounded bg-navy/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPreview({ props }: { props: Record<string, any> }) {
  return (
    <div className="flex gap-4 rounded-lg bg-white p-4">
      <div className="h-20 w-20 shrink-0 rounded-lg bg-offwhite" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-navy/10" />
        <div className="h-3 w-full rounded bg-navy/5" />
        <div className="h-3 w-full rounded bg-navy/5" />
        <div className="h-3 w-2/3 rounded bg-navy/5" />
      </div>
    </div>
  );
}

function TestimonialsPreview({ props }: { props: Record<string, any> }) {
  const items = props.items || [];
  return (
    <div className="grid gap-3 rounded-lg bg-white p-4 sm:grid-cols-3">
      {items.slice(0, 3).map((item: any, i: number) => (
        <div key={i} className="rounded-lg border border-lightgray p-3">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (<div key={s} className="h-3 w-3 rounded-full bg-gold/30" />))}
          </div>
          <div className="h-3 w-full rounded bg-navy/5 mb-1" />
          <div className="h-3 w-3/4 rounded bg-navy/5 mb-2" />
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-navy/10" />
            <div className="h-2 w-16 rounded bg-navy/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingPreview({ props }: { props: Record<string, any> }) {
  const plans = props.plans || [];
  return (
    <div className="grid gap-3 rounded-lg bg-white p-4 sm:grid-cols-3">
      {plans.map((plan: any, i: number) => (
        <div key={i} className={`rounded-lg border p-4 text-center ${i === 1 ? 'border-teal' : 'border-lightgray'}`}>
          <div className="h-3 w-16 mx-auto rounded bg-navy/10 mb-2" />
          <div className="h-5 w-20 mx-auto rounded bg-navy/20 mb-3" />
          <div className="space-y-1.5">
            {(plan.features || []).slice(0, 3).map((f: string, j: number) => (
              <div key={j} className="h-2 w-3/4 mx-auto rounded bg-navy/5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQPreview() {
  return (
    <div className="space-y-2 rounded-lg bg-white p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-lightgray p-3">
          <div className="flex items-center justify-between">
            <div className="h-3 w-3/4 rounded bg-navy/10" />
            <ChevronDown className="h-4 w-4 text-midgray" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CTAPreview({ props }: { props: Record<string, any> }) {
  return (
    <div className="rounded-lg p-6 text-center" style={{ backgroundColor: props.bgColor || "#0F766E" }}>
      <div className="mx-auto max-w-md">
        <div className="h-4 w-2/3 mx-auto rounded bg-white/20 mb-3" />
        <div className="h-3 w-full mx-auto rounded bg-white/10 mb-4" />
        <div className="mx-auto h-9 w-40 rounded-lg bg-white/90" />
      </div>
    </div>
  );
}

function ContactPreview() {
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="h-3 w-1/4 rounded bg-navy/10" />
          <div className="h-8 w-full rounded-lg border border-lightgray" />
          <div className="h-3 w-1/4 rounded bg-navy/10" />
          <div className="h-8 w-full rounded-lg border border-lightgray" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-1/4 rounded bg-navy/10" />
          <div className="h-20 w-full rounded-lg border border-lightgray" />
        </div>
      </div>
      <div className="mt-3 h-9 w-28 rounded-lg bg-navy/80" />
    </div>
  );
}

function GalleryPreview() {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-offwhite p-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-square rounded-lg bg-white border border-lightgray" />
      ))}
    </div>
  );
}

function StatsPreview({ props }: { props: Record<string, any> }) {
  const items = props.items || [];
  return (
    <div className="grid grid-cols-4 gap-4 rounded-lg bg-white p-6 text-center">
      {items.map((item: any, i: number) => (
        <div key={i}>
          <div className="h-5 w-16 mx-auto rounded bg-navy/20 mb-1" />
          <div className="h-3 w-12 mx-auto rounded bg-navy/10" />
        </div>
      ))}
    </div>
  );
}

function TeamPreview() {
  return (
    <div className="grid grid-cols-4 gap-3 rounded-lg bg-white p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-offwhite mb-2" />
          <div className="h-3 w-3/4 mx-auto rounded bg-navy/10 mb-1" />
          <div className="h-2 w-1/2 mx-auto rounded bg-navy/5" />
        </div>
      ))}
    </div>
  );
}

function FooterPreview({ props }: { props: Record<string, any> }) {
  return (
    <div className="rounded-lg bg-navy p-4">
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-12 rounded bg-white/20" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="mt-4 h-3 w-48 mx-auto rounded bg-white/10" />
    </div>
  );
}

const sectionPreviewMap: Record<SectionType, React.FC<{ props: Record<string, any> }>> = {
  hero: HeroPreview,
  features: FeaturesPreview,
  about: AboutPreview,
  testimonials: TestimonialsPreview,
  pricing: PricingPreview,
  faq: FAQPreview,
  cta: CTAPreview,
  contact: ContactPreview,
  gallery: GalleryPreview,
  stats: StatsPreview,
  team: TeamPreview,
  footer: FooterPreview,
};

// ─── Section Property Panel ───
function SectionProperties({ section, onUpdate }: { section: EditorSection; onUpdate: (props: Record<string, any>) => void }) {
  const props = section.props;

  const updateProp = (key: string, value: any) => {
    onUpdate({ ...props, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-midgray mb-3">Content</h4>
        {section.type === "hero" && (
          <>
            <PropertyField label="Headline" value={props.headline || ""} onChange={(v: string) => updateProp("headline", v)} />
            <PropertyField label="Subtitle" value={props.subtitle || ""} onChange={(v: string) => updateProp("subtitle", v)} />
            <PropertyField label="CTA Text" value={props.cta || ""} onChange={(v: string) => updateProp("cta", v)} />
          </>
        )}
        {section.type === "cta" && (
          <>
            <PropertyField label="Headline" value={props.headline || ""} onChange={(v: string) => updateProp("headline", v)} />
            <PropertyField label="Button Text" value={props.buttonText || ""} onChange={(v: string) => updateProp("buttonText", v)} />
          </>
        )}
        {section.type === "about" && (
          <>
            <PropertyField label="Title" value={props.title || ""} onChange={(v: string) => updateProp("title", v)} />
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-darkgray">Body</label>
              <textarea className="input-field h-20 resize-none text-xs" value={props.body || ""} onChange={(e) => updateProp("body", e.target.value)} />
            </div>
          </>
        )}
      </div>

      {section.type !== "faq" && section.type !== "gallery" && section.type !== "team" && (
        <>
          <div className="border-t border-lightgray pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-midgray mb-3">Style</h4>
            {["hero", "cta"].includes(section.type) && (
              <>
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-medium text-darkgray">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={props.bgColor || "#1A1A2E"} onChange={(e) => updateProp("bgColor", e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-lightgray" />
                    <input type="text" value={props.bgColor || ""} onChange={(e) => updateProp("bgColor", e.target.value)} className="input-field flex-1 text-xs" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-medium text-darkgray">Layout</label>
                  <select value={props.layout || "full-width"} onChange={(e) => updateProp("layout", e.target.value)} className="input-field text-xs">
                    <option value="full-width">Full Width</option>
                    <option value="contained">Contained</option>
                  </select>
                </div>
              </>
            )}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-darkgray">Padding</label>
              <select value={props.padding || "md"} onChange={(e) => updateProp("padding", e.target.value)} className="input-field text-xs">
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
          </div>

          {section.type === "hero" && (
            <div className="border-t border-lightgray pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-midgray mb-3">Text</h4>
              <div className="mb-3">
                <label className="mb-1 block text-xs font-medium text-darkgray">Text Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={props.textColor || "#FFFFFF"} onChange={(e) => updateProp("textColor", e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-lightgray" />
                  <input type="text" value={props.textColor || ""} onChange={(e) => updateProp("textColor", e.target.value)} className="input-field flex-1 text-xs" />
                </div>
              </div>
              <div className="mb-3">
                <label className="mb-1 block text-xs font-medium text-darkgray">Alignment</label>
                <div className="flex gap-1">
                  {["left", "center", "right"].map((align) => (
                    <button key={align} onClick={() => updateProp("textAlign", align)} className={`flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors ${props.textAlign === align ? "bg-navy text-white" : "bg-offwhite text-darkgray hover:bg-lightgray"}`}>
                      {align === "left" ? "⬅" : align === "center" ? "⬌" : "➡"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="border-t border-lightgray pt-4">
        <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-error hover:bg-red-50 transition-colors">
          <Trash2 className="h-4 w-4" />
          Delete Section
        </button>
      </div>
    </div>
  );
}

function PropertyField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-xs font-medium text-darkgray">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="input-field text-xs" />
    </div>
  );
}

// ─── Section Library Modal ───
function SectionLibraryModal({ onSelect, onClose }: { onSelect: (type: SectionType) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy">Add a Section</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-midgray hover:bg-offwhite">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Search sections..." className="input-field" />
        </div>
        <div className="grid max-h-80 gap-3 overflow-y-auto sm:grid-cols-3">
          {SECTION_REGISTRY.map((s) => (
            <button key={s.type} onClick={() => onSelect(s.type)} className="group rounded-xl border border-lightgray p-4 text-center transition-all duration-150 hover:border-blue/30 hover:shadow-sm">
              <div className="mb-2 text-3xl">{s.icon}</div>
              <div className="text-sm font-medium text-navy">{s.name}</div>
              <div className="mt-0.5 text-[11px] text-midgray">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Editor Page ───
export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<EditorPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [leftTab, setLeftTab] = useState<"pages" | "sections" | "layers">("pages");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showSectionLibrary, setShowSectionLibrary] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Simulate load
  useEffect(() => {
    const t = setTimeout(() => {
      setPages(createMockPages());
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Simulate auto-save
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setSaveStatus("saving");
      setTimeout(() => setSaveStatus("saved"), 800);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 8000);
    return () => clearInterval(interval);
  }, [loading]);

  const currentPage = pages[currentPageIndex];
  const selectedSection = currentPage?.sections.find((s) => s.id === selectedSectionId) || null;

  const selectSection = (id: string | null) => setSelectedSectionId(id);

  const addSection = useCallback((type: SectionType) => {
    const info = SECTION_REGISTRY.find((s) => s.type === type);
    const newSection: EditorSection = {
      id: `sec-${type}-${Date.now()}`,
      type,
      props: {},
    };
    setPages((prev) => prev.map((p, i) =>
      i === currentPageIndex ? { ...p, sections: [...p.sections, newSection] } : p
    ));
    setShowSectionLibrary(false);
    setSelectedSectionId(newSection.id);
  }, [currentPageIndex]);

  const updateSectionProps = useCallback((props: Record<string, any>) => {
    setPages((prev) => prev.map((p, i) =>
      i === currentPageIndex
        ? {
            ...p,
            sections: p.sections.map((s) =>
              s.id === selectedSectionId ? { ...s, props } : s
            ),
          }
        : p
    ));
  }, [currentPageIndex, selectedSectionId]);

  const deleteSection = useCallback((id: string) => {
    setPages((prev) => prev.map((p, i) =>
      i === currentPageIndex
        ? { ...p, sections: p.sections.filter((s) => s.id !== id) }
        : p
    ));
    setSelectedSectionId(null);
  }, [currentPageIndex]);

  const addPage = () => {
    const newPage: EditorPage = {
      id: `page-${Date.now()}`,
      name: "New Page",
      sections: [],
    };
    setPages((prev) => [...prev, newPage]);
    setCurrentPageIndex(pages.length);
  };

  const removePage = (id: string) => {
    if (pages.length <= 1) return;
    setPages((prev) => prev.filter((p) => p.id !== id));
    if (currentPageIndex >= pages.length - 1) setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
  };

  const renderSectionPreview = (section: EditorSection) => {
    const PreviewComp = sectionPreviewMap[section.type];
    if (!PreviewComp) return <div className="rounded-lg bg-offwhite p-4 text-center text-sm text-midgray">Unknown section type</div>;
    return <PreviewComp props={section.props} />;
  };

  const deviceWidths = { desktop: "100%", tablet: "640px", mobile: "360px" };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-offwhite">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-navy border-t-transparent" />
          <p className="mt-4 text-sm text-midgray">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-offwhite">
        <LayoutTemplate className="mb-4 h-16 w-16 text-midgray/30" />
        <h2 className="text-xl font-semibold text-navy">No pages yet</h2>
        <p className="mt-2 text-sm text-darkgray/70">Start by adding your first page.</p>
        <button onClick={addPage} className="btn-cta mt-6">+ Add Your First Page</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-offwhite">
      {/* ─── Top Toolbar ─── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-lightgray bg-white px-4">
        <div className="flex items-center gap-3">
          <Link href={`/app/projects/${projectId}/blueprint`} className="flex items-center gap-1.5 text-sm text-darkgray hover:text-navy">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="hidden h-5 w-px bg-lightgray sm:block" />
          <h1 className="text-sm font-semibold text-navy truncate max-w-[160px] sm:max-w-xs">
            {currentPage?.name || "Editor"}
          </h1>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Device toggle */}
          <div className="hidden items-center rounded-lg border border-lightgray p-0.5 sm:flex">
            {[
              { id: "desktop" as const, icon: Monitor },
              { id: "tablet" as const, icon: Tablet },
              { id: "mobile" as const, icon: Smartphone },
            ].map((d) => {
              const Icon = d.icon;
              return (
                <button key={d.id} onClick={() => setDevice(d.id)}
                  className={`rounded-md p-1.5 transition-colors ${device === d.id ? "bg-navy text-white" : "text-midgray hover:text-darkgray"}`}>
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>

          <div className="hidden h-5 w-px bg-lightgray sm:block" />

          {/* Undo/Redo */}
          <button className="rounded-lg p-1.5 text-midgray hover:bg-offwhite disabled:opacity-30"><Undo2 className="h-4 w-4" /></button>
          <button className="rounded-lg p-1.5 text-midgray hover:bg-offwhite disabled:opacity-30"><Redo2 className="h-4 w-4" /></button>

          <div className="hidden h-5 w-px bg-lightgray sm:block" />

          {/* Auto-save indicator */}
          <div className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex ${saveStatus === "saving" ? "text-gold-dark bg-gold/10" : saveStatus === "saved" ? "text-teal bg-teal/10" : "text-midgray"}`}>
            {saveStatus === "saving" && <Loader2 className="h-3 w-3 animate-spin" />}
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved ✓" : "Auto-save"}
          </div>

          {/* Preview */}
          <Link href={`/app/projects/${projectId}/preview`} className="btn-ghost btn-sm hidden sm:inline-flex gap-1.5">
            <Eye className="h-4 w-4" /> Preview
          </Link>

          {/* Publish */}
          <button onClick={() => setShowPublishModal(true)} className="btn-cta btn-sm gap-1.5">
            <Globe className="h-4 w-4" /> <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </header>

      {/* ─── 3-Panel Workspace ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Left Panel ─── */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-lightgray bg-white">
          {/* Tabs */}
          <div className="flex border-b border-lightgray">
            {[
              { id: "pages" as const, label: "Pages", icon: LayoutTemplate },
              { id: "sections" as const, label: "Sections", icon: Layers },
              { id: "layers" as const, label: "Layers", icon: Menu },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setLeftTab(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 py-2.5 text-xs font-medium transition-colors ${leftTab === tab.id ? "border-navy text-navy" : "border-transparent text-midgray hover:text-darkgray"}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-3">
            {/* Pages Tab */}
            {leftTab === "pages" && (
              <div className="space-y-1">
                {pages.map((page, idx) => (
                  <div key={page.id}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors ${idx === currentPageIndex ? "bg-navy/5 text-navy font-medium" : "text-darkgray hover:bg-offwhite"}`}
                    onClick={() => { setCurrentPageIndex(idx); setSelectedSectionId(null); }}>
                    <span className="flex-1 truncate">{page.name}</span>
                    <span className="text-xs text-midgray">{page.sections.length}</span>
                    {pages.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); removePage(page.id); }} className="rounded p-0.5 text-midgray hover:text-error">
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addPage} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue hover:bg-blue/5">
                  <Plus className="h-3.5 w-3.5" /> Add Page
                </button>
              </div>
            )}

            {/* Sections Tab */}
            {leftTab === "sections" && (
              <div className="grid grid-cols-2 gap-2">
                {SECTION_REGISTRY.map((s) => (
                  <button key={s.type} onClick={() => addSection(s.type)}
                    className="flex flex-col items-center gap-1 rounded-lg border border-lightgray p-3 text-center transition-colors hover:border-blue/30 hover:bg-blue/5">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-[11px] font-medium text-darkgray">{s.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Layers Tab */}
            {leftTab === "layers" && (
              <div className="space-y-1">
                {currentPage?.sections.length === 0 && (
                  <p className="py-8 text-center text-sm text-midgray">No sections on this page</p>
                )}
                {currentPage?.sections.map((section, idx) => {
                  const info = SECTION_REGISTRY.find((s) => s.type === section.type);
                  return (
                    <div key={section.id}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors ${section.id === selectedSectionId ? "bg-navy/5 text-navy font-medium" : "text-darkgray hover:bg-offwhite"}`}
                      onClick={() => setSelectedSectionId(section.id)}>
                      <GripVertical className="h-3.5 w-3.5 shrink-0 text-midgray" />
                      <span className="text-xs">{info?.icon}</span>
                      <span className="flex-1 truncate text-xs">{info?.name || section.type}</span>
                      <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="rounded p-0.5 text-midgray hover:text-error">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* ─── Center Canvas ─── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Add section button */}
          <div className="flex items-center justify-between border-b border-lightgray bg-white px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-navy">{currentPage?.name}</span>
              <span className="text-xs text-midgray">{currentPage?.sections.length || 0} sections</span>
            </div>
            <button onClick={() => setShowSectionLibrary(true)} className="btn-cta btn-sm gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Section
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-y-auto bg-offwhite p-4 md:p-8">
            <div className="mx-auto transition-all duration-300" style={{ maxWidth: deviceWidths[device] }}>
              {currentPage?.sections.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-lightgray py-20 text-center">
                  <LayoutTemplate className="mb-4 h-12 w-12 text-midgray/30" />
                  <p className="text-sm text-darkgray/70">Drag a section here or click [+ Add Section]</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentPage?.sections.map((section) => (
                    <div key={section.id}
                      onClick={() => setSelectedSectionId(section.id)}
                      className={`relative cursor-pointer rounded-xl border-2 transition-all duration-150 ${
                        section.id === selectedSectionId
                          ? "border-blue shadow-glow"
                          : "border-transparent hover:border-blue/30"
                      }`}>
                      {/* Floating toolbar */}
                      <div className={`absolute right-2 top-2 z-10 flex gap-1 transition-opacity ${section.id === selectedSectionId ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="rounded-lg bg-white p-1.5 shadow-sm text-error hover:bg-red-50">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {renderSectionPreview(section)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ─── Right Panel ─── */}
        <aside className="hidden w-80 shrink-0 border-l border-lightgray bg-white lg:flex lg:flex-col">
          <div className="border-b border-lightgray px-4 py-3">
            <h3 className="text-sm font-semibold text-navy">
              {selectedSection
                ? `${SECTION_REGISTRY.find((s) => s.type === selectedSection.type)?.name || "Section"} Properties`
                : "Properties"}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {selectedSection ? (
              <SectionProperties section={selectedSection} onUpdate={updateSectionProps} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <LayoutTemplate className="mb-3 h-10 w-10 text-midgray/30" />
                <p className="text-sm text-midgray">Select a section on the canvas to edit its properties</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ─── Section Library Modal ─── */}
      {showSectionLibrary && (
        <SectionLibraryModal
          onSelect={(type) => addSection(type)}
          onClose={() => setShowSectionLibrary(false)}
        />
      )}

      {/* ─── Publish Modal ─── */}
      <PublishModal
        open={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        projectId={projectId}
        projectName={currentPage?.name || "My Site"}
        currentPlan="starter"
        hasPublishedSite={false}
      />
    </div>
  );
}