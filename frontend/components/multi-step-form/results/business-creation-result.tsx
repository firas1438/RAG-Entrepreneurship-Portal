"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreationResultData } from "@/lib/mock-data/creation-mock";

interface BusinessCreationResultProps {
  data: CreationResultData;
  onReset: () => void;
}

export function BusinessCreationResult({ data, onReset }: BusinessCreationResultProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Business creation report
          </h1>
          <p className="text-sm text-zinc-500">
            Personalized legal structure recommendation and administrative roadmap.
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          className="w-fit rounded-xs border-zinc-300 text-sm font-medium hover:bg-zinc-100"
        >
          <RotateCcw className="mr-1.5 size-4" />
          New assessment
        </Button>
      </div>

        {/* Recommended Structure */}
        <div className="border border-zinc-200 border-l-4 border-l-primary bg-gradient-to-r from-red-50/30 via-white to-white p-6">
          <h2 className="text-base font-semibold text-primary">
            Recommended Legal Structure
          </h2>
          <p className="mt-2 text-sm font-semibold text-zinc-950">
            {data.recommendedStructure.name} ({data.recommendedStructure.abbr})
          </p>
          <p className="mt-1 text-sm text-zinc-700">
            {data.recommendedStructure.overview}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-zinc-200/60 pt-4 sm:grid-cols-3">
            <div>
              <span className="block text-sm text-muted-foreground">Minimum Capital</span>
              <span className="text-sm font-medium text-zinc-900">{data.recommendedStructure.capitalRequirement}</span>
            </div>
            <div>
              <span className="block text-sm text-muted-foreground">Liability</span>
              <span className="text-sm font-medium text-zinc-900">{data.recommendedStructure.liability}</span>
            </div>
            <div>
              <span className="block text-sm text-muted-foreground">Tax Regime</span>
              <span className="text-sm font-medium text-zinc-900">{data.recommendedStructure.taxRegime}</span>
            </div>
          </div>
        </div>

        {/* Why Suitable */}
        <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
          <h3 className="text-base font-semibold text-primary">
            Suitability Analysis
          </h3>
          <ul className="mt-3 space-y-2">
            {data.justification.whySuitable.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Administrative Steps */}
        <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-primary">
              Administrative Incorporation Steps
            </h3>
            <span className="text-sm text-muted-foreground">Timeline: {data.estimatedTimeline}</span>
          </div>

          <ol className="mt-4 divide-y divide-zinc-100">
            {data.administrativeSteps.map((step, idx) => (
              <li key={idx} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-semibold text-primary">{step.stepNumber}</span>
                  <span className="text-sm font-medium text-zinc-900">{step.title}</span>
                  <span className="text-sm text-muted-foreground">({step.authority})</span>
                </div>
                <p className="mt-1 text-sm text-zinc-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Required Documents */}
        <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
          <h3 className="text-base font-semibold text-primary">
            Required Documents Checklist
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {data.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-400" />
                <div>
                  <span className="font-medium text-zinc-900">{doc.name}</span>
                  <span className="text-muted-foreground"> — {doc.description}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-zinc-100 pt-4 text-sm text-muted-foreground">
            Estimated state registration fees: <strong className="font-medium text-zinc-900">{data.estimatedOfficialFees}</strong>.
          </div>
        </div>
      </div>
      );
}
