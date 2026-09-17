import { DEMO_TICKETS, getTicketInsights } from "@/lib/demo-data";
import type {
  TicketInsights,
  TicketRecord,
  TicketStatus,
  TicketTeam,
} from "@/lib/types";

type DemoStore = {
  tickets: TicketRecord[];
};

const globalDemoStore = globalThis as typeof globalThis & {
  northstarDemoStore?: DemoStore;
};

function copyTicket(ticket: TicketRecord): TicketRecord {
  return { ...ticket };
}

function getStore() {
  globalDemoStore.northstarDemoStore ??= {
    tickets: DEMO_TICKETS.map(copyTicket),
  };

  return globalDemoStore.northstarDemoStore;
}

export function listDemoTickets(limit = 50): TicketRecord[] {
  return [...getStore().tickets]
    .sort((a, b) => b.createdAt - a.createdAt || b.ticketId - a.ticketId)
    .slice(0, limit)
    .map(copyTicket);
}

export function getDemoTicket(ticketId: number): TicketRecord | null {
  const ticket = getStore().tickets.find(
    (candidate) => candidate.ticketId === ticketId,
  );

  return ticket ? copyTicket(ticket) : null;
}

export function createDemoTicket(input: {
  subject: string;
  team: TicketTeam;
}): TicketRecord {
  const subject = input.subject.trim();

  if (!subject) {
    throw new Error("Ticket subject is required.");
  }

  if (subject.length > 180) {
    throw new Error("Ticket subject must be 180 characters or fewer.");
  }

  const store = getStore();
  const ticket: TicketRecord = {
    ticketId:
      Math.max(...store.tickets.map((existing) => existing.ticketId), 4_799) +
      1,
    subject,
    team: input.team,
    status: "open",
    createdAt: Date.now(),
  };

  store.tickets.push(ticket);
  return copyTicket(ticket);
}

export function updateDemoTicketStatus(input: {
  ticketId: number;
  status: TicketStatus;
}): TicketRecord {
  const ticket = getStore().tickets.find(
    (candidate) => candidate.ticketId === input.ticketId,
  );

  if (!ticket) {
    throw new Error(`Ticket #${input.ticketId} was not found.`);
  }

  ticket.status = input.status;
  return copyTicket(ticket);
}

export function getDemoTicketInsights(): TicketInsights {
  return getTicketInsights(listDemoTickets());
}

export function resetDemoTickets() {
  globalDemoStore.northstarDemoStore = {
    tickets: DEMO_TICKETS.map(copyTicket),
  };
}
