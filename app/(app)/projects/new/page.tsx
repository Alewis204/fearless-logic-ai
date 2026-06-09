"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Zap, RefreshCw, LayoutTemplate, X, Loader2 } from "lucide-react";

// ─── Data ───
const businessTypes = [
  { id: "coach", label: "Coach", icon: "🎯" },
  { id: "creator", label: "Creator", icon: "🎨" },
  { id: "consultant", label: "Consultant", icon: "📊" },
  { id: "ecommerce", label: "E-commerce", icon: "🛒" },
  { id: "local", label: "Local Business", icon: "📍" },
  { id: "other", label: "Other", icon: "✨" },
];

const ideaSuggestions = [
  "I offer 1:1 coaching for...",
  "I create content about...",
  "I consult businesses on...",
  "I sell products such as...",
];

const audienceSuggestions = [
  "Busy professionals",
  "Small business owners",
  "Creative entrepreneurs",
  "Health-conscious individuals",
  "Parents & families",
];

interface AIProgressStep {
  id: string;
  label: string;
  icon: string;
  status: "pending" | "in-progress" | "done" | "error";
}

const aiSteps: AIProgressStep[] = [
  { id: "analyze", label: "Analyzing your business idea...", icon: "✨", status: "pending" },
  { id: "structure", label: "Structuring your site architecture...", icon: "📐", status: "pending" },
  { id: "generate", label: "Generating your content...", icon: "✍️", status: "pending" },
  { id: "design", label: "Selecting your color palette...", icon: "🎨", status: "pending" },
];

