"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X, Rocket, Check, AlertCircle, Loader2, ChevronDown, ChevronUp,
  Search, Globe, ArrowLeft, Copy, ExternalLink, Zap, Lock
} from "lucide-react";

// ─── Types ───
interface PublishModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  currentPlan: string;
  hasPublishedSite: boolean;
}

type SubdomainStatus = "idle" | "typing" | "checking" | "available" | "taken" | "error";
type PublishStage = "idle" | "publishing" | "success" | "error";

// ─── Subdomain Validation ───
function validateSubdomain(value: string): string | null {
  if (!value) return "Subdomain is required";
  if (value.length < 3) return "Must be at least 3 characters";
  if (value.length > 50) return "Must be 50 characters or less";
  if (!/^[a-z0-9-]+$/.test(value)) return "Only lowercase letters, numbers, and hyphens";
  if (/^-/.test(value)) return "Cannot start with a hyphen";
  if (/-$/.test(value)) return "Cannot end with a hyphen";
  if (/--/.test(value)) return "Cannot have consecutive hyphens";
  return null;
}

// ─── Subdomain Input ───
function SubdomainInput({
  value,
  onChange,
  status,
  errorMsg,
}: {
  value: string;
  onChange: (val: string) => void;
  status: SubdomainStatus;
  errorMsg: string | null;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy">Your subdomain</label>
      <div
        className={`flex items-center overflow-hidden rounded-lg border transition-all ${
          status === "error" || errorMsg
            ? "border-error ring-1 ring-error/20"
            : status === "available"
            ? "border-teal ring-1 ring-teal/20"
            : status === "taken"
            ? "border-error/50"
            : "border-lightgray focus-within:border-blue focus-within:ring-2 focus-within:ring-blue/30"
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
          placeholder="yourbusiness"
          className="flex-1 px-4 py-2.5 text-sm text-nearblack outline-none placeholder:text-midgray"
          maxLength={50}
        />
        <div className="shrink-0 border-l border-lightgray bg-offwhite px-3 py-2.5 text-sm text-darkgray/70">
          .fearlesslogic.app
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-1.5 flex items-center gap-1.5 text-xs">
        {status === "checking" && (
          <span className="flex items-center gap-1 text-midgray">
            <Loader2 className="h-3 w-3 animate-spin" /> Checking availability...
          </span>
        )}
        {status === "available" && (
          <span className="flex items-center gap-1 text-teal font-medium">
            <Check className="h-3.5 w-3.5" /> Available
          </span>
        )}
        {status === "taken" && (
          <span className="flex items-center gap-1 text-error font-medium">
            <X className="h-3.5 w-3.5" /> Taken. Try a different name.
          </span>
        )}
        {errorMsg && status !== "checking" && (
          <span className="text-error">{errorMsg}</span>
        )}
      </div>
    </div>
  );
}

// ─── Plan Restriction Banner ───
function PlanRestrictionBanner({ plan }: { plan: string }) {
  return (
    <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
      <div className="flex items-start gap-3">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gold-dark">
            {plan === "free" || plan === "starter"
              ? "You've reached the limit of 1 published site on Starter."
              : "Custom domains are available on Pro plan."}
          </p>
          <Link
            href="/app/billing"
            className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
          >
            Upgrade to Pro <ArrowLeft className="h-3 w-3 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Publish Modal ───
export default function PublishModal({
  open,
  onClose,
  projectId,
  projectName,
  currentPlan,
  hasPublishedSite,
}: PublishModalProps) {
  const router = useRouter();

  const [subdomain, setSubdomain] = useState("");
  const [domainOption, setDomainOption] = useState<"free" | "custom">("free");
  const [customDomain, setCustomDomain] = useState("");
  const [showSEO, setShowSEO] = useState(false);
  const [seoTitle, setSeoTitle] = useState(`${projectName} | Executive Coaching`);
  const [seoDesc, setSeoDesc] = useState(`Professional ${projectName} services. Transform your career with personalized coaching.`);
  const [subdomainStatus, setSubdomainStatus] = useState<SubdomainStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [publishStage, setPublishStage] = useState<PublishStage>("idle");
  const [progressMsg, setProgressMsg] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeable = publishStage !== "publishing";

  // Reset on open
  useEffect(() => {
    if (open) {
      setSubdomain("");
      setDomainOption("free");
      setCustomDomain("");
      setShowSEO(false);
      setSeoTitle(`${projectName} | Executive Coaching`);
      setSeoDesc(`Professional ${projectName} services. Transform your career with personalized coaching.`);
      setSubdomainStatus("idle");
      setErrorMsg(null);
      setPublishStage("idle");
      setProgressMsg("");
    }
  }, [open, projectName]);

  // Debounced subdomain check
  const handleSubdomainChange = useCallback((val: string) => {
    setSubdomain(val);
    const error = validateSubdomain(val);
    if (error) {
      setErrorMsg(error);
      setSubdomainStatus("error");
      return;
    }
    setErrorMsg(null);

    if (val.length < 3) {
      setSubdomainStatus("idle");
      return;
    }

    setSubdomainStatus("checking");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // Simulated availability check — 80% chance of available
      const available = Math.random() > 0.2;
      setSubdomainStatus(available ? "available" : "taken");
    }, 1200);
  }, []);

  // Cleanup debounce
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Publish
  const handlePublish = async () => {
    setPublishStage("publishing");

    // Simulated publish progress
    const steps = [
      "Deploying your site...",
      "Setting up SSL certificate...",
      "Configuring DNS...",
      "Almost there...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgressMsg(steps[i]);
      await new Promise((r) => setTimeout(r, 1200));
    }

    // Mock API call
    try {
      await fetch(`/api/projects/${projectId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subdomain: subdomain,
          customDomain: domainOption === "custom" ? customDomain : null,
        }),
      });
    } catch {
      // API may not be available — proceed with success flow
    }

    setPublishStage("success");
    await new Promise((r) => setTimeout(r, 600));
    onClose();
    router.push(`/app/projects/${projectId}/publish/success?domain=${subdomain}.fearlesslogic.app`);
  };

  const handleRetry = () => {
    setPublishStage("idle");
    setProgressMsg("");
  };

  if (!open) return null;

  const canLaunch =
    subdomainStatus === "available" &&
    (domainOption === "free" || (domainOption === "custom" && customDomain.length > 0));

  const planBlocked = (currentPlan === "free" || currentPlan === "starter") && hasPublishedSite;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-[540px] rounded-2xl bg-white shadow-xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-lightgray px-6 py-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-teal" />
            <h2 className="text-lg font-semibold text-navy">Your site is ready to go live!</h2>
          </div>
          {closeable && (
            <button onClick={onClose} className="rounded-lg p-1.5 text-midgray hover:bg-offwhite">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="space-y-5 overflow-y-auto px-6 py-5 max-h-[60vh]">
          {/* Publishing Overlay */}
          {publishStage === "publishing" && (
            <div className="rounded-xl border border-blue/20 bg-blue/5 p-6 text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue" />
              <p className="mt-4 text-sm font-medium text-blue">
                Publishing your site...
              </p>
              <p className="mt-1 text-xs text-midgray">{progressMsg}</p>
            </div>
          )}

          {/* Error banner */}
          {publishStage === "error" && (
            <div className="rounded-lg border border-error/30 bg-error/5 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-error">Something went wrong</p>
                  <p className="mt-0.5 text-xs text-darkgray/70">Your changes are saved. Please try again.</p>
                </div>
                <button onClick={handleRetry} className="btn-sm rounded-lg border border-error/30 text-error hover:bg-error/5">
                  Try Again
                </button>
              </div>
            </div>
          )}

          {publishStage !== "publishing" && (
            <>
              {/* Plan check */}
              {planBlocked && <PlanRestrictionBanner plan={currentPlan} />}

              {/* Current plan badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
                <Zap className="h-3 w-3 text-gold" />
                {currentPlan === "pro" ? "Pro Plan" : currentPlan === "scale" ? "Scale Plan" : "Starter Plan"}
              </div>

              {/* Subdomain Input */}
              {!planBlocked && (
                <SubdomainInput
                  value={subdomain}
                  onChange={handleSubdomainChange}
                  status={subdomainStatus}
                  errorMsg={errorMsg}
                />
              )}

              {/* Domain Options */}
              {!planBlocked && (
                <div className="space-y-3">
                  <label className="flex items-center gap-3 rounded-lg border border-lightgray p-3 cursor-pointer hover:bg-offwhite transition-colors">
                    <input
                      type="radio"
                      name="domain"
                      checked={domainOption === "free"}
                      onChange={() => setDomainOption("free")}
                      className="h-4 w-4 text-blue focus:ring-blue/30"
                    />
                    <div>
                      <span className="text-sm font-medium text-navy">Free subdomain (included)</span>
                      <p className="text-xs text-midgray">{subdomain || "your-choice"}.fearlesslogic.app</p>
                    </div>
                  </label>

                  <div className={`rounded-lg border p-3 transition-colors ${domainOption === "custom" ? "border-blue bg-blue/5" : "border-lightgray opacity-60"}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="domain"
                        checked={domainOption === "custom"}
                        onChange={() => {
                          if (currentPlan === "pro" || currentPlan === "scale") setDomainOption("custom");
                        }}
                        className="mt-0.5 h-4 w-4 text-blue focus:ring-blue/30"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-navy">Connect custom domain</span>
                        <p className="text-xs text-midgray">
                          {currentPlan === "pro" || currentPlan === "scale"
                            ? "Enter your domain"
                            : "Available on Pro plan"}
                        </p>
                        {domainOption === "custom" && (currentPlan === "pro" || currentPlan === "scale") && (
                          <input
                            type="text"
                            value={customDomain}
                            onChange={(e) => setCustomDomain(e.target.value)}
                            placeholder="yourdomain.com"
                            className="input-field mt-2 text-sm"
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* SEO Settings (collapsible) */}
              {!planBlocked && (
                <div>
                  <button
                    onClick={() => setShowSEO(!showSEO)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-sm font-medium text-darkgray hover:bg-offwhite transition-colors"
                  >
                    <span>SEO Settings (optional)</span>
                    {showSEO ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {showSEO && (
                    <div className="mt-3 space-y-3 pl-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-darkgray">Page Title</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          className="input-field text-sm"
                          placeholder="Page title for SEO"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-darkgray">Meta Description</label>
                        <textarea
                          value={seoDesc}
                          onChange={(e) => setSeoDesc(e.target.value)}
                          className="input-field h-20 resize-none text-sm"
                          placeholder="Brief description for search results"
                          maxLength={160}
                        />
                        <p className="mt-1 text-xs text-midgray">{seoDesc.length}/160</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-lightgray px-6 py-4">
          {closeable ? (
            <>
              <button onClick={onClose} className="btn-ghost text-sm">
                ← Back to Editor
              </button>

              {planBlocked ? (
                <Link href="/app/billing" className="btn-cta inline-flex items-center gap-2">
                  Upgrade to Pro <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={!canLaunch}
                  className="btn-cta inline-flex items-center gap-2 disabled:opacity-40"
                >
                  <Rocket className="h-4 w-4" />
                  Launch Now
                </button>
              )}
            </>
          ) : (
            <div className="flex w-full justify-center">
              <span className="flex items-center gap-2 text-sm text-midgray">
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing — please wait...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}