import { TicketCheck, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function MetricCard({
  id,
  eyebrow,
  value,
  detail,
  icon: Icon,
  trend,
  onClick,
  className,
}: {
  id: string;
  eyebrow: string;
  value?: string;
  detail: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      id={id}
      data-avatar-target={id}
      onClick={onClick}
      className={cn(
        "metric-sheen min-h-[168px] rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-5 text-left shadow-[0_18px_50px_rgba(21,26,25,0.05)] transition hover:-translate-y-0.5 hover:border-[var(--line-strong)] sm:p-6",
        className,
      )}
    >
      <span className="relative z-[1] flex h-full flex-col">
        <span className="flex items-start justify-between">
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-[var(--muted)]">
            {eyebrow}
          </span>
          <span className="grid size-9 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--muted)]">
            <Icon className="size-4" />
          </span>
        </span>
        <span className="mt-auto">
          {value ? (
            <span className="block text-[2rem] font-semibold leading-none tracking-[-0.055em]">
              {value}
            </span>
          ) : (
            <span className="block h-8 w-28 animate-pulse rounded-lg bg-[var(--surface-raised)]" />
          )}
          <span className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
            {trend === "up" ? (
              <TrendingUp className="size-3.5 text-[var(--positive)]" />
            ) : trend === "down" ? (
              <TrendingDown className="size-3.5 text-[var(--danger)]" />
            ) : (
              <TicketCheck className="size-3.5 text-[var(--warning)]" />
            )}
            {detail}
          </span>
        </span>
      </span>
    </button>
  );
}
