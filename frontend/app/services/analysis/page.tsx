"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { MultiStepForm } from "@/components/multi-step-form";
import { analysisSteps } from "@/components/multi-step-form/steps";
import { MarketAnalysisResult } from "@/components/multi-step-form/results";
import { submitMarketAnalysis } from "@/lib/api";
import type { MarketAnalysisResultData } from "@/lib/types";

export default function AnalysisServicePage() {
  const router = useRouter();
  const [result, setResult] = useState<MarketAnalysisResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: Record<string, any>) => {
    setError(null);
    try {
      const data = await submitMarketAnalysis(values);
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message ?? "An unexpected error occurred. Please try again.");
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
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
        {result ? (
          <MarketAnalysisResult data={result} onReset={handleReset} />
        ) : (
          <>
            {error && (
              <div className="mb-6 rounded-xs border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <MultiStepForm
              serviceTitle="Market Analysis"
              steps={analysisSteps}
              onSubmit={handleSubmit}
              onCancel={() => router.push("/services")}
              submitButtonText="Launch analysis"
            />
          </>
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
