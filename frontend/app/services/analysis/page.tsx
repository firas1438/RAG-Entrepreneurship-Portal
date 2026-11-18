"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MultiStepForm } from "@/components/multi-step-form";
import { analysisSteps } from "@/components/multi-step-form/steps";

export default function AnalysisServicePage() {
  const router = useRouter();
  const [submittedValues, setSubmittedValues] = useState<Record<string, any> | null>(null);

  const handleSubmit = async (values: Record<string, any>) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedValues(values);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSubmittedValues(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3 text-zinc-400" />
        <Link href="/services" className="hover:text-primary transition-colors">
          Services
        </Link>
        <ChevronRight className="size-3 text-zinc-400" />
        <span className="font-medium text-zinc-900">Market Analysis</span>
      </nav>

      <div className="mt-6">
        {submittedValues ? (
          <div className="border border-zinc-200 bg-white p-6 sm:p-10">
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex size-14 items-center justify-center border border-zinc-200 bg-zinc-50">
                <Clock className="size-6 text-zinc-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
                  Analysis being prepared
                </h1>
                <p className="mt-2 max-w-md text-sm text-zinc-500">
                  Your answers have been submitted. The personalized market analysis
                  will appear here once processing is complete.
                </p>
              </div>

              <div className="mt-4 w-full max-w-sm border border-dashed border-zinc-300 bg-zinc-50 px-6 py-4 text-left text-xs text-zinc-500">
                <p className="mb-2 font-semibold uppercase tracking-wide text-zinc-400">
                  Collected answers
                </p>
                <ul className="space-y-1">
                  {Object.entries(submittedValues).map(([key, value]) => (
                    <li key={key} className="flex gap-2">
                      <span className="font-medium text-zinc-700">{key}:</span>
                      <span>{String(value) || "—"}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="mt-2 rounded-xs border-zinc-300 px-5 text-sm font-medium hover:bg-zinc-100"
              >
                <RotateCcw className="mr-2 size-4" />
                New analysis
              </Button>
            </div>
          </div>
        ) : (
          <MultiStepForm
            serviceTitle="Market Analysis"
            steps={analysisSteps}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/services")}
            submitButtonText="Launch analysis"
          />
        )}
      </div>

      <div className="mt-10 flex items-start gap-3 border border-zinc-200 bg-zinc-50 p-5 text-xs text-zinc-600">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-zinc-900">Guidance service:</strong>{" "}
          The information collected is used solely to generate a personalized market analysis
          for informational purposes.
        </p>
      </div>
    </div>
  );
}
