import { Layers3 } from "lucide-react";

import { StatusPill } from "@/components/ui/status-pill";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="reveal-up mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-3 font-mono text-[0.67rem] font-semibold uppercase tracking-[0.19em] text-[var(--muted)]">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-[clamp(2.1rem,5vw,4.25rem)] font-semibold leading-[0.96] tracking-[-0.068em]">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>
      <StatusPill tone="positive" className="h-fit w-fit">
        <Layers3 className="size-3" />
        Demo data ready
      </StatusPill>
    </header>
  );
}
