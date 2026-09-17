import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createDemoTicket,
  getDemoTicket,
  getDemoTicketInsights,
  listDemoTickets,
  resetDemoTickets,
  updateDemoTicketStatus,
} from "@/lib/demo-store";

describe("demo ticket store", () => {
  beforeEach(() => {
    resetDemoTickets();
    vi.restoreAllMocks();
  });

  it("returns copied tickets in newest-first order", () => {
    const tickets = listDemoTickets(2);

    expect(tickets.map((ticket) => ticket.ticketId)).toEqual([4_812, 4_811]);

    tickets[0].subject = "Changed outside the store";
    expect(getDemoTicket(4_812)?.subject).toBe(
      "Revenue filter resets after navigation",
    );
  });

  it("creates the next open ticket", () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.UTC(2026, 6, 24, 10));

    const ticket = createDemoTicket({
      subject: "  Customer cannot download their receipt  ",
      team: "Support",
    });

    expect(ticket).toEqual({
      ticketId: 4_813,
      subject: "Customer cannot download their receipt",
      team: "Support",
      status: "open",
      createdAt: Date.UTC(2026, 6, 24, 10),
    });
    expect(getDemoTicket(4_813)).toEqual(ticket);
  });

  it("updates ticket status and insights", () => {
    const updated = updateDemoTicketStatus({
      ticketId: 4_812,
      status: "closed",
    });

    expect(updated.status).toBe("closed");
    expect(getDemoTicketInsights()).toMatchObject({
      total: 10,
      open: 6,
      closed: 4,
    });
  });

  it("rejects missing tickets and empty subjects", () => {
    expect(() =>
      updateDemoTicketStatus({ ticketId: 9_999, status: "closed" }),
    ).toThrow("Ticket #9999 was not found.");
    expect(() => createDemoTicket({ subject: "  ", team: "Billing" })).toThrow(
      "Ticket subject is required.",
    );
  });
});
