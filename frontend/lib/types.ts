export interface CreationResultData {
  recommendedStructure: {
    name: string;
    abbr: string;
    badge: string;
    overview: string;
    capitalRequirement: string;
    liability: string;
    taxRegime: string;
  };
  alternativeStructures: Array<{
    name: string;
    abbr: string;
    reason: string;
  }>;
  justification: {
    whySuitable: string[];
    advantages: string[];
    limitations: string[];
  };
  administrativeSteps: Array<{
    stepNumber: string;
    title: string;
    authority: string;
    description: string;
    duration: string;
  }>;
  requiredDocuments: Array<{
    name: string;
    description: string;
    status: "mandatory" | "conditional";
  }>;
  estimatedTimeline: string;
  estimatedOfficialFees: string;
}

export interface MarketAnalysisResultData {
  summary: string;
  indicators: {
    growthRate: string;
    demandLevel: string;
    targetBudget: string;
    breakEvenTime: string;
  };
  competitors: Array<{
    name: string;
    marketShare: number;
  }>;
  regionalDemand: Array<{
    region: string;
    share: number;
  }>;
  pestel: {
    political: string;
    economic: string;
    social: string;
    technological: string;
    environmental: string;
    legal: string;
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendations: string[];
}
