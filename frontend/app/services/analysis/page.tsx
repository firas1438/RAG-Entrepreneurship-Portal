"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { MultiStepForm } from "@/components/multi-step-form";
import { analysisSteps } from "@/components/multi-step-form/steps";
import { MarketAnalysisResult } from "@/components/multi-step-form/results";
import { getMockMarketAnalysisResult } from "@/lib/mock-data/analysis-mock";

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
          <MarketAnalysisResult
            data={getMockMarketAnalysisResult(submittedValues)}
            onReset={handleReset}
          />
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
