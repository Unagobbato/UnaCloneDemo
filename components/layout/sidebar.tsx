"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleHelp,
  Command,
  FileText,
  Settings2,
  Sparkles,
  TicketCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDashboard } from "@/components/layout/dashboard-provider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Overview", icon: BarChart3, target: "overview" },
  { href: "/revenue", label: "Revenue", icon: ChartNoAxesCombined, target: "revenue" },
  { href: "/tickets", label: "Tickets", icon: TicketCheck, target: "tickets" },
  { href: "/profile", label: "Profile", icon: BriefcaseBusiness, target: "profile" },
  { href: "/settings", label: "Settings", icon: Settings2, target: "settings" },
  { href: "/2026Eunice_Una_Gobbato_Resume.docx", label: "Resume", icon: FileText, target: "resume" },
  { href: "/Eunice_CoverLetter.pdf", label: "Cover letter", icon: FileText, target: "cover-letter" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { openPanel } = useDashboard();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[218px] flex-col border-r border-white/8 bg-[#111514] text-[#f4f1e8] md:flex">
      <Link href="/" className="flex h-[78px] items-center gap-3 border-b border-white/8 px-5">
        <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)] text-[#101510]">
          <Command className="size-[18px]" />
        </span>
        <span>
          <span className="block text-[1.05rem] font-semibold leading-none tracking-[-0.04em]">
            Una Transport
          </span>
          <span className="mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.15em] text-white/38">
            Signal room
          </span>
        </span>
      </Link>

      <nav className="space-y-1 px-3 py-5" aria-label="Primary navigation">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.target}
              data-avatar-target={item.target}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-white/[0.09] text-white"
                  : "text-white/48 hover:bg-white/[0.05] hover:text-white/80",
              )}
            >
              <item.icon className="size-4" />
              <span className="font-medium">{item.label}</span>
              {active ? <span className="ml-auto size-1.5 rounded-full bg-[var(--accent)]" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <Sparkles className="size-4 text-[var(--accent)]" />
          <p className="mt-3 text-sm font-semibold">Una is on call</p>
          <p className="mt-1 text-xs leading-5 text-white/42">
            Navigate, act, and inspect demo data.
          </p>
        </div>
        <button
          id="demo-guide"
          data-avatar-target="demo-guide"
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/5 hover:text-white/75"
          onClick={() =>
            openPanel({
              title: "Two-minute demo",
              body: "Ask Una to show 30-day revenue, explain the refund dip, create a Billing ticket, then switch to dark mode.",
            })
          }
        >
          <CircleHelp className="size-4" />
          Demo guide
        </button>
      </div>
    </aside>
  );
}
