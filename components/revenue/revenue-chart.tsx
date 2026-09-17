"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartSkeleton } from "@/components/revenue/chart-skeleton";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import type { RevenueRange, RevenueResult } from "@/lib/types";
import { cn, formatCurrency, formatShortDate } from "@/lib/utils";

const ranges: Array<{ value: RevenueRange; label: string }> = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

export function RevenueChart({
  range,
  onRangeChange,
  data,
  onOpenAnomaly,
}: {
  range: RevenueRange;
  onRangeChange: (range: RevenueRange) => void;
  data?: RevenueResult;
  onOpenAnomaly: () => void;
}) {
  const chartData = data?.series ?? [];
  const dip = data?.dip ?? null;

  return (
    <section
      id="revenue-chart"
      data-avatar-target="revenue-chart"
      className="overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_22px_70px_rgba(21,26,25,0.07)]"
    >
      <div className="flex flex-col gap-5 border-b border-[var(--line)] px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]">
              Demo net revenue
            </p>
            <StatusPill tone={dip ? "danger" : "positive"}>
              {dip ? "Refund marked" : "Healthy"}
            </StatusPill>
          </div>
          <h2 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.045em]">
            Revenue pulse
          </h2>
        </div>
        <div className="flex w-fit rounded-full border border-[var(--line)] bg-[var(--surface-raised)] p-1">
          {ranges.map((option) => (
            <Button
              key={option.value}
              id={`range-${option.value}`}
              data-avatar-target={`range-${option.value}`}
              variant="ghost"
              size="sm"
              aria-pressed={range === option.value}
              className={cn(
                "h-8 px-3.5 text-[0.72rem]",
                range === option.value &&
                  "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)]",
              )}
              onClick={() => onRangeChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative h-[340px] px-2 pb-3 pt-7 sm:px-5">
        {!data ? <ChartSkeleton /> : null}
        {data && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 14, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--chart)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="4 5" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                minTickGap={28}
                tickFormatter={formatShortDate}
                tick={{ fill: "var(--muted)", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
                tick={{ fill: "var(--muted)", fontSize: 11 }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), "Net revenue"]}
                labelFormatter={(label) => formatShortDate(String(label))}
                contentStyle={{
                  border: "1px solid var(--line-strong)",
                  borderRadius: "14px",
                  background: "var(--surface)",
                  color: "var(--ink)",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="var(--chart)"
                strokeWidth={2.6}
                fill="url(#revenueFill)"
              />
              {dip ? (
                <ReferenceDot
                  x={dip.date}
                  y={dip.amount}
                  r={6}
                  fill="var(--danger)"
                  stroke="var(--surface)"
                  strokeWidth={3}
                />
              ) : null}
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </div>

      {dip ? (
        <button
          id="revenue-anomaly"
          data-avatar-target="revenue-anomaly"
          className="mx-5 mb-5 flex w-[calc(100%-2.5rem)] items-center justify-between gap-3 rounded-2xl border border-[var(--danger-soft)] bg-[var(--danger-soft)] px-4 py-3 text-left text-sm sm:mx-7 sm:w-[calc(100%-3.5rem)]"
          onClick={onOpenAnomaly}
        >
          <span>
            <strong>Refund dip · {formatShortDate(dip.date)}</strong>
            <span className="ml-2 text-[var(--muted)]">Click to inspect</span>
          </span>
          <span className="font-mono font-semibold text-[var(--danger)]">
            {formatCurrency(dip.amount)}
          </span>
        </button>
      ) : null}
    </section>
  );
}
