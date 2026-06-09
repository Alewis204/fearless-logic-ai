"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  CreditCard,
  Settings,
  Bell,
  Search,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Zap,
} from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  subscription?: {
    tier: string;
    status: string;
    trial_end?: string;
  };
};

const navItems = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "My Projects", href: "/app/projects", icon: FolderKanban },
  { label: "Templates", href: "/app/templates", icon: LayoutTemplate },
  { label: "Billing", href: "/app/billing", icon: CreditCard },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

const bottomNavItems = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/app/projects", icon: FolderKanban },
  { label: "Templates", href: "/app/templates", icon: LayoutTemplate },
  { label: "Billing", href: "/app/billing", icon: CreditCard },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch {
        // Silently fail — use mock data
      } finally {
        setProfileLoading(false);
      }
    }
    loadProfile();
  }, []);

  const displayName = profile?.name || (profileLoading ? "..." : "User");
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tier = profile?.subscription?.tier || "free";
  const trialEnd = profile?.subscription?.trial_end;
  const daysLeft = trialEnd
    ? Math.ceil((new Date(trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const isActive = (href: string) => {
    if (href === "/app/dashboard") return pathname === "/app/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ===== TOP BAR ===== */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-lightgray bg-white px-4 md:px-6">
        {/* Left: Mobile hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-darkgray hover:bg-offwhite md:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
              <Zap className="h-4 w-4 text-gold" />
            </div>
            <span className="hidden text-lg font-bold text-navy sm:block">
              Fearless Logic AI
            </span>
          </Link>
        </div>

        {/* Right: Icons + Profile */}
        <div className="flex items-center gap-2">
          {/* Search (desktop) */}
          <button className="hidden items-center gap-2 rounded-lg border border-lightgray px-3 py-2 text-sm text-midgray hover:bg-offwhite md:flex">
            <Search className="h-4 w-4" />
            <span>Search projects...</span>
          </button>

          {/* Upgrade CTA (if free/trial) */}
          {(tier === "free" || daysLeft !== null) && (
            <Link
              href="/app/billing"
              className="hidden rounded-full bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark hover:bg-gold/20 sm:block"
            >
              {daysLeft !== null && daysLeft > 0
                ? `Trial: ${daysLeft}d left`
                : "Upgrade to Pro"}
            </Link>
          )}

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-darkgray hover:bg-offwhite" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-offwhite">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-navy to-blue text-sm font-semibold text-white">
              {initials || "U"}
            </div>
            <span className="hidden text-sm font-medium text-darkgray lg:block">
              {displayName}
            </span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ===== SIDEBAR (Desktop) ===== */}
        <aside className="hidden w-64 shrink-0 border-r border-lightgray bg-white md:flex md:flex-col">
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-navy/5 text-navy font-semibold"
                      : "text-darkgray hover:bg-offwhite hover:text-navy"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Help section */}
          <div className="border-t border-lightgray p-3">
            <Link
              href="/help"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-midgray hover:bg-offwhite"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </Link>
          </div>
        </aside>

        {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-20 md:hidden">
            <div
              className="absolute inset-0 bg-navy/30 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative h-full w-64 border-r border-lightgray bg-white p-3 shadow-xl">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-navy/5 text-navy font-semibold"
                          : "text-darkgray hover:bg-offwhite hover:text-navy"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-4 border-t border-lightgray pt-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-midgray hover:bg-offwhite">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* ===== BOTTOM NAV (Mobile) ===== */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-lightgray bg-white md:hidden">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition-colors ${
                active ? "text-navy font-semibold" : "text-midgray"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}