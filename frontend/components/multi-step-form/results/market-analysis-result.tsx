"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MarketAnalysisResultData } from "@/lib/mock-data/analysis-mock";

interface MarketAnalysisResultProps {
  data: MarketAnalysisResultData;
  onReset: () => void;
}

export function MarketAnalysisResult({ data, onReset }: MarketAnalysisResultProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Market analysis report
          </h1>
          <p className="text-sm text-zinc-500">
            Sector analysis, commercial feasibility, and competitive benchmarking for {data.overview.marketScopeLabel.toLowerCase()} scope.
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          className="w-fit rounded-xs border-zinc-300 text-sm font-medium hover:bg-zinc-100"
        >
          <RotateCcw className="mr-1.5 size-4" />
          New analysis
        </Button>
      </div>

      {/* Key Market Metrics */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-gradient-to-r from-red-50/30 via-white to-white p-6">
        <h2 className="text-base font-semibold text-primary">
          Market Overview & Indicators
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {data.overview.summary}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-zinc-200/60 pt-4 sm:grid-cols-3">
          <div>
            <span className="block text-sm text-muted-foreground">Annual Growth Rate</span>
            <span className="text-sm font-semibold text-zinc-950">{data.overview.marketGrowthRate}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Market Maturity</span>
            <span className="text-sm font-semibold text-zinc-950">{data.overview.marketMaturity}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Digital Adoption</span>
            <span className="text-sm font-semibold text-zinc-950">{data.overview.digitalAdoptionIndex}</span>
          </div>
        </div>
      </div>

      {/* Target Customer */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-base font-semibold text-primary">
            Target Customer Persona
          </h3>
          <span className="text-sm text-muted-foreground">Age bracket: {data.targetCustomer.ageGroup}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-zinc-900">
          {data.targetCustomer.segmentTitle}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <span className="block text-sm font-medium text-zinc-900">Pain Points</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.targetCustomer.painPoints.map((p, idx) => (
                <li key={idx}>• {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="block text-sm font-medium text-zinc-900">Buying Behaviors</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.targetCustomer.buyingBehaviors.map((b, idx) => (
                <li key={idx}>• {b}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="block text-sm font-medium text-zinc-900">Channels</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.targetCustomer.channels.map((c, idx) => (
                <li key={idx}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Commercial & Financial Feasibility */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-base font-semibold text-primary">
            Commercial & Financial Feasibility
          </h3>
          <span className="text-sm font-semibold text-primary">
            {data.financialViability.viabilityScore} Score
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-zinc-900">
          {data.financialViability.verdict}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4 sm:grid-cols-4">
          <div>
            <span className="block text-sm text-muted-foreground">Est. Monthly Sales</span>
            <span className="text-sm font-semibold text-zinc-950">{data.financialViability.monthlyRevenueEstimate}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Break-Even Point</span>
            <span className="text-sm font-semibold text-zinc-950">{data.financialViability.breakEvenHorizon}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Est. Monthly OpEx</span>
            <span className="text-sm font-semibold text-zinc-950">{data.financialViability.estimatedMonthlyOpEx}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Gross Margin</span>
            <span className="text-sm font-semibold text-zinc-950">{data.financialViability.grossMarginRatio}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-zinc-100 pt-4">
          <span className="block text-sm font-medium text-zinc-900">Core Launch Requirements</span>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {data.financialViability.startupResources.map((res, idx) => (
              <span key={idx} className="rounded-xs border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700">
                {res}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Benchmark */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <h3 className="text-base font-semibold text-primary">
          Competitor Benchmark Matrix
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Competitor</th>
                <th className="py-2 pr-4 font-medium">Pricing</th>
                <th className="py-2 pr-4 font-medium">Core Strength</th>
                <th className="py-2 font-medium">Identified Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {data.competitorBenchmark.map((c, idx) => (
                <tr key={idx} className={c.competitor.includes("Your Venture") ? "font-medium text-primary" : "text-zinc-700"}>
                  <td className="py-2.5 pr-4">{c.competitor}</td>
                  <td className="py-2.5 pr-4 text-zinc-600">{c.pricePoint}</td>
                  <td className="py-2.5 pr-4 text-zinc-600">{c.strengths}</td>
                  <td className="py-2.5 text-zinc-600">{c.vulnerabilities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SWOT Summary */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <h3 className="text-base font-semibold text-primary">
          Strategic SWOT Matrix
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border border-zinc-100 bg-zinc-50/50 p-4">
            <span className="block text-sm font-medium text-zinc-900">Strengths</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.swot.strengths.map((s, idx) => (
                <li key={idx}>- {s}</li>
              ))}
            </ul>
          </div>
          <div className="border border-zinc-100 bg-zinc-50/50 p-4">
            <span className="block text-sm font-medium text-zinc-900">Weaknesses</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.swot.weaknesses.map((w, idx) => (
                <li key={idx}>- {w}</li>
              ))}
            </ul>
          </div>
          <div className="border border-zinc-100 bg-zinc-50/50 p-4">
            <span className="block text-sm font-medium text-zinc-900">Opportunities</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.swot.opportunities.map((o, idx) => (
                <li key={idx}>- {o}</li>
              ))}
            </ul>
          </div>
          <div className="border border-zinc-100 bg-zinc-50/50 p-4">
            <span className="block text-sm font-medium text-zinc-900">Threats</span>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {data.swot.threats.map((t, idx) => (
                <li key={idx}>- {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <h3 className="text-base font-semibold text-primary">
          Actionable Strategic Recommendations
        </h3>
        <ol className="mt-3 list-decimal list-inside space-y-1.5 text-sm text-zinc-700">
          {data.strategicRecommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
