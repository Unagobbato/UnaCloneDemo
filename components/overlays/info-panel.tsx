"use client";

import { CheckCircle2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { InfoPanelState } from "@/lib/types";
import { cn } from "@/lib/utils";

export function InfoPanel({
  panel,
  onClose,
}: {
  panel: InfoPanelState | null;
  onClose: () => void;
}) {
  return (
    <>
      <button
        id="close-info-panel-backdrop"
        data-avatar-target="close-info-panel-backdrop"
        aria-label="Close information panel"
        tabIndex={panel ? 0 : -1}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-[#090c0b]/40 backdrop-blur-[2px] transition-opacity duration-200",
          panel ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        id="info-panel"
        data-avatar-target="info-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-panel-title"
        aria-hidden={!panel}
        inert={!panel}
        className={cn(
          "fixed left-1/2 top-1/2 z-[61] w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 text-[var(--ink)] shadow-[0_30px_100px_rgba(5,8,7,0.35)] transition duration-200 ease-out motion-reduce:transition-none sm:p-7",
          panel
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            Dashboard detail
          </span>
          <Button
            id="close-info-panel"
            data-avatar-target="close-info-panel"
            variant="ghost"
            size="icon"
            className="text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]"
            onClick={onClose}
            tabIndex={panel ? 0 : -1}
            aria-label="Close panel"
          >
            <X className="size-4" />
          </Button>
        </div>
        <div className="mt-6 grid size-11 place-items-center rounded-2xl bg-[var(--positive-soft)]">
          <CheckCircle2 className="size-5 text-[var(--positive)]" />
        </div>
        <h2
          id="info-panel-title"
          className="mt-5 text-3xl font-semibold tracking-[-0.05em]"
        >
          {panel?.title ?? "Details"}
        </h2>
        <p className="mt-3 text-[0.95rem] leading-7 text-[var(--muted)]">
          {panel?.body ?? ""}
        </p>
      </aside>
    </>
  );
}
