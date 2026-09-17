"use client";

import {
  AvatarCall,
  AvatarVideo,
  ControlBar,
  PageActions,
  ScreenShareVideo,
  type SessionCredentials,
  UserVideo,
} from "@runwayml/avatars-react";
import { ChevronLeft, ChevronRight, Headphones } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { createAvatarSession } from "@/actions/avatar";
import { ClientToolHandlers } from "@/components/agent/client-tool-handlers";
import { Button } from "@/components/ui/button";
import { NOVA_AVATAR_ID, NOVA_IMAGE } from "@/lib/avatar";
import { cn } from "@/lib/utils";

export function AgentCard({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [session, setSession] = useState<SessionCredentials | null>(null);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCall() {
    setError(null);
    setStarting(true);
    try {
      setSession(await createAvatarSession());
    } catch (startError) {
      showCallError(
        startError instanceof Error
          ? startError
          : new Error("The call could not start."),
      );
    } finally {
      setStarting(false);
    }
  }

  function endCall(sessionId: string) {
    setSession((current) =>
      current?.sessionId === sessionId ? null : current,
    );
  }

  function showCallError(callError: Error) {
    console.error(callError);
    setError(
      "The call could not start. Check the local Runway setup and try again.",
    );
  }

  return (
    <>
      <aside
        id="nova-agent"
        data-avatar-target="nova-agent"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full overflow-hidden rounded-none border border-white/10 bg-[#101514] text-white shadow-[-24px_0_100px_rgba(4,8,7,0.3)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-[420px] sm:rounded-l-[1.75rem]",
          open
            ? "translate-x-0"
            : "pointer-events-none translate-x-full",
        )}
        aria-label="Una customer support agent"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-14 items-center gap-2.5 border-b border-white/10 px-4">
          <span className="size-2 rounded-full bg-[var(--accent)]" />
          <span className="text-sm font-semibold">Una</span>
          <span className="font-mono text-[0.61rem] uppercase tracking-[0.15em] text-white/45">
            Customer support
          </span>
          <button
            id="nova-widget-minimize"
            data-avatar-target="nova-widget-minimize"
            type="button"
            className="ml-auto grid size-8 place-items-center rounded-lg text-white/55 transition hover:bg-white/10 hover:text-white"
            aria-label="Minimize Una"
            aria-expanded={open}
            aria-controls="nova-agent"
            onClick={() => onOpenChange(false)}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="h-[calc(100dvh-3.5rem)] overflow-y-auto">
          {session ? (
            <AvatarCall
              key={session.sessionId}
              avatarId={NOVA_AVATAR_ID}
              credentials={session}
              video={false}
              className="h-full !aspect-auto rounded-none"
              onEnd={() => endCall(session.sessionId)}
              onError={(callError) => {
                showCallError(callError);
                endCall(session.sessionId);
              }}
            >
              <AvatarVideo className="!absolute inset-0" />
              <ScreenShareVideo className="!absolute bottom-32 left-4 aspect-video !h-auto !w-[55%] overflow-hidden rounded-lg" />
              <UserVideo className="!bottom-32" />
              <PageActions
                highlightDuration={3000}
                scrollBehavior="smooth"
                scrollBlock="center"
              />
              <ControlBar showCamera={true} showScreenShare />
              <ClientToolHandlers />
            </AvatarCall>
          ) : (
            <div className="flex min-h-full flex-col justify-center p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={NOVA_IMAGE}
                  alt="Una, Una Transport customer support"
                  width={72}
                  height={72}
                  className="size-[72px] rounded-2xl object-cover object-top"
                  preload
                />
                <div>
                  <p className="font-mono text-[0.61rem] uppercase tracking-[0.16em] text-white/42">
                    Runway Character
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em]">
                    How can I help?
                  </h2>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/38">
                  What Una can do
                </p>
                <p className="mt-2 text-xs leading-5 text-white/62">
                  Navigate and highlight the UI, show demo dashboard insights,
                  change revenue ranges, filter tickets, open panels, and
                  create or update tickets.
                </p>
              </div>
              <div className="mt-5">
                <Button
                  id="start-call"
                  data-avatar-target="start-call"
                  variant="accent"
                  className="w-full"
                  disabled={starting}
                  onClick={startCall}
                >
                  <Headphones className="size-4" />
                  {starting ? "Starting..." : "Start call"}
                </Button>
              </div>
              {error ? (
                <p
                  role="alert"
                  className="mt-3 text-center text-xs text-[#ff9b90]"
                >
                  {error}
                </p>
              ) : null}
              <p className="mt-3 text-center font-mono text-[0.55rem] uppercase tracking-[0.11em] text-white/30">
                Start · then use the screen button to share
              </p>
            </div>
          )}
        </div>
      </aside>

      <button
        id="nova-widget-open"
        data-avatar-target="nova-widget-open"
        type="button"
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2.5 rounded-full border border-white/10 bg-[#101514] px-4 text-white shadow-[0_18px_60px_rgba(4,8,7,0.34)] transition duration-300 ease-out motion-reduce:transition-none",
          open
            ? "pointer-events-none translate-y-2 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100",
        )}
        aria-label="Open Una"
        aria-expanded={open}
        aria-controls="nova-agent"
        onClick={() => onOpenChange(true)}
      >
        <span className="size-2 rounded-full bg-[var(--accent)]" />
        <span className="text-sm font-semibold">Una</span>
        <ChevronLeft className="size-4 text-white/55" />
      </button>
    </>
  );
}
