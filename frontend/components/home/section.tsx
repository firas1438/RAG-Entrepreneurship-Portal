import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HomeSection({
  id,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("border-b border-zinc-200", className)}
      aria-labelledby={labelledBy}
    >
      <div className="mx-auto max-w-7xl py-16">{children}</div>
    </section>
  );
}
