import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { AgentCard } from "@/components/agent/agent-card";

const { createAvatarSession } = vi.hoisted(() => ({
  createAvatarSession: vi.fn(),
}));

vi.mock("@/actions/avatar", () => ({ createAvatarSession }));
vi.mock("@/components/agent/client-tool-handlers", () => ({
  ClientToolHandlers: () => null,
}));
vi.mock("@runwayml/avatars-react", () => ({
  AvatarCall: ({
    credentials,
    onEnd,
    children,
  }: {
    credentials: { sessionId: string };
    onEnd: () => void;
    children: ReactNode;
  }) => (
    <div data-testid={`call-${credentials.sessionId}`}>
      {children}
      <button onClick={onEnd}>Hang up</button>
    </div>
  ),
  AvatarVideo: ({ className }: { className?: string }) => (
    <div className={className} data-testid="avatar-video" />
  ),
  ControlBar: () => null,
  PageActions: () => null,
  ScreenShareVideo: ({ className }: { className?: string }) => (
    <div className={className} data-testid="screen-share-video" />
  ),
  UserVideo: ({ className }: { className?: string }) => (
    <div className={className} data-testid="user-video" />
  ),
}));

const firstSession = {
  sessionId: "session-1",
  serverUrl: "wss://example.com",
  token: "token-1",
  roomName: "room-1",
};

const secondSession = {
  ...firstSession,
  sessionId: "session-2",
  token: "token-2",
  roomName: "room-2",
};

describe("AgentCard", () => {
  it("creates fresh credentials after hanging up", async () => {
    createAvatarSession
      .mockResolvedValueOnce(firstSession)
      .mockResolvedValueOnce(secondSession);

    render(<AgentCard open onOpenChange={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: "Start call" }));
    expect(await screen.findByTestId("call-session-1")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-video")).toHaveClass(
      "!absolute",
      "inset-0",
    );
    expect(screen.getByTestId("screen-share-video")).toHaveClass(
      "!absolute",
      "bottom-32",
      "left-4",
      "aspect-video",
      "!w-[55%]",
    );
    expect(screen.getByTestId("user-video")).toHaveClass("!bottom-32");

    fireEvent.click(screen.getByRole("button", { name: "Hang up" }));
    await waitFor(() =>
      expect(screen.queryByTestId("call-session-1")).not.toBeInTheDocument(),
    );

    fireEvent.click(screen.getByRole("button", { name: "Start call" }));
    expect(await screen.findByTestId("call-session-2")).toBeInTheDocument();
    expect(createAvatarSession).toHaveBeenCalledTimes(2);
  });
});
