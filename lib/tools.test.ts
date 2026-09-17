import { validateClientToolArgs } from "@runwayml/avatars-react/api";
import { describe, expect, it } from "vitest";

import {
  filterTicketsTool,
  openPanelTool,
  refreshTicketsTool,
  sessionTools,
  setDateRangeTool,
} from "@/lib/tools";

describe("Nova tool contract", () => {
  it("keeps the demo below Runway's 20-tool session limit", () => {
    expect(sessionTools).toHaveLength(13);
  });

  it("includes all three Page Actions with model-facing targets", () => {
    for (const name of ["click", "scroll_to", "highlight"]) {
      const tool = sessionTools.find((candidate) => candidate.name === name);
      expect(tool).toMatchObject({ type: "client_event", name });
      expect(tool?.parameters?.some((parameter) => parameter.name === "target")).toBe(
        true,
      );
    }
  });

  it("keeps Zod validation and explicit client-tool parameters in sync", () => {
    expect(
      validateClientToolArgs(setDateRangeTool, { range: "30d" }),
    ).toEqual({ range: "30d" });
    expect(validateClientToolArgs(setDateRangeTool, { range: "31d" })).toBeNull();

    const rangeTool = sessionTools.find((tool) => tool.name === "set_date_range");
    expect(rangeTool?.parameters?.[0]).toMatchObject({
      name: "range",
      enum: ["7d", "30d", "90d"],
    });

    expect(
      validateClientToolArgs(openPanelTool, {
        title: "Revenue insight",
        body: "Revenue is up.",
      }),
    ).toEqual({
      title: "Revenue insight",
      body: "Revenue is up.",
    });
    expect(validateClientToolArgs(openPanelTool, { title: "Missing body" })).toBeNull();

    expect(
      validateClientToolArgs(filterTicketsTool, { filter: "billing" }),
    ).toEqual({ filter: "billing" });
    expect(
      validateClientToolArgs(filterTicketsTool, { filter: "product" }),
    ).toBeNull();

    const filterTool = sessionTools.find(
      (tool) => tool.name === "filter_tickets",
    );
    expect(filterTool?.parameters?.[0]).toMatchObject({
      name: "filter",
      enum: ["all", "open", "billing"],
    });

    expect(validateClientToolArgs(refreshTicketsTool, {})).toEqual({});
    expect(
      sessionTools.find((tool) => tool.name === "refresh_tickets"),
    ).toMatchObject({
      type: "client_event",
      name: "refresh_tickets",
    });
  });

  it("declares every local-data server capability with a bounded timeout", () => {
    for (const name of [
      "get_overview_insights",
      "get_revenue",
      "get_ticket_insights",
      "get_ticket",
      "create_ticket",
      "update_ticket_status",
    ]) {
      expect(sessionTools).toContainEqual(
        expect.objectContaining({
          type: "backend_rpc",
          name,
          timeoutSeconds: 8,
        }),
      );
    }
  });
});
