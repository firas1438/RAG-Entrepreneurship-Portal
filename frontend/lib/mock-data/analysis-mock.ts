export interface MarketAnalysisResultData {
  overview: {
    sectorTitle: string;
    marketScopeLabel: string;
    summary: string;
    marketGrowthRate: string;
    marketMaturity: string;
    digitalAdoptionIndex: string;
  };
  targetCustomer: {
    segmentTitle: string;
    ageGroup: string;
    painPoints: string[];
    buyingBehaviors: string[];
    channels: string[];
  };
  financialViability: {
    viabilityScore: string;
    verdict: string;
    monthlyRevenueEstimate: string;
    breakEvenHorizon: string;
    estimatedMonthlyOpEx: string;
    grossMarginRatio: string;
    distributionChannel: string;
    startupResources: string[];
  };
  competitorBenchmark: Array<{
    competitor: string;
    type: string;
    pricePoint: string;
    strengths: string;
    vulnerabilities: string;
  }>;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  smartObjectives: Array<{
    title: string;
    timeframe: string;
    metric: string;
    description: string;
  }>;
  strategicRecommendations: string[];
}

export function getMockMarketAnalysisResult(values: Record<string, any>): MarketAnalysisResultData {
  const product = values.productDescription || "Your product/service";
  const sector = values.sector || "general";
  const scope = values.marketScope || "national";
  const customerType = values.customerType || "particuliers";
  const channel = values.salesChannel || "site-web";
  const budget = values.initialBudget || "20k-50k";
  const startupNeeds: string[] = Array.isArray(values.startupNeeds) ? values.startupNeeds : [];
  const salesEstimateRaw = values.monthlySalesEstimate;

  const scopeLabel =
    scope === "local"
      ? "Local (City-level)"
      : scope === "regional"
      ? "Regional (Hub & Coastal zones)"
      : scope === "national"
      ? "National (Across Tunisia)"
      : "International / Export";

  const customerLabel =
    customerType === "particuliers"
      ? "Consumers (B2C)"
      : customerType === "entreprises"
      ? "Corporate & B2B Enterprises"
      : customerType === "administrations"
      ? "Public Administrations & Institutions (B2G)"
      : customerType === "etudiants"
      ? "Students & Young Professionals"
      : "Diversified Segments";

  const channelLabel =
    channel === "site-web"
      ? "E-Commerce / Digital Platform"
      : channel === "magasin"
      ? "Commercial Storefront / Physical Premises"
      : channel === "reseaux-sociaux"
      ? "Social Commerce & Direct Messaging"
      : channel === "vente-directe"
      ? "Direct Sales & Field Representation"
      : channel === "distributeurs"
      ? "Third-Party Distribution & Wholesalers"
      : "Omnichannel (Online & Offline)";

  // Financial calculations
  let monthlySalesNumber = 12500;
  if (values.hasSalesEstimate === "oui" && salesEstimateRaw && !isNaN(Number(salesEstimateRaw))) {
    monthlySalesNumber = Math.max(1000, Number(salesEstimateRaw));
  } else {
    if (budget === "moins-5k") monthlySalesNumber = 4200;
    else if (budget === "5k-20k") monthlySalesNumber = 9500;
    else if (budget === "20k-50k") monthlySalesNumber = 18000;
    else if (budget === "50k-100k") monthlySalesNumber = 35000;
    else if (budget === "plus-100k") monthlySalesNumber = 75000;
  }

  const opexNumber = Math.round(monthlySalesNumber * 0.62);
  let breakEvenText = "Month 5 to 6";
  if (budget === "moins-5k" || budget === "5k-20k") {
    breakEvenText = "Month 3 to 4";
  } else if (budget === "plus-100k") {
    breakEvenText = "Month 8 to 10";
  }

  const resourceLabels: string[] = [];
  if (startupNeeds.includes("local")) resourceLabels.push("Commercial premises / Office lease");
  if (startupNeeds.includes("equipements")) resourceLabels.push("Production equipment & machinery");
  if (startupNeeds.includes("matieres-premieres")) resourceLabels.push("Inventory & raw materials buffer");
  if (startupNeeds.includes("personnel")) resourceLabels.push("Operational staff & sales team");
  if (startupNeeds.includes("site-web")) resourceLabels.push("Digital platform & payment gateway");
  if (startupNeeds.includes("vehicules")) resourceLabels.push("Logistics & delivery vehicles");
  if (resourceLabels.length === 0) {
    resourceLabels.push("Digital presence & cloud tooling", "Initial working capital reserve (BFR)");
  }

  return {
    overview: {
      sectorTitle: sector.charAt(0).toUpperCase() + sector.slice(1),
      marketScopeLabel: scopeLabel,
      summary: `Comprehensive market analysis and commercial viability assessment for '${product}' targeting ${customerLabel} across ${scopeLabel}. Market indicators point to favorable expansion dynamics, with strong digital discovery and demand for modern alternatives.`,
      marketGrowthRate: "+8.4% Annual Sector CAGR",
      marketMaturity: "Developing with high digital penetration",
      digitalAdoptionIndex: "74% Mobile engagement",
    },
    targetCustomer: {
      segmentTitle: customerLabel,
      ageGroup: values.ageRange ? values.ageRange.replace("-", "–") + " years" : "26–40 years",
      painPoints: [
        "Inconsistent quality and delayed customer fulfillment from traditional providers.",
        "Lack of transparent pricing and accessible digital tracking.",
        "Limited customer service responsiveness after initial purchase.",
      ],
      buyingBehaviors: [
        "Prefers mobile-first discovery (social media, search, and direct recommendations).",
        "Sensitive to perceived value-to-price ratio rather than lowest price alone.",
        "High loyalty when delivery reliability and responsiveness are consistently proven.",
      ],
      channels: [
        channelLabel,
        "Targeted Social Media campaigns (Instagram, Facebook & LinkedIn for B2B)",
        "Referral incentives and localized word-of-mouth partnerships",
      ],
    },
    financialViability: {
      viabilityScore: "84%",
      verdict: "High Commercial & Financial Viability",
      monthlyRevenueEstimate: `${monthlySalesNumber.toLocaleString("fr-TN")} TND`,
      breakEvenHorizon: breakEvenText,
      estimatedMonthlyOpEx: `${opexNumber.toLocaleString("fr-TN")} TND`,
      grossMarginRatio: "38%",
      distributionChannel: channelLabel,
      startupResources: resourceLabels,
    },
    competitorBenchmark: [
      {
        competitor: values.competitorNames ? values.competitorNames.split(",")[0] || "Incumbent A" : "Established Market Leader",
        type: "Direct Competitor",
        pricePoint: "Premium / Mid-High",
        strengths: "Long-standing brand recognition, broad physical distribution.",
        vulnerabilities: "Slow digital response, inflexible customer support.",
      },
      {
        competitor: "Local Regional Providers",
        type: "Indirect Competitor",
        pricePoint: "Discount / Budget",
        strengths: "Close physical proximity, low acquisition barrier.",
        vulnerabilities: "Inconsistent standard of quality, absence of digital ordering.",
      },
      {
        competitor: "Foundry Client Project (Proposed)",
        type: "New Market Challenger",
        pricePoint: values.differentiation === "prix" ? "Competitive Value" : "Balanced / Superior Quality",
        strengths: `Differentiated via ${values.differentiation || "quality & proximity"}, modern brand, agility.`,
        vulnerabilities: "Need to build initial brand trust and early market share.",
      },
    ],
    swot: {
      strengths: [
        `Clear value proposition centered on ${values.differentiation || "quality and responsiveness"}.`,
        "Lean operational cost structure allowing competitive pricing.",
        "Agile decision-making without corporate legacy overhead.",
        "Targeted messaging directly customized for Tunisian consumer expectations.",
      ],
      weaknesses: [
        "Zero initial baseline brand recognition among target buyers.",
        "Initial resource constraints before reaching operational break-even.",
        "Dependence on third-party payment/logistics partners for delivery.",
      ],
      opportunities: [
        "Accelerating shift toward domestic digital commerce across Tunisia.",
        "Untapped market share in secondary cities outside Greater Tunis (Sousse, Sfax, Nabeul).",
        "Potential institutional grant backing and microfinance incentive programs.",
        "Forming exclusive supplier agreements to guarantee product quality.",
      ],
      threats: [
        "Evolving inflation impacting consumer disposable income.",
        "Potential reactive pricing discounts from entrenched competitors.",
        "Regulatory licensing delays or logistics cost fluctuations.",
      ],
    },
    smartObjectives: [
      {
        title: "Pilot Customer Acquisition",
        timeframe: "Months 1 – 3",
        metric: "100 Active Verified Customers / Orders",
        description:
          "Launch soft beta to secure early adopters, validate satisfaction metrics, and collect testimonials.",
      },
      {
        title: "Market Share Penetration",
        timeframe: "Months 4 – 6",
        metric: "25% Month-over-Month Growth",
        description:
          "Expand paid acquisition and localized referral loops in core governorates.",
      },
      {
        title: "Commercial Retention Milestone",
        timeframe: "Months 7 – 12",
        metric: "35%+ Repeat Purchase / Renewal Rate",
        description:
          "Implement dedicated retention workflows, loyalty rewards, and customer follow-up protocols.",
      },
    ],
    strategicRecommendations: [
      "Prioritize customer experience and response speed: in competitive sectors, immediate responsiveness wins market share from established legacy firms.",
      "Leverage transparent, upfront pricing with no hidden fees to build immediate trust in the Tunisian market.",
      "Focus marketing spend strictly on high-intent channels before investing in broad mass awareness campaigns.",
      "Collect and showcase real customer case studies and social proof from your first 30 days of operations.",
    ],
  };
}
