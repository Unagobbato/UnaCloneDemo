"use client";

import { LoaderCircle, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { TicketRecord, TicketTeam } from "@/lib/types";

export function NewTicketDialog({
  open,
  onClose,
  onCreate,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: {
    subject: string;
    team: TicketTeam;
  }) => Promise<TicketRecord>;
  onCreated: (ticket: TicketRecord) => void;
}) {
  const [subject, setSubject] = useState("Investigate refund in the 30-day revenue report");
  const [team, setTeam] = useState<TicketTeam>("Billing");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const ticket = await onCreate({ subject, team });
      onCreated(ticket);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div
      id="new-ticket-dialog"
      data-avatar-target="new-ticket-dialog"
      className="fixed inset-0 z-[60] grid place-items-center bg-black/35 p-4 backdrop-blur-sm"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Local demo ticket
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Create a ticket</h2>
          </div>
          <Button
            id="close-new-ticket"
            data-avatar-target="close-new-ticket"
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close new ticket form"
          >
            <X className="size-4" />
          </Button>
        </div>
        <label className="mt-6 block text-sm font-semibold">
          Subject
          <input
            id="ticket-subject"
            data-avatar-target="ticket-subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 font-normal outline-none focus:border-[var(--ink)]"
            required
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Team
          <select
            id="ticket-team"
            data-avatar-target="ticket-team"
            value={team}
            onChange={(event) => setTeam(event.target.value as TicketTeam)}
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 font-normal outline-none"
          >
            <option>Billing</option>
            <option>Support</option>
            <option>Product</option>
          </select>
        </label>
        <Button
          id="submit-ticket"
          data-avatar-target="submit-ticket"
          type="submit"
          variant="accent"
          className="mt-6 w-full"
          disabled={saving}
        >
          {saving ? <LoaderCircle className="size-4 animate-spin" /> : null}
          Create demo ticket
        </Button>
      </form>
    </div>
  );
}