// ─── Progress Indicator ───
function ProgressIndicator({ currentStep, totalSteps = 3 }: { currentStep: number; totalSteps?: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isComplete = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        return (
          <div key={stepNum} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                isComplete
                  ? "bg-teal text-white"
                  : isCurrent
                  ? "bg-navy text-white shadow-sm shadow-navy/20"
                  : "bg-offwhite text-midgray"
              }`}
            >
              {isComplete ? <Check className="h-4 w-4" /> : stepNum}
            </div>
            {stepNum < totalSteps && (
              <div
                className={`mx-1 h-0.5 w-12 transition-colors ${
                  isComplete ? "bg-teal" : "bg-lightgray"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Business Type Card ───
function BusinessTypeCard({
  type,
  selected,
  onSelect,
}: {
  type: (typeof businessTypes)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-6 transition-all duration-150 ${
        selected
          ? "border-navy bg-navy/5 shadow-sm"
          : "border-lightgray hover:border-blue/30 hover:shadow-sm"
      }`}
    >
      <span className="text-3xl">{type.icon}</span>
      <span className={`text-sm font-medium ${selected ? "text-navy" : "text-darkgray"}`}>
        {type.label}
      </span>
      {selected && <Check className="h-4 w-4 text-navy" />}
    </button>
  );
}

// ─── Suggestion Chip ───
function SuggestionChip({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-lightgray px-4 py-2 text-sm text-darkgray/70 transition-all duration-150 hover:border-blue hover:text-blue hover:bg-blue/5"
    >
      {text}
    </button>
  );
}

// ─── Character Counter ───
function CharacterCount({ current, max }: { current: number; max: number }) {
  const isOver = current > max;
  return (
    <p className={`text-xs ${isOver ? "text-error font-medium" : "text-midgray"}`}>
      {current} / {max}
      {isOver && " — Max 500 characters"}
    </p>
  );
}

// ─── Step 1: Business Type ───
function Step1({
  selectedType,
  onSelect,
  onNext,
}: {
  selectedType: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-navy">What best describes you?</h1>
      <p className="mt-2 text-sm text-darkgray/70">Choose the category that fits your business.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {businessTypes.map((type) => (
          <BusinessTypeCard
            key={type.id}
            type={type}
            selected={selectedType === type.id}
            onSelect={() => onSelect(type.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/app/dashboard"
          className="flex items-center gap-1.5 text-sm font-medium text-darkgray hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelect("other")}
            className="text-sm text-blue hover:underline"
          >
            Skip → I know my idea
          </button>
          <button
            onClick={onNext}
            disabled={!selectedType}
            className="btn-cta inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Business Idea ───
function Step2({
  idea,
  onChange,
  onNext,
  onBack,
}: {
  idea: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const charCount = idea.length;
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-navy">Describe your business idea</h1>
      <p className="mt-2 text-sm text-darkgray/70">
        Tell the AI about your business in plain English. What do you offer and who do you serve?
      </p>

      <div className="mt-6">
        <textarea
          value={idea}
          onChange={(e) => onChange(e.target.value)}
          placeholder="I help busy professionals break through career plateaus and land their dream executive roles. I offer 1:1 coaching, resume rewriting, and interview prep services."
          rows={6}
          maxLength={600}
          className={`input-field resize-y min-h-[140px] ${
            charCount > 500 ? "border-error focus:border-error focus:ring-error/20" : ""
          }`}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-xs text-darkgray/50">Be specific about what you offer and who you serve.</p>
          <CharacterCount current={charCount} max={500} />
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {ideaSuggestions.map((s) => (
          <SuggestionChip key={s} text={s} onClick={() => onChange(s)} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-darkgray hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!idea.trim() || charCount > 500}
          className="btn-cta inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Target Audience ───
function Step3({
  audience,
  onChange,
  onSubmit,
  onBack,
  submitting,
}: {
  audience: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}) {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-navy">Who is your ideal customer?</h1>
      <p className="mt-2 text-sm text-darkgray/70">
        Help the AI tailor your site to the right audience.
      </p>

      <div className="mt-6">
        <textarea
          value={audience}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Mid-to-senior professionals aged 30-55 who feel stuck in their careers and want a personalized roadmap to their next executive role."
          rows={4}
          maxLength={500}
          className="input-field resize-y min-h-[100px]"
        />
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-xs text-darkgray/50">
            💡 Suggested: &ldquo;Busy professionals&rdquo;, &ldquo;Small business owners&rdquo;, &ldquo;Creative entrepreneurs&rdquo;
          </p>
          <CharacterCount current={audience.length} max={500} />
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {audienceSuggestions.map((s) => (
          <SuggestionChip key={s} text={s} onClick={() => onChange(s)} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex items-center gap-1.5 text-sm font-medium text-darkgray hover:text-navy transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!audience.trim() || submitting}
          className="btn-cta inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating your blueprint...
            </>
          ) : (
            <>
              Generate Blueprint
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── AI Processing Screen ───
function ProcessingScreen({
  steps,
  onCancel,
  error,
  timeout,
  onRetry,
}: {
  steps: AIProgressStep[];
  onCancel: () => void;
  error: boolean;
  timeout: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
      {/* Animated logo */}
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-blue shadow-lg shadow-navy/20 animate-pulse-soft">
        <Zap className="h-10 w-10 text-gold" />
      </div>

      <h2 className="text-xl font-bold text-navy">
        {error
          ? "We couldn't generate your blueprint"
          : timeout
          ? "Taking longer than expected"
          : "Fearless Logic AI is building your blueprint..."}
      </h2>
      <p className="mt-2 text-sm text-darkgray/70">
        {error
          ? "Try being more specific about your business idea."
          : timeout
          ? "Don't worry, it's still working. You can wait or start over."
          : "This usually takes just a few seconds."}
      </p>

      {/* Progress steps */}
      {!error && (
        <div className="mt-8 w-full max-w-sm space-y-4 text-left">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm">
                {step.status === "done" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <Check className="h-4 w-4" />
                  </div>
                ) : step.status === "in-progress" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue/10">
                    <Loader2 className="h-4 w-4 animate-spin text-blue" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-offwhite">
                    <span className="text-xs text-midgray">{step.icon}</span>
                  </div>
                )}
              </div>
              <span
                className={`text-sm ${
                  step.status === "done"
                    ? "text-teal font-medium"
                    : step.status === "in-progress"
                    ? "text-navy font-medium"
                    : "text-midgray"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/app/templates"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <LayoutTemplate className="h-4 w-4" />
            Browse Templates
          </Link>
        </div>
      )}

      {/* Timeout state */}
      {timeout && !error && (
        <div className="mt-8 flex items-center gap-3">
          <button onClick={onRetry} className="btn-secondary inline-flex items-center gap-2">
            Wait
          </button>
          <button onClick={onCancel} className="btn-ghost text-sm">
            Cancel
          </button>
        </div>
      )}

      {/* Cancel button */}
      {!error && !timeout && (
        <button
          onClick={onCancel}
          className="mt-8 text-sm text-midgray hover:text-darkgray transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
}

// ─── Main Onboarding Page ───
export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  // AI Processing state
  const [aiStepsState, setAiStepsState] = useState<AIProgressStep[]>(aiSteps);
  const [aiError, setAiError] = useState(false);
  const [aiTimeout, setAiTimeout] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Animate AI progress steps
  const animateAIProgress = useCallback(async () => {
    // Reset state
    setAiStepsState(aiSteps.map((s) => ({ ...s, status: "pending" as const })));
    setAiError(false);
    setAiTimeout(false);

    // Start timeout timer
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) setAiTimeout(true);
    }, 15000);

    // Animate each step
    for (let i = 0; i < aiSteps.length; i++) {
      if (!mountedRef.current) return;

      // Mark current step as in-progress
      setAiStepsState((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "in-progress" as const } : s))
      );

      // Wait 1-2 seconds
      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

      if (!mountedRef.current) return;

      // Mark current step as done
      setAiStepsState((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "done" as const } : s))
      );
    }

    // Clear timeout — success reached within time
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Small pause before redirect
    await new Promise((r) => setTimeout(r, 800));

    if (mountedRef.current && projectId) {
      router.push(`/app/projects/${projectId}/blueprint`);
    }
  }, [projectId, router]);

  // Submit: create project → generate blueprint
  const handleSubmit = async () => {
    if (!audience.trim()) return;

    setSubmitting(true);
    setAiError(false);

    try {
      const title = idea.trim().split(".")[0]?.slice(0, 60) || "My Business";
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          businessType: selectedType,
          businessIdea: idea,
          targetAudience: audience,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const pid = data.id || data[0]?.id;
        if (pid) {
          setProjectId(pid);
          setStep(4); // Go to processing screen
          setSubmitting(false);
          animateAIProgress();
          return;
        }
      }
    } catch {
      // API unavailable — fall through to mock
    }

    // Mock fallback: generate a fake project ID
    const mockId = "proj_" + Math.random().toString(36).slice(2, 10);
    setProjectId(mockId);
    setStep(4);
    setSubmitting(false);
    animateAIProgress();
  };

  // Retry AI generation
  const handleRetry = () => {
    setAiError(false);
    setAiTimeout(false);
    setAiStepsState(aiSteps.map((s) => ({ ...s, status: "pending" as const })));
    animateAIProgress();
  };

  // Cancel processing → back to dashboard
  const handleCancel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    router.push("/app/dashboard");
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));
  const handleNext = () => setStep((s) => Math.min(3, s + 1));

  return (
    <div className="mx-auto max-w-[600px]">
      {/* Back button for steps 1-3 */}
      {step <= 3 && step > 1 && (
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-1.5 text-sm text-darkgray hover:text-navy transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {/* Progress indicator (steps 1-3 only) */}
      {step <= 3 && <ProgressIndicator currentStep={step} />}

      {/* Step 1: Business Type */}
      {step === 1 && (
        <Step1
          selectedType={selectedType}
          onSelect={setSelectedType}
          onNext={handleNext}
        />
      )}

      {/* Step 2: Business Idea */}
      {step === 2 && (
        <Step2
          idea={idea}
          onChange={setIdea}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {/* Step 3: Target Audience + Submit */}
      {step === 3 && (
        <Step3
          audience={audience}
          onChange={setAudience}
          onSubmit={handleSubmit}
          onBack={handleBack}
          submitting={submitting}
        />
      )}

      {/* AI Processing Screen */}
      {step === 4 && (
        <ProcessingScreen
          steps={aiStepsState}
          onCancel={handleCancel}
          error={aiError}
          timeout={aiTimeout}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}