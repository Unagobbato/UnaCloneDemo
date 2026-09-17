"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createTicket as createTicketAction,
  getTickets,
  updateTicketStatus as updateTicketStatusAction,
} from "@/actions/demo";
import { DEMO_TICKETS, getTicketInsights } from "@/lib/demo-data";
import type {
  InfoPanelState,
  RevenueRange,
  TicketFilter,
  TicketInsights,
  TicketRecord,
  TicketStatus,
  TicketTeam,
} from "@/lib/types";

type DashboardContextValue = {
  range: RevenueRange;
  setRange: (range: RevenueRange) => void;
  ticketFilter: TicketFilter;
  setTicketFilter: (filter: TicketFilter) => void;
  tickets: TicketRecord[];
  ticketInsights: TicketInsights;
  createTicket: (input: {
    subject: string;
    team: TicketTeam;
  }) => Promise<TicketRecord>;
  updateTicketStatus: (input: {
    ticketId: number;
    status: TicketStatus;
  }) => Promise<TicketRecord>;
  refreshTickets: () => Promise<void>;
  panel: InfoPanelState | null;
  openPanel: (panel: InfoPanelState) => void;
  closePanel: () => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<RevenueRange>("90d");
  const [ticketFilter, setTicketFilter] = useState<TicketFilter>("all");
  const [tickets, setTickets] = useState<TicketRecord[]>(() =>
    [...DEMO_TICKETS].sort((a, b) => b.createdAt - a.createdAt),
  );
  const [panel, setPanel] = useState<InfoPanelState | null>(null);
  const ticketInsights = getTicketInsights(tickets);

  const refreshTickets = useCallback(async () => {
    setTickets(await getTickets());
  }, []);

  const createTicket = useCallback(
    async (input: { subject: string; team: TicketTeam }) => {
      const ticket = await createTicketAction(input);
      setTickets((current) => [
        ticket,
        ...current.filter((item) => item.ticketId !== ticket.ticketId),
      ]);
      return ticket;
    },
    [],
  );

  const updateTicketStatus = useCallback(
    async (input: { ticketId: number; status: TicketStatus }) => {
      const ticket = await updateTicketStatusAction(input);
      setTickets((current) =>
        current.map((item) =>
          item.ticketId === ticket.ticketId ? ticket : item,
        ),
      );
      return ticket;
    },
    [],
  );

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        range,
        setRange,
        ticketFilter,
        setTicketFilter,
        tickets,
        ticketInsights,
        createTicket,
        updateTicketStatus,
        refreshTickets,
        panel,
        openPanel: setPanel,
        closePanel: () => setPanel(null),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used inside DashboardProvider.");
  }
  return context;
}
