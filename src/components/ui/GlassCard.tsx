import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
  strong?: boolean;
}

export function GlassCard({ children, className, strong = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-panel-strong" : "glass-panel",
        "rounded-[28px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
