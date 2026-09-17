"use client";

import { useState } from "react";

import { AgentCard } from "@/components/agent/agent-card";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { InfoPanel } from "@/components/overlays/info-panel";
import { useDashboard } from "@/components/layout/dashboard-provider";
import { cn } from "@/lib/utils";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { panel, closePanel } = useDashboard();
  const [agentOpen, setAgentOpen] = useState(true);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main
        className={cn(
          "min-h-screen pb-16 transition-[margin] duration-300 ease-out motion-reduce:transition-none md:ml-[218px]",
          agentOpen ? "lg:mr-[420px]" : "lg:mr-0",
        )}
      >
        <TopBar />
        <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-6 sm:px-7 lg:px-8 lg:pt-8">
          {children}
        </div>
      </main>
      <AgentCard open={agentOpen} onOpenChange={setAgentOpen} />
      <InfoPanel panel={panel} onClose={closePanel} />
    </div>
  );
}
