export function ChartSkeleton() {
  return (
    <div className="absolute inset-7 animate-pulse rounded-2xl bg-[linear-gradient(180deg,var(--surface-raised),transparent)]">
      <svg viewBox="0 0 600 240" className="h-full w-full opacity-60" aria-hidden="true">
        <path
          d="M0 190 C60 170 90 182 145 128 S235 74 290 116 390 182 445 120 525 42 600 70"
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
