"use client";

import {
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { useDashboard } from "@/components/layout/dashboard-provider";
import { PageHeader } from "@/components/layout/page-header";
import { NewTicketDialog } from "@/components/tickets/new-ticket-dialog";
import { TicketsTable } from "@/components/tickets/tickets-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TicketsPage() {
  const {
    createTicket,
    openPanel,
    refreshTickets,
    ticketFilter,
    ticketInsights,
    tickets,
    setTicketFilter,
    updateTicketStatus,
  } = useDashboard();
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredTickets = tickets.filter((ticket) => {
    if (ticketFilter === "open") return ticket.status === "open";
    if (ticketFilter === "billing") return ticket.team === "Billing";
    return true;
  });
  const queueInsight = `${ticketInsights.open} open and ${ticketInsights.closed} closed across ${ticketInsights.total} tickets.${
    ticketInsights.topTeam
      ? ` ${ticketInsights.topTeam.team} owns the largest queue with ${ticketInsights.topTeam.count}.`
      : ""
  }${
    ticketInsights.latestTicket
      ? ` Latest is #${ticketInsights.latestTicket.ticketId}: ${ticketInsights.latestTicket.subject}.`
      : ""
  }`;

  return (
    <div id="tickets-page" data-avatar-target="tickets-page">
      <PageHeader
        eyebrow="Customer support"
        title="Work the queue."
        description="Filter, inspect, and update the same local demo tickets available to Una."
      />

      <section
        id="tickets-actions"
        data-avatar-target="tickets-actions"
        className="mb-5 flex flex-col gap-3 rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div id="tickets-filters" data-avatar-target="tickets-filters" className="flex gap-1">
          {(["all", "open", "billing"] as const).map((value) => (
            <button
              key={value}
              id={`ticket-filter-${value}`}
              data-avatar-target={`ticket-filter-${value}`}
              aria-pressed={ticketFilter === value}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold capitalize",
                ticketFilter === value
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-raised)]",
              )}
              onClick={() => setTicketFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            id="tickets-insight"
            data-avatar-target="tickets-insight"
            variant="outline"
            onClick={() =>
              openPanel({
                title: "Ticket queue insight",
                body: queueInsight,
              })
            }
          >
            <Sparkles className="size-4" />
            Queue insight
          </Button>
          <Button
            id="ticket-filter-help"
            data-avatar-target="ticket-filter-help"
            variant="outline"
            onClick={() =>
              openPanel({
                title: "Queue filters",
                body: "All shows every ticket, Open shows active work, and Billing narrows the owning team.",
              })
            }
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
          <Button
            id="tickets-refresh"
            data-avatar-target="tickets-refresh"
            variant="outline"
            onClick={async () => {
              await refreshTickets();
              openPanel({
                title: "Ticket queue refreshed",
                body: "The visible queue now matches the shared local demo store.",
              });
            }}
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
          <Button
            id="new-ticket"
            data-avatar-target="new-ticket"
            variant="accent"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="size-4" />
            New ticket
          </Button>
        </div>
      </section>

      <TicketsTable
        tickets={filteredTickets}
        onTicketClick={(ticket) =>
          openPanel({
            title: `Ticket #${ticket.ticketId}`,
            body: `${ticket.subject} is ${ticket.status} and owned by ${ticket.team}.`,
          })
        }
        onStatusChange={async (ticket) => {
          const status = ticket.status === "open" ? "closed" : "open";
          await updateTicketStatus({ ticketId: ticket.ticketId, status });
          openPanel({
            title: `Ticket #${ticket.ticketId} updated`,
            body: `${ticket.subject} is now ${status}.`,
          });
        }}
      />

      <NewTicketDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={createTicket}
        onCreated={(ticket) =>
          openPanel({
            title: `Ticket #${ticket.ticketId} created`,
            body: `${ticket.subject} is open and assigned to ${ticket.team}.`,
          })
        }
      />
    </div>
  );
}
