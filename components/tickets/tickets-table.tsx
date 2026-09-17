import { CircleCheck, Clock3 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import type { TicketRecord } from "@/lib/types";

export function TicketsTable({
  tickets,
  onTicketClick,
  onStatusChange,
}: {
  tickets?: TicketRecord[];
  onTicketClick: (ticket: TicketRecord) => void;
  onStatusChange: (ticket: TicketRecord) => Promise<void>;
}) {
  return (
    <Card
      id="tickets-table"
      data-avatar-target="tickets-table"
      className="overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[660px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--line)] font-mono text-[0.64rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              <th className="px-6 py-3.5 font-medium">Ticket</th>
              <th className="px-4 py-3.5 font-medium">Subject</th>
              <th className="px-4 py-3.5 font-medium">Team</th>
              <th className="px-6 py-3.5 text-right font-medium">
                Click status to change
              </th>
            </tr>
          </thead>
          <tbody>
            {!tickets
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="border-b border-[var(--line)]">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="h-5 animate-pulse rounded-full bg-[var(--surface-raised)]" />
                    </td>
                  </tr>
                ))
              : null}
            {tickets?.map((ticket) => (
              <tr
                key={ticket.ticketId}
                id={`ticket-row-${ticket.ticketId}`}
                data-avatar-target={`ticket-row-${ticket.ticketId}`}
                tabIndex={0}
                role="button"
                className="cursor-pointer border-b border-[var(--line)] text-sm transition last:border-0 hover:bg-[var(--surface-raised)]"
                onClick={() => onTicketClick(ticket)}
                onKeyDown={(event) => {
                  if (event.currentTarget !== event.target) return;
                  if (event.key === "Enter" || event.key === " ") onTicketClick(ticket);
                }}
              >
                <td className="px-6 py-4 font-mono text-xs font-semibold text-[var(--muted)]">
                  #{ticket.ticketId}
                </td>
                <td className="max-w-[360px] px-4 py-4 font-medium">
                  <span className="line-clamp-1">{ticket.subject}</span>
                </td>
                <td className="px-4 py-4 text-[var(--muted)]">{ticket.team}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    id={`ticket-status-${ticket.ticketId}`}
                    data-avatar-target={`ticket-status-${ticket.ticketId}`}
                    type="button"
                    title={`Mark as ${ticket.status === "open" ? "closed" : "open"}`}
                    aria-label={`Mark ticket ${ticket.ticketId} ${
                      ticket.status === "open" ? "closed" : "open"
                    }`}
                    className="rounded-full transition hover:opacity-70"
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange(ticket);
                    }}
                  >
                    <StatusPill
                      tone={ticket.status === "open" ? "warning" : "positive"}
                    >
                      {ticket.status === "open" ? (
                        <Clock3 className="size-3" />
                      ) : (
                        <CircleCheck className="size-3" />
                      )}
                      {ticket.status}
                    </StatusPill>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
