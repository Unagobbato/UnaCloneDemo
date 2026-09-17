import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { InfoPanel } from "@/components/overlays/info-panel";

describe("InfoPanel", () => {
  it("shows the selected dashboard detail", () => {
    render(
      <InfoPanel
        panel={{
          title: "Ticket #4805 created",
          body: "Billing owns the refund investigation.",
        }}
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Ticket #4805 created")).toBeInTheDocument();
    expect(
      screen.getByText("Billing owns the refund investigation."),
    ).toBeInTheDocument();
  });

  it("can be closed independently for repeatable recordings", () => {
    const onClose = vi.fn();
    render(
      <InfoPanel
        panel={{ title: "Complete", body: "Saved." }}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close panel" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
