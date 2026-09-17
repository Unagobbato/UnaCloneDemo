"use client";

import {
  BellRing,
  CircleGauge,
  Mic2,
  MonitorUp,
  Moon,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";

import { useDashboard } from "@/components/layout/dashboard-provider";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NOVA_IMAGE } from "@/lib/avatar";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const { openPanel } = useDashboard();
  const [ticketAlerts, setTicketAlerts] = useState(true);
  const [revenueAlerts, setRevenueAlerts] = useState(true);
  const [testingMic, setTestingMic] = useState(false);

  async function testMicrophone() {
    setTestingMic(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      openPanel({
        title: "Microphone ready",
        body: "The browser granted access and returned a working audio input track.",
      });
    } catch {
      openPanel({
        title: "Microphone blocked",
        body: "Allow microphone access in the browser site settings, then try again.",
      });
    } finally {
      setTestingMic(false);
    }
  }

  return (
    <div id="settings-page" data-avatar-target="settings-page">
      <PageHeader
        eyebrow="Workspace settings"
        title="Tune the demo."
        description="Every setting below is clickable, including the microphone check used before a recording."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <Card
          id="settings-appearance"
          data-avatar-target="settings-appearance"
          className="p-5 sm:p-6"
        >
          <Moon className="size-5 text-[var(--muted)]" />
          <h2 className="mt-4 text-xl font-semibold">Appearance</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            This uses the same theme switch Una clicks in the header.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {(["light", "dark"] as const).map((theme) => (
              <button
                key={theme}
                id={`settings-theme-${theme}`}
                data-avatar-target={`settings-theme-${theme}`}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm font-semibold capitalize",
                  resolvedTheme === theme
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--line)]",
                )}
                onClick={() => setTheme(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </Card>

        <Card
          id="settings-notifications"
          data-avatar-target="settings-notifications"
          className="p-5 sm:p-6"
        >
          <BellRing className="size-5 text-[var(--muted)]" />
          <h2 className="mt-4 text-xl font-semibold">Notifications</h2>
          <div className="mt-5 space-y-3">
            <button
              id="toggle-ticket-alerts"
              data-avatar-target="toggle-ticket-alerts"
              className="flex w-full items-center justify-between rounded-xl border border-[var(--line)] px-4 py-3 text-sm"
              onClick={() => setTicketAlerts((value) => !value)}
            >
              Ticket alerts
              <span className={cn("rounded-full px-2 py-1 text-xs", ticketAlerts ? "bg-[var(--positive-soft)] text-[var(--positive)]" : "bg-[var(--surface-raised)]")}>
                {ticketAlerts ? "On" : "Off"}
              </span>
            </button>
            <button
              id="toggle-revenue-alerts"
              data-avatar-target="toggle-revenue-alerts"
              className="flex w-full items-center justify-between rounded-xl border border-[var(--line)] px-4 py-3 text-sm"
              onClick={() => setRevenueAlerts((value) => !value)}
            >
              Revenue anomalies
              <span className={cn("rounded-full px-2 py-1 text-xs", revenueAlerts ? "bg-[var(--positive-soft)] text-[var(--positive)]" : "bg-[var(--surface-raised)]")}>
                {revenueAlerts ? "On" : "Off"}
              </span>
            </button>
          </div>
        </Card>

        <Card
          id="settings-avatar"
          data-avatar-target="settings-avatar"
          className="p-5 sm:p-6"
        >
          <div className="flex items-center gap-4">
            <Image
              src={NOVA_IMAGE}
              alt="Una support character"
              width={72}
              height={72}
              className="size-[72px] shrink-0 rounded-2xl object-cover object-top"
            />
            <div>
              <p className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Custom Runway Character
              </p>
              <h2 className="mt-1 text-xl font-semibold">Una Support</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Clara preset voice</p>
            </div>
          </div>
          <Button
            id="settings-avatar-details"
            data-avatar-target="settings-avatar-details"
            variant="outline"
            className="mt-5 w-full"
            onClick={() =>
              openPanel({
                title: "Una Support",
                body: "An original Runway-generated support specialist with a brief greeting and concise response instructions.",
              })
            }
          >
            <Sparkles className="size-4" />
            Character details
          </Button>
        </Card>

        <Card
          id="settings-call"
          data-avatar-target="settings-call"
          className="p-5 sm:p-6"
        >
          <Mic2 className="size-5 text-[var(--muted)]" />
          <h2 className="mt-4 text-xl font-semibold">Call readiness</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Test permission before spending any Runway call credits.
          </p>
          <div className="mt-5 grid gap-2">
            <Button
              id="settings-microphone"
              data-avatar-target="settings-microphone"
              variant="outline"
              disabled={testingMic}
              onClick={testMicrophone}
            >
              <Mic2 className="size-4" />
              Test microphone
            </Button>
            <Button
              id="settings-screen-share"
              data-avatar-target="settings-screen-share"
              variant="outline"
              onClick={() =>
                openPanel({
                  title: "Screen sharing",
                  body: "Start Una’s call, then use the screen button in Runway’s control bar.",
                })
              }
            >
              <MonitorUp className="size-4" />
              Share guidance
            </Button>
          </div>
          <Button
            id="settings-connection"
            data-avatar-target="settings-connection"
            variant="ghost"
            className="mt-2 w-full"
            onClick={() =>
              openPanel({
                title: "Connections ready",
                body: "Local demo data is ready. Ticket changes reset when the dev server restarts, and Runway creates a fresh five-minute session only when you start a call.",
              })
            }
          >
            <CircleGauge className="size-4" />
            Connection status
          </Button>
        </Card>
      </section>
    </div>
  );
}
