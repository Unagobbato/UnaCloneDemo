import { beforeEach, describe, expect, it } from "vitest";

import {
  createTicket,
  getTickets,
  updateTicketStatus,
} from "@/actions/demo";
import { resetDemoTickets } from "@/lib/demo-store";

describe("demo ticket actions", () => {
  beforeEach(() => {
    resetDemoTickets();
  });

  it("shares the local store across manual actions", async () => {
    const created = await createTicket({
      subject: "Customer cannot find their renewal date",
      team: "Billing",
    });
    const updated = await updateTicketStatus({
      ticketId: created.ticketId,
      status: "closed",
    });
    const tickets = await getTickets();

    expect(updated.status).toBe("closed");
    expect(tickets[0]).toEqual(updated);
  });
});
