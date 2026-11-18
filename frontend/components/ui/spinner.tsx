import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "cn";

export interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: number | string;
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2
      aria-label="Chargement..."
      className={cn("size-4 animate-spin text-current", className)}
      {...props}
    />
  );
}
