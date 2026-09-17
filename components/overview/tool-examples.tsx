"use client";

import {
  ArrowUpRight,
  Monitor,
  MousePointerClick,
  Server,
} from "lucide-react";
import Link from "next/link";

import { useDashboard } from "@/components/layout/dashboard-provider";
import { Card } from "@/components/ui/card";

export function ToolExamples({
  overviewInsight,
  refundInsight,
}: {
  overviewInsight: string;
  refundInsight: string;
}) {
  const { openPanel } = useDashboard();

  return (
    <Card
      id="overview-tool-examples"
      data-avatar-target="overview-tool-examples"
      className="mt-5 overflow-hidden"
    >
      <div className="p-5 sm:p-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          Runway tool examples
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Client tools change the page. Server tools answer back.
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
          Click any example yourself, or say the quoted prompt to Una.
        </p>
      </div>

      <div className="grid border-t border-[var(--line)] lg:grid-cols-2">
        <section
          aria-labelledby="client-tools-title"
          className="bg-[var(--positive-soft)] p-5 sm:p-6 lg:border-r lg:border-[var(--line)]"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--positive)] px-3 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white">
              <Monitor className="size-3.5" />
              Client tools
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              Browser only
            </span>
          </div>
          <h3 id="client-tools-title" className="mt-4 text-xl font-semibold">
            Changes what you see.
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Runs in this tab. Updates the interface and returns no conversation
            data.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Link
              id="example-set-date-range"
              data-avatar-target="example-set-date-range"
              href="/revenue#revenue-chart"
              className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Show the last 7 days.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--ink)]" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--positive)]">
                set_date_range
              </span>
            </Link>

            <Link
              id="example-filter-tickets"
              data-avatar-target="example-filter-tickets"
              href="/tickets#tickets-actions"
              className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Show only Billing tickets.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--ink)]" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--positive)]">
                filter_tickets
              </span>
            </Link>

            <button
              id="example-open-panel"
              data-avatar-target="example-open-panel"
              className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
              onClick={() =>
                openPanel({
                  title: "Refund dip",
                  body: refundInsight,
                })
              }
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Open the refund detail.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--ink)]" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--positive)]">
                open_panel
              </span>
            </button>

            <Link
              id="example-refresh-tickets"
              data-avatar-target="example-refresh-tickets"
              href="/tickets#tickets-refresh"
              className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Refresh the ticket queue.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--ink)]" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--positive)]">
                refresh_tickets
              </span>
            </Link>
          </div>
        </section>

        <section
          aria-labelledby="server-tools-title"
          className="bg-[var(--ink)] p-5 text-[var(--paper)] sm:p-6"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#11170f]">
              <Server className="size-3.5" />
              Server tools
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] opacity-55">
              Returns data
            </span>
          </div>
          <h3 id="server-tools-title" className="mt-4 text-xl font-semibold">
            Gives Una something to say.
          </h3>
          <p className="mt-2 text-sm leading-6 opacity-65">
            Reads or updates local demo data and returns a result Una can
            explain aloud.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              id="example-get-overview"
              data-avatar-target="example-get-overview"
              className="group rounded-xl border border-[var(--paper)]/15 p-4 text-left transition hover:-translate-y-0.5 hover:bg-[var(--paper)]/10"
              onClick={() =>
                openPanel({
                  title: "Overview insight",
                  body: overviewInsight,
                })
              }
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Give me the dashboard brief.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                get_overview_insights
              </span>
            </button>

            <Link
              id="example-get-revenue"
              data-avatar-target="example-get-revenue"
              href="/revenue#revenue-insight"
              className="group rounded-xl border border-[var(--paper)]/15 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--paper)]/10"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “What caused the revenue dip?”
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                get_revenue
              </span>
            </Link>

            <Link
              id="example-ticket-insights"
              data-avatar-target="example-ticket-insights"
              href="/tickets#tickets-insight"
              className="group rounded-xl border border-[var(--paper)]/15 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--paper)]/10"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “How busy is support?”
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                get_ticket_insights
              </span>
            </Link>

            <Link
              id="example-get-ticket"
              data-avatar-target="example-get-ticket"
              href="/tickets#ticket-row-4803"
              className="group rounded-xl border border-[var(--paper)]/15 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--paper)]/10"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “What is ticket #4803?”
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                get_ticket
              </span>
            </Link>

            <Link
              id="example-create-ticket"
              data-avatar-target="example-create-ticket"
              href="/tickets#new-ticket"
              className="group rounded-xl border border-[var(--paper)]/15 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--paper)]/10"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Create a Billing ticket.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                create_ticket
              </span>
            </Link>

            <Link
              id="example-update-ticket"
              data-avatar-target="example-update-ticket"
              href="/tickets#ticket-status-4803"
              className="group rounded-xl border border-[var(--paper)]/15 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--paper)]/10"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold">
                  “Close ticket #4803.”
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                update_ticket_status
              </span>
            </Link>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="page-actions-title"
        className="flex flex-col gap-4 border-t border-[var(--line)] p-5 sm:p-6 xl:flex-row xl:items-center"
      >
        <div className="xl:w-64 xl:shrink-0">
          <div className="flex items-center gap-2">
            <MousePointerClick className="size-4 text-[var(--positive)]" />
            <h3 id="page-actions-title" className="text-sm font-semibold">
              Built-in page actions
            </h3>
          </div>
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Una can move around the same UI.
          </p>
        </div>
        <div className="grid flex-1 gap-2 sm:grid-cols-3">
          <a
            id="example-scroll-to"
            data-avatar-target="example-scroll-to"
            href="#overview-activity"
            className="rounded-xl border border-[var(--line)] px-4 py-3 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-raised)]"
          >
            <span className="block text-sm font-semibold">
              Scroll to latest tickets
            </span>
            <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              scroll_to
            </span>
          </a>
          <a
            id="example-highlight"
            data-avatar-target="example-highlight"
            href="#overview-metrics"
            className="rounded-xl border border-[var(--line)] px-4 py-3 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-raised)]"
          >
            <span className="block text-sm font-semibold">
              Highlight the metrics
            </span>
            <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              highlight
            </span>
          </a>
          <Link
            id="example-click"
            data-avatar-target="example-click"
            href="/revenue#revenue-anomaly"
            className="rounded-xl border border-[var(--line)] px-4 py-3 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-raised)]"
          >
            <span className="block text-sm font-semibold">
              Open the refund row
            </span>
            <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              click
            </span>
          </Link>
        </div>
      </section>
    </Card>
  );
}
