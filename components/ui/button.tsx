import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[background,color,border-color,transform,box-shadow] duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--ink)] text-[var(--paper)] shadow-[0_10px_30px_rgba(10,14,14,0.16)] hover:bg-[var(--ink-soft)]",
        accent:
          "bg-[var(--accent)] text-[#11170f] shadow-[0_10px_30px_rgba(171,229,55,0.24)] hover:bg-[var(--accent-strong)]",
        outline:
          "border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--surface-raised)]",
        ghost:
          "text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        icon: "size-10 shrink-0 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };
