import { clientTool, pageActionTools } from "@runwayml/avatars-react/api";
import type { RealtimeSessionCreateParams } from "@runwayml/sdk/resources/realtime-sessions";
import { z } from "zod";

export const setDateRangeTool = clientTool("set_date_range", {
  description:
    "Change the visible chart range only when the Revenue page is open and the user asks to show or switch the chart to 7, 30, or 90 days. This changes browser UI only and returns no data.",
  schema: z.object({ range: z.enum(["7d", "30d", "90d"]) }),
});

export const openPanelTool = clientTool("open_panel", {
  description:
    "Open the dashboard info panel only when the user asks to display a short insight or explanation on screen. Requires a title and body; this changes browser UI only and returns no data.",
  schema: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

export const filterTicketsTool = clientTool("filter_tickets", {
  description:
    "Change the visible queue only when the Tickets page is open and the user asks to show all tickets, open tickets, or Billing tickets. This changes browser UI only and returns no data.",
  schema: z.object({ filter: z.enum(["all", "open", "billing"]) }),
});

export const refreshTicketsTool = clientTool("refresh_tickets", {
  description:
    "Refresh the visible ticket queue immediately after create_ticket or update_ticket_status succeeds. Use it only to show that server-side change in the browser. This changes browser UI only and returns no data.",
  schema: z.object({}),
});

export const sessionTools = [
  ...pageActionTools,
  {
    ...setDateRangeTool,
    parameters: [
      {
        name: "range",
        type: "string",
        enum: ["7d", "30d", "90d"],
        description:
          'Required chart range: "7d" for 7 days, "30d" for 30 days, or "90d" for 90 days.',
      },
    ],
  },
  {
    ...openPanelTool,
    parameters: [
      {
        name: "title",
        type: "string",
        description:
          "Required short plain-text heading for the panel, based on what the user asked to show.",
      },
      {
        name: "body",
        type: "string",
        description:
          "Required concise plain-text insight or explanation to display in the panel.",
      },
    ],
  },
  {
    ...filterTicketsTool,
    parameters: [
      {
        name: "filter",
        type: "string",
        enum: ["all", "open", "billing"],
        description:
          'Required filter: "all" for every ticket, "open" for open tickets, or "billing" for tickets owned by Billing.',
      },
    ],
  },
  refreshTicketsTool,
  {
    type: "backend_rpc",
    name: "get_overview_insights",
    description:
      "Fetch the current cross-functional demo brief when the user asks for the overall dashboard, business health, priorities, or a summary spanning revenue and support. Returns 30-day revenue total, change, and refund count plus ticket total, open count, top team, and latest ticket; does not change data.",
    timeoutSeconds: 8,
  },
  {
    type: "backend_rpc",
    name: "get_revenue",
    description:
      "Fetch bundled demo revenue metrics when the user asks about revenue, trend or change, daily average, peak day, refunds, or the revenue dip. Returns the selected range total, comparison percentage, daily average, peak day, refund count, and lowest refund point; does not change data.",
    timeoutSeconds: 8,
    parameters: [
      {
        name: "range",
        type: "string",
        enum: ["7d", "30d", "90d"],
        description:
          'Required demo range: "7d" for the last 7 days, "30d" for the last 30 days, or "90d" for the last 90 days. Use "30d" when the user gives no range.',
      },
    ],
  },
  {
    type: "backend_rpc",
    name: "get_ticket_insights",
    description:
      "Fetch current local support queue metrics when the user asks about ticket volume, open or closed counts, team workload, ownership, or the latest ticket. Returns total, open, and closed counts, open-ticket counts by team, the top team, and the latest ticket; does not change data.",
    timeoutSeconds: 8,
  },
  {
    type: "backend_rpc",
    name: "get_ticket",
    description:
      'Look up one local demo ticket only when the user identifies a specific ticket number. Returns its ID, subject, team, status, and creation time inside "ticket", or returns "ticket" as null when no match exists; does not change data.',
    timeoutSeconds: 8,
    parameters: [
      {
        name: "ticketId",
        type: "integer",
        description:
          'Required whole-number ticket ID. Remove any leading "#"; for example, "#4803" becomes 4803.',
      },
    ],
  },
  {
    type: "backend_rpc",
    name: "create_ticket",
    description:
      "Create a local demo ticket only when the user explicitly asks to create, file, or log one; do not call merely because they describe a problem. Requires a subject and team, creates an open ticket, and returns the complete new ticket. After speaking the result, call refresh_tickets.",
    timeoutSeconds: 8,
    parameters: [
      {
        name: "subject",
        type: "string",
        description:
          "Required non-empty plain-text summary of the issue, no more than 180 characters.",
      },
      {
        name: "team",
        type: "string",
        enum: ["Billing", "Support", "Product"],
        description:
          'Required owning team. Pass exactly "Billing", "Support", or "Product".',
      },
    ],
  },
  {
    type: "backend_rpc",
    name: "update_ticket_status",
    description:
      "Change a local demo ticket only when the user explicitly asks to close or reopen a specific ticket. Requires the ticket ID and target status, and returns the complete updated ticket; the call fails if the ticket does not exist. After speaking the result, call refresh_tickets.",
    timeoutSeconds: 8,
    parameters: [
      {
        name: "ticketId",
        type: "integer",
        description:
          'Required whole-number ticket ID. Remove any leading "#"; for example, "#4803" becomes 4803.',
      },
      {
        name: "status",
        type: "string",
        enum: ["open", "closed"],
        description:
          'Required target status: "closed" to close the ticket or "open" to reopen it.',
      },
    ],
  },
] as NonNullable<RealtimeSessionCreateParams["tools"]>;
