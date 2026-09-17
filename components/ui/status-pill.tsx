import { cn } from "@/lib/utils";

export function StatusPill({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "positive" | "warning" | "danger";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
        tone === "neutral" && "bg-[var(--surface-raised)] text-[var(--muted)]",
        tone === "positive" && "bg-[var(--positive-soft)] text-[var(--positive)]",
        tone === "warning" && "bg-[var(--warning-soft)] text-[var(--warning)]",
        tone === "danger" && "bg-[var(--danger-soft)] text-[var(--danger)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
