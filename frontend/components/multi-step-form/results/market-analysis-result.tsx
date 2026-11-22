"use client";

import { RotateCcw } from "lucide-react";
import {
  Pie,
  PieChart,
  Cell,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MarketAnalysisResultData } from "@/lib/types";

interface MarketAnalysisResultProps {
  data: MarketAnalysisResultData;
  onReset: () => void;
}

const pieConfig = {
  marketShare: {
    label: "Market Share (%)",
  },
} satisfies ChartConfig;

const regionalConfig = {
  share: {
    label: "Demand Share (%)",
    color: "#b42318",
  },
} satisfies ChartConfig;

const PESTEL_DIMENSIONS = [
  { code: "P", dimension: "Political", key: "political" as const },
  { code: "E", dimension: "Economic", key: "economic" as const },
  { code: "S", dimension: "Social", key: "social" as const },
  { code: "T", dimension: "Technological", key: "technological" as const },
  { code: "E", dimension: "Environmental", key: "environmental" as const },
  { code: "L", dimension: "Legal", key: "legal" as const },
] as const;

export function MarketAnalysisResult({ data, onReset }: MarketAnalysisResultProps) {
  const defaultColors = ["#b42318", "#27272a", "#52525b", "#71717a", "#a1a1aa"];

  // Defensive data normalization for unpredictable LLM responses
  const competitors = (data.competitors || []).map((c: any) => ({
    name: c.name || c.competitor || "Competitor",
    marketShare: typeof c.marketShare === "number" ? c.marketShare : Number(c.share ?? 0),
  }));

  const regionalDemand = (data.regionalDemand || []).map((r: any) => ({
    region: r.region || r.name || "Region",
    share: typeof r.share === "number" ? r.share : Number(r.demand ?? r.percentage ?? 0),
  }));

  const pestelList = Array.isArray(data.pestel)
    ? (data.pestel as any[]).map((item, idx) => ({
        code: item.code || PESTEL_DIMENSIONS[idx]?.code || "•",
        dimension: item.dimension || PESTEL_DIMENSIONS[idx]?.dimension || "Factor",
        factor: item.factor || item.description || String(item),
      }))
    : PESTEL_DIMENSIONS.map((d) => ({
        code: d.code,
        dimension: d.dimension,
        factor: (data.pestel as any)?.[d.key] || (data.pestel as any)?.[d.dimension.toLowerCase()] || "—",
      }));

  const swot = {
    strengths: data.swot?.strengths || [],
    weaknesses: data.swot?.weaknesses || [],
    opportunities: data.swot?.opportunities || [],
    threats: data.swot?.threats || [],
  };

  const recommendations = data.recommendations || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Market analysis report
          </h1>
          <p className="text-sm text-zinc-500">
            Sector dynamics, market distribution, PESTEL factors, SWOT matrix, and next steps.
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

      {/* Market & Feasibility Overview */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-gradient-to-r from-red-50/30 via-white to-white p-6">
        <h2 className="text-base font-semibold text-primary">
          Market &amp; Feasibility Overview
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          {data.summary}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-200/60 pt-4 sm:grid-cols-4">
          <div>
            <span className="block text-sm text-muted-foreground">Sector Growth</span>
            <span className="text-sm font-semibold text-zinc-950">{data.indicators.growthRate}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Customer Demand</span>
            <span className="text-sm font-semibold text-zinc-950">{data.indicators.demandLevel}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Starting Budget</span>
            <span className="text-sm font-semibold text-zinc-950">{data.indicators.targetBudget}</span>
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Break-Even Point</span>
            <span className="text-sm font-semibold text-zinc-950">{data.indicators.breakEvenTime}</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics: Competitor Share & Regional Demand (Side by Side) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Competitors & Market Share */}
        <div className="flex flex-col justify-between border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
          <div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold text-primary">
                Competitors &amp; Market Share
              </h3>
              <span className="text-sm text-muted-foreground">
                Distribution of established players in the target market
              </span>
            </div>

            <div className="mt-4 flex justify-center">
              <ChartContainer config={pieConfig} className="aspect-square h-44 w-full max-w-[200px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={competitors}
                    dataKey="marketShare"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {competitors.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={defaultColors[index % defaultColors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2.5 border-t border-zinc-100 pt-3 sm:grid-cols-2 lg:grid-cols-3">
            {competitors.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-1.5 text-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-xs"
                    style={{ backgroundColor: defaultColors[idx % defaultColors.length] }}
                  />
                  <span className="truncate text-zinc-800" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <span className="shrink-0 font-semibold text-zinc-900">{item.marketShare}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Customer Demand */}
        <div className="flex flex-col justify-between border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
          <div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold text-primary">
                Customer Demand by Region
              </h3>
              <span className="text-sm text-muted-foreground">
                Concentration of potential buyers across regions
              </span>
            </div>

            <div className="mt-6">
              <ChartContainer config={regionalConfig} className="aspect-auto h-56 w-full">
                <BarChart
                  data={regionalDemand}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 25, bottom: 0 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis
                    type="category"
                    dataKey="region"
                    tickLine={false}
                    axisLine={false}
                    width={130}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="share" fill="var(--color-share)" radius={[0, 3, 3, 0]} barSize={20} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>

      {/* PESTEL Analysis (Table Format) */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-base font-semibold text-primary">
            PESTEL Analysis
          </h3>
          <span className="text-sm text-muted-foreground">
            Analysis of 6 external forces (Political, Economic, Social, Tech, Environmental, Legal)
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-muted-foreground font-medium">
                <th className="py-2.5 pr-4 w-44">Dimension</th>
                <th className="py-2.5">Key Market Factor (Tunisia)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {pestelList.map((item, idx) => (
                <tr key={idx} className="transition-colors hover:bg-zinc-50/60">
                  <td className="py-3 pr-4 align-top">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-xs bg-zinc-900 font-mono text-sm font-semibold text-white">
                        {item.code}
                      </span>
                      <span className="font-medium text-zinc-900">{item.dimension}</span>
                    </div>
                  </td>
                  <td className="py-3 text-zinc-700 leading-relaxed align-top">
                    {item.factor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Strategic SWOT Matrix (2x2 Grid) */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-base font-semibold text-primary">
            SWOT Matrix
          </h3>
          <span className="text-sm text-muted-foreground">
            Internal strengths/weaknesses and external opportunities/threats
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 border border-zinc-200 sm:grid-cols-2">
          {/* Strengths (Forces) */}
          <div className="border-b border-zinc-200 bg-zinc-50/30 p-5 sm:border-r">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-xs bg-zinc-900 font-mono text-sm font-semibold text-white">
                  S
                </span>
                <span className="text-sm font-semibold text-zinc-950">Strengths (Forces)</span>
              </div>
              <span className="text-sm text-muted-foreground">Internal</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {swot.strengths.map((s, idx) => (
                <li key={idx}>- {s}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses (Faiblesses) */}
          <div className="border-b border-zinc-200 bg-zinc-50/30 p-5">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-xs bg-zinc-900 font-mono text-sm font-semibold text-white">
                  W
                </span>
                <span className="text-sm font-semibold text-zinc-950">Weaknesses (Faiblesses)</span>
              </div>
              <span className="text-sm text-muted-foreground">Internal</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {swot.weaknesses.map((w, idx) => (
                <li key={idx}>- {w}</li>
              ))}
            </ul>
          </div>

          {/* Opportunities (Opportunités) */}
          <div className="border-b border-zinc-200 bg-zinc-50/30 p-5 sm:border-b-0 sm:border-r">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-xs bg-zinc-900 font-mono text-sm font-semibold text-white">
                  O
                </span>
                <span className="text-sm font-semibold text-zinc-950">Opportunities (Opportunités)</span>
              </div>
              <span className="text-sm text-muted-foreground">External</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {swot.opportunities.map((o, idx) => (
                <li key={idx}>- {o}</li>
              ))}
            </ul>
          </div>

          {/* Threats (Menaces) */}
          <div className="bg-zinc-50/30 p-5">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-xs bg-zinc-900 font-mono text-sm font-semibold text-white">
                  T
                </span>
                <span className="text-sm font-semibold text-zinc-950">Threats (Menaces)</span>
              </div>
              <span className="text-sm text-muted-foreground">External</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {swot.threats.map((t, idx) => (
                <li key={idx}>- {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Practical Recommendations */}
      <div className="border border-zinc-200 border-l-4 border-l-primary bg-white p-6">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-base font-semibold text-primary">
            Practical Next Steps
          </h3>
          <span className="text-sm text-muted-foreground">
            Actionable launch guidance based on this evaluation
          </span>
        </div>
        <ol className="mt-3 list-decimal list-inside space-y-1.5 text-sm text-zinc-700">
          {recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
