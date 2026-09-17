export type RevenueRange = "7d" | "30d" | "90d";
export type TicketFilter = "all" | "open" | "billing";
export type TicketStatus = "open" | "closed";
export type TicketTeam = "Billing" | "Support" | "Product";

export interface RevenuePoint {
  date: string;
  amount: number;
  refunded: boolean;
}

export interface RevenueSummaryPoint {
  date: string;
  amount: number;
}

export interface RevenueResult {
  total: number;
  changePct: number;
  dailyAverage: number;
  peakDay: RevenueSummaryPoint | null;
  refundCount: number;
  dip: RevenuePoint | null;
  series: RevenuePoint[];
}

export interface TicketRecord {
  ticketId: number;
  subject: string;
  team: TicketTeam;
  status: TicketStatus;
  createdAt: number;
}

export interface TicketTeamCount {
  team: TicketTeam;
  count: number;
}

export interface TicketInsights {
  total: number;
  open: number;
  closed: number;
  byTeam: TicketTeamCount[];
  topTeam: TicketTeamCount | null;
  latestTicket: TicketRecord | null;
}

export interface InfoPanelState {
  title: string;
  body: string;
}
