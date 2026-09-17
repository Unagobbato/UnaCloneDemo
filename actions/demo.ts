"use server";

import {
  createDemoTicket,
  listDemoTickets,
  updateDemoTicketStatus,
} from "@/lib/demo-store";
import type { TicketStatus, TicketTeam } from "@/lib/types";

export async function getTickets() {
  return listDemoTickets();
}

export async function createTicket(input: {
  subject: string;
  team: TicketTeam;
}) {
  return createDemoTicket(input);
}

export async function updateTicketStatus(input: {
  ticketId: number;
  status: TicketStatus;
}) {
  return updateDemoTicketStatus(input);
}
