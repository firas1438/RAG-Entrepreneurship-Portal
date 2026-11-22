"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreationResultData } from "@/lib/types";

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
      <div className="border border-zinc-200 border-l-5 border-l-primary bg-gradient-to-r from-red-50/30 via-white to-white p-6">
        <h2 className="text-base font-semibold text-primary">
          Recommended Legal Structure
        </h2>
        <p className="mt-3 text-sm font-semibold text-zinc-950">
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
      <div className="border border-zinc-200 border-l-5 border-l-primary bg-white p-6">
        <h3 className="text-base font-semibold text-primary">
          Suitability Analysis
        </h3>
        <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {data.justification.whySuitable.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Administrative Steps */}
      <div className="border border-zinc-200 border-l-5 border-l-primary bg-white p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-base font-semibold text-primary">
            Administrative Steps
          </h3>
        </div>

        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-muted-foreground font-medium">
                <th className="py-2.5 pr-4 w-12">Step</th>
                <th className="py-2.5 pr-4">Instruction(s)</th>
                <th className="py-2.5 pr-4">Authority</th>
                <th className="py-2.5 whitespace-nowrap">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {data.administrativeSteps.map((step, idx) => (
                <tr key={idx} className="transition-colors hover:bg-zinc-50/60">
                  <td className="py-3.5 pr-4 font-mono font-medium text-muted-foreground align-top">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3.5 pr-4 align-top">
                    <span className="font-medium text-zinc-900 block">{step.title}</span>
                    <span className="text-zinc-600 block mt-1 leading-relaxed">{step.description}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-zinc-700 align-top">
                    {step.authority}
                  </td>
                  <td className="py-3.5 text-zinc-700 whitespace-nowrap align-top">
                    {step.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Required Documents */}
      <div className="border border-zinc-200 border-l-5 border-l-primary bg-white p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-base font-semibold text-primary">
            Required Documents
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.requiredDocuments.map((doc, idx) => (
            <div
              key={idx}
              className="border border-zinc-200/80 bg-zinc-50/40 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-zinc-950">
                  {doc.name}
                </span>
                <span
                  className={`shrink-0 text-sm font-medium ${doc.status === "mandatory"
                    ? "text-primary"
                    : "text-muted-foreground"
                    }`}
                >
                  {doc.status === "mandatory" ? "Mandatory" : "Conditional"}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {doc.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
