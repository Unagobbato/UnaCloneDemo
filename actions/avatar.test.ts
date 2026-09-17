import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  createRpcHandler: vi.fn(),
  consumeSession: vi.fn(),
  pollUntilReady: vi.fn(),
}));

vi.mock("@runwayml/sdk", () => ({
  default: class MockRunway {
    realtimeSessions = { create: mocks.create };
  },
}));

vi.mock("@runwayml/avatars-react/api", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("@runwayml/avatars-react/api")
  >();
  return {
    ...actual,
    consumeSession: mocks.consumeSession,
    pollUntilReady: mocks.pollUntilReady,
  };
});

vi.mock("@runwayml/avatars-node-rpc", () => ({
  createRpcHandler: mocks.createRpcHandler,
}));

import { createAvatarSession } from "@/actions/avatar";
import { getTickets } from "@/actions/demo";
import {
  NOVA_AVATAR_ID,
  NOVA_PERSONALITY,
  NOVA_START_SCRIPT,
} from "@/lib/avatar";
import { getDemoRevenue } from "@/lib/demo-data";
import { resetDemoTickets } from "@/lib/demo-store";

type RpcOptions = {
  sessionId: string;
  onDisconnected: () => void;
  tools: {
    get_overview_insights: () => Promise<unknown>;
    get_revenue: (args: Record<string, unknown>) => Promise<unknown>;
    get_ticket_insights: () => Promise<unknown>;
    get_ticket: (args: Record<string, unknown>) => Promise<unknown>;
    create_ticket: (args: Record<string, unknown>) => Promise<unknown>;
    update_ticket_status: (args: Record<string, unknown>) => Promise<unknown>;
  };
};

describe("createAvatarSession", () => {
  beforeEach(() => {
    vi.stubEnv("RUNWAYML_API_SECRET", "mock-key");
    mocks.create.mockReset();
    mocks.createRpcHandler.mockReset();
    mocks.consumeSession.mockReset();
    mocks.pollUntilReady.mockReset();
    resetDemoTickets();
  });

  it("creates a session and connects its server tools", async () => {
    let rpcOptions: RpcOptions | undefined;
    mocks.create.mockResolvedValue({ id: "session-123" });
    mocks.pollUntilReady.mockResolvedValue({
      sessionId: "session-123",
      sessionKey: "session-key",
    });
    mocks.createRpcHandler.mockImplementation(async (options: RpcOptions) => {
      rpcOptions = options;
      return { close: vi.fn() };
    });
    mocks.consumeSession.mockResolvedValue({
      url: "wss://runway.example",
      token: "livekit-token",
      roomName: "room-123",
    });
    const revenue = getDemoRevenue("30d");

    await expect(createAvatarSession()).resolves.toEqual({
      sessionId: "session-123",
      serverUrl: "wss://runway.example",
      token: "livekit-token",
      roomName: "room-123",
    });
    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "gwm1_avatars",
        avatar: { type: "custom", avatarId: NOVA_AVATAR_ID },
        personality: expect.stringContaining(
          "Client tools and Page Actions — order matters",
        ),
        startScript: NOVA_START_SCRIPT,
      }),
    );
    expect(NOVA_PERSONALITY).toContain(
      "call scroll_to first, then call highlight",
    );
    expect(NOVA_PERSONALITY).toContain("Use filter_tickets only");
    expect(NOVA_PERSONALITY).toContain(
      "Never call a destination-page target in that same response.",
    );
    expect(NOVA_PERSONALITY).toContain(
      "sharing their screen can help you diagnose",
    );
    expect(NOVA_START_SCRIPT).toContain("Share your screen");
    expect(mocks.pollUntilReady).toHaveBeenCalledWith({
      sessionId: "session-123",
      apiKey: "mock-key",
    });
    expect(mocks.createRpcHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: "mock-key",
        sessionId: "session-123",
      }),
    );
    await expect(
      rpcOptions!.tools.get_overview_insights(),
    ).resolves.toMatchObject({
      revenue: {
        total: revenue.total,
        changePct: revenue.changePct,
        refundCount: revenue.refundCount,
      },
      support: {
        total: 10,
        open: 7,
        topTeam: { team: "Support", count: 3 },
        latestTicket: { ticketId: 4_812 },
      },
    });
    await expect(
      rpcOptions!.tools.get_revenue({ range: "30d" }),
    ).resolves.toMatchObject({
      total: revenue.total,
      changePct: revenue.changePct,
      dailyAverage: revenue.dailyAverage,
      peakDay: revenue.peakDay,
      refundCount: revenue.refundCount,
      dip: revenue.dip,
    });
    await expect(
      rpcOptions!.tools.get_ticket_insights(),
    ).resolves.toMatchObject({
      total: 10,
      open: 7,
      closed: 3,
      topTeam: { team: "Support", count: 3 },
      latestTicket: { ticketId: 4_812 },
    });
    await expect(
      rpcOptions!.tools.get_ticket({ ticketId: 4_806 }),
    ).resolves.toMatchObject({
      ticket: {
        ticketId: 4_806,
        subject: "Password reset link expires immediately",
        team: "Support",
        status: "closed",
      },
    });
    const created = await rpcOptions!.tools.create_ticket({
      subject: "Investigate refund",
      team: "Billing",
    });
    expect(created).toMatchObject({
      ticket: {
        ticketId: 4_813,
        subject: "Investigate refund",
        team: "Billing",
        status: "open",
      },
    });
    await expect(getTickets()).resolves.toContainEqual(
      expect.objectContaining({
        ticketId: 4_813,
        subject: "Investigate refund",
      }),
    );
    await expect(
      rpcOptions!.tools.update_ticket_status({
        ticketId: 4_813,
        status: "closed",
      }),
    ).resolves.toMatchObject({
      ticketId: 4_813,
      subject: "Investigate refund",
      team: "Billing",
      status: "closed",
    });
    expect(mocks.consumeSession).toHaveBeenCalledWith({
      sessionId: "session-123",
      sessionKey: "session-key",
    });
    rpcOptions!.onDisconnected();
  });
});
