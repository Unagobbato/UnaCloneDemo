"use client";

import {
  ArrowDownToLine,
  GitCompareArrows,
  ReceiptText,
  Sparkles,
} from "lucide-react";

import { useDashboard } from "@/components/layout/dashboard-provider";
import { PageHeader } from "@/components/layout/page-header";
import { RevenueChart } from "@/components/revenue/revenue-chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDemoRevenue } from "@/lib/demo-data";
import { formatCurrency, formatShortDate } from "@/lib/utils";

export function RevenuePage() {
  const { range, setRange, openPanel } = useDashboard();
  const revenue = getDemoRevenue(range);
  const revenueInsight = `${formatCurrency(revenue.total)} total at ${formatCurrency(revenue.dailyAverage)} per day, ${revenue.changePct}% versus the previous comparable period. ${
    revenue.peakDay
      ? `The peak was ${formatCurrency(revenue.peakDay.amount)} on ${formatShortDate(revenue.peakDay.date)}.`
      : "No peak day is available."
  } ${revenue.refundCount} ${
    revenue.refundCount === 1 ? "refund was" : "refunds were"
  } flagged. ${
    revenue.dip
      ? `The largest was ${formatCurrency(revenue.dip.amount)} on ${formatShortDate(revenue.dip.date)}.`
      : "No refund anomaly is visible in this range."
  }`;

  function exportCsv() {
    const rows = ["date,amount,refunded", ...revenue.series.map((row) =>
      `${row.date},${row.amount},${Boolean(row.refunded)}`,
    )];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `una-transport-revenue-${range}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="revenue-page" data-avatar-target="revenue-page">
      <PageHeader
        eyebrow="Revenue intelligence"
        title="Find what changed."
        description="Change the range, inspect the refund, or export the same demo rows Una reads."
      />

      <section
        id="revenue-summary"
        data-avatar-target="revenue-summary"
        className="mb-5 grid gap-3 sm:grid-cols-3"
      >
        <Card className="p-5">
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-[var(--muted)]">
            Selected total
          </p>
          <p className="mt-3 text-2xl font-semibold">
            {formatCurrency(revenue.total)}
          </p>
        </Card>
        <button
          id="revenue-compare"
          data-avatar-target="revenue-compare"
          className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-5 text-left transition hover:border-[var(--line-strong)]"
          onClick={() =>
            openPanel({
              title: "Period comparison",
              body: `${range} revenue is ${revenue.changePct}% versus the previous comparable period.`,
            })
          }
        >
          <GitCompareArrows className="size-4 text-[var(--muted)]" />
          <p className="mt-3 text-sm font-semibold">Compare periods</p>
        </button>
        <button
          id="revenue-export"
          data-avatar-target="revenue-export"
          className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-5 text-left transition hover:border-[var(--line-strong)]"
          onClick={exportCsv}
        >
          <ArrowDownToLine className="size-4 text-[var(--muted)]" />
          <p className="mt-3 text-sm font-semibold">Export visible rows</p>
        </button>
      </section>

      <RevenueChart
        range={range}
        onRangeChange={setRange}
        data={revenue}
        onOpenAnomaly={() =>
          openPanel({
            title: "Refund anomaly",
            body: revenue?.dip
              ? `${formatCurrency(revenue.dip.amount)} was marked as a refund on ${formatShortDate(revenue.dip.date)}.`
              : "No refund anomaly is visible in this range.",
          })
        }
      />

      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <Button
          id="revenue-insight"
          data-avatar-target="revenue-insight"
          variant="accent"
          onClick={() =>
            openPanel({
              title: `${range} revenue insight`,
              body: revenueInsight,
            })
          }
        >
          <Sparkles className="size-4" />
          Revenue insight
        </Button>
        <Button
          id="revenue-explain"
          data-avatar-target="revenue-explain"
          variant="outline"
          onClick={() =>
            openPanel({
              title: "How this is calculated",
              body: "The total sums the bundled daily demo rows. Negative refund rows remain visible.",
            })
          }
        >
          <ReceiptText className="size-4" />
          Calculation details
        </Button>
      </div>
    </div>
  );
}
