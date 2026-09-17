import * as React from "react";

import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_18px_50px_rgba(21,26,25,0.05)]",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";
