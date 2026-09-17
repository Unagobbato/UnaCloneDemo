import { describe, expect, it } from "vitest";

import {
  DEMO_REVENUE,
  DEMO_TICKETS,
  getDemoRevenue,
  getTicketInsights,
} from "@/lib/demo-data";

describe("demo revenue", () => {
  it("keeps enough history for a truthful 90-day comparison", () => {
    expect(DEMO_REVENUE).toHaveLength(180);
    expect(DEMO_REVENUE[0].date).toBe("2026-01-26");
    expect(DEMO_REVENUE.at(-1)?.date).toBe("2026-07-24");

    const result = getDemoRevenue("90d");

    expect(result.series).toHaveLength(90);
    expect(result.total).toBe(349_783);
    expect(result.dailyAverage).toBe(3_886.48);
  });

  it("compares each range with the preceding equally sized period", () => {
    for (const range of ["7d", "30d", "90d"] as const) {
      const result = getDemoRevenue(range);
      expect(result.changePct).not.toBe(0);
    }
  });

  it("marks the refund 14 days before the end date", () => {
    const result = getDemoRevenue("30d");

    expect(result.dip).toEqual({
      date: "2026-07-10",
      amount: -2_850,
      refunded: true,
    });
    expect(result.refundCount).toBe(1);
    expect(getDemoRevenue("7d").dip).toBeNull();
  });

  it("returns the selected number of rows and a useful peak", () => {
    const result = getDemoRevenue("7d");

    expect(result.series).toHaveLength(7);
    expect(result.peakDay?.amount).toBeGreaterThan(0);
    expect(Number.isFinite(result.changePct)).toBe(true);
  });
});

describe("demo ticket insights", () => {
  it("summarizes the fixture without changing it", () => {
    const original = structuredClone(DEMO_TICKETS);
    const insights = getTicketInsights(DEMO_TICKETS);

    expect(insights).toMatchObject({
      total: 10,
      open: 7,
      closed: 3,
      latestTicket: {
        ticketId: 4_812,
      },
    });
    expect(insights.topTeam).toEqual({ team: "Support", count: 3 });
    expect(DEMO_TICKETS).toEqual(original);
  });

  it("handles an empty ticket list", () => {
    expect(getTicketInsights([])).toEqual({
      total: 0,
      open: 0,
      closed: 0,
      byTeam: [],
      topTeam: null,
      latestTicket: null,
    });
  });
});
