"use client";

import * as React from "react";
import { cn } from "cn";
import { Label } from "@/components/ui/label";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  );
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field"
      className={cn("flex flex-col gap-3.5", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof Label> & { required?: boolean }) {
  return (
    <Label
      data-slot="field-label"
      className={cn("flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-zinc-900 leading-snug", className)}
      {...props}
    >
      <span>{children}</span>
      {required && (
        <span className="text-primary font-bold" title="Required">
          *
        </span>
      )}
    </Label>
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-xs leading-relaxed text-zinc-500", className)}
      {...props}
    />
  );
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) return null;
  return (
    <p
      data-slot="field-error"
      className={cn("text-xs font-medium text-primary", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
};
