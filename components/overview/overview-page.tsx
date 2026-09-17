"use client";

import { BadgeAlert, CreditCard, TicketCheck } from "lucide-react";
import Link from "next/link";

import { useDashboard } from "@/components/layout/dashboard-provider";
import { MetricCard } from "@/components/layout/metric-card";
import { PageHeader } from "@/components/layout/page-header";
import { ToolExamples } from "@/components/overview/tool-examples";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { getDemoRevenue } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export function OverviewPage() {
  const { openPanel, tickets, ticketInsights } = useDashboard();
  const revenue = getDemoRevenue("30d");
  const recentTickets = tickets.slice(0, 4);
  const overviewInsight = `${formatCurrency(revenue.total)} in 30-day revenue, ${revenue.changePct}% versus the previous period, ${revenue.refundCount} refund flags, and ${ticketInsights.open} open tickets.${
    ticketInsights.topTeam
      ? ` ${ticketInsights.topTeam.team} owns the largest queue with ${ticketInsights.topTeam.count}.`
      : ""
  }`;
  const refundInsight = revenue.dip
    ? `${formatCurrency(revenue.dip.amount)} is marked as a refund in the 30-day revenue view.`
    : "No refund anomaly is visible in the current 30-day data.";

  return (
    <div id="overview-page" data-avatar-target="overview-page">
      <PageHeader
        eyebrow="Live operations · Dubai"
        title="Your support signal."
        description="Open any card yourself, or ask Una to navigate and take the same actions."
      />

      <section
        id="overview-metrics"
        data-avatar-target="overview-metrics"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        <MetricCard
          id="metric-revenue"
          eyebrow="30-day revenue"
          value={formatCurrency(revenue.total)}
          detail={`${revenue.changePct}% vs previous period`}
          icon={CreditCard}
          trend={revenue.changePct < 0 ? "down" : "up"}
          onClick={() =>
            openPanel({
              title: "Revenue snapshot",
              body: `${formatCurrency(revenue.total)} over 30 days, ${revenue.changePct}% versus the previous period.`,
            })
          }
        />
        <MetricCard
          id="metric-refunds"
          eyebrow="Refunds flagged"
          value={String(revenue.refundCount)}
          detail="Marked in the bundled demo rows"
          icon={BadgeAlert}
          trend={revenue.refundCount ? "down" : "neutral"}
          onClick={() =>
            openPanel({
              title: "Refund flags",
              body: `${revenue.refundCount} refund rows are marked in the current 30-day period.`,
            })
          }
        />
        <MetricCard
          id="metric-tickets"
          eyebrow="Tickets open"
          value={String(ticketInsights.open)}
          detail="Shared local demo queue"
          icon={TicketCheck}
          trend="neutral"
          onClick={() =>
            openPanel({
              title: "Support queue",
              body: `${ticketInsights.open} tickets are currently open. Visit Tickets to inspect or create one.`,
            })
          }
          className="sm:col-span-2 xl:col-span-1"
        />
      </section>

      <ToolExamples
        overviewInsight={overviewInsight}
        refundInsight={refundInsight}
      />

      <Card
        id="overview-activity"
        data-avatar-target="overview-activity"
        className="mt-5 overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] p-5 sm:px-6">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Recent activity
            </p>
            <h2 className="mt-2 text-xl font-semibold">Latest tickets</h2>
          </div>
          <Link
            id="overview-view-tickets"
            data-avatar-target="overview-view-tickets"
            href="/tickets"
            className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-[var(--line)]">
          {recentTickets.map((ticket) => (
            <button
              key={ticket.ticketId}
              id={`overview-ticket-${ticket.ticketId}`}
              data-avatar-target={`overview-ticket-${ticket.ticketId}`}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[var(--surface-raised)] sm:px-6"
              onClick={() =>
                openPanel({
                  title: `Ticket #${ticket.ticketId}`,
                  body: `${ticket.subject} · ${ticket.team} · ${ticket.status}.`,
                })
              }
            >
              <span className="font-mono text-xs text-[var(--muted)]">
                #{ticket.ticketId}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {ticket.subject}
              </span>
              <StatusPill tone={ticket.status === "open" ? "warning" : "positive"}>
                {ticket.status}
              </StatusPill>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
