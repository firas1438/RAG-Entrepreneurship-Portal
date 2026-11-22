import type { CreationResultData, MarketAnalysisResultData } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function submitBusinessCreation(
  values: Record<string, any>
): Promise<CreationResultData> {
  const payload = {
    activityType: values.activityType,
    activityDescription: values.activityDescription,
    location: values.location,
    founderCount: values.founderCount,
    role: values.role,
    existingBusiness: values.existingBusiness,
    budget: values.budget,
    patrimonialProtection: values.patrimonialProtection,
    requiresAuthorization: values.requiresAuthorization,
    additionalInfo: values.additionalInfo ?? null,
  };

  const res = await fetch(`${API_BASE}/business-creation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Business creation API error (${res.status}): ${detail}`);
  }

  return res.json();
}

export async function submitMarketAnalysis(
  values: Record<string, any>
): Promise<MarketAnalysisResultData> {
  const payload = {
    productDescription: values.productDescription,
    sector: values.sector,
    marketScope: values.marketScope,
    customerType: values.customerType,
    ageRange: values.ageRange,
    knownCompetitors: values.knownCompetitors,
    competitorNames: values.competitorNames ?? null,
    differentiation: values.differentiation,
    salesChannel: values.salesChannel,
    initialBudget: values.initialBudget,
    startupNeeds: values.startupNeeds ?? [],
    hasSalesEstimate: values.hasSalesEstimate,
    monthlySalesEstimate: values.monthlySalesEstimate ?? null,
    mainObjective: values.mainObjective,
  };

  const res = await fetch(`${API_BASE}/market-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Market analysis API error (${res.status}): ${detail}`);
  }

  return res.json();
}
