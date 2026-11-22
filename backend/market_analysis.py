from retrieval_pipeline import predict, prepare_docs
from emebedding_model import load_embedding_model
from llm_model import invoke_local_llm, clean_and_parse_json

def build_market_queries(data):
    startup_needs_str = ", ".join(data.startupNeeds) if data.startupNeeds else "None specified"
    sales_estimate_str = f"{data.monthlySalesEstimate} TND" if data.monthlySalesEstimate else "Not estimated"

    return [
        f"""
        Market trends, customer demand and economic growth opportunities
        for {data.productDescription} in Tunisia.
        Sector: {data.sector}.
        Target market: {data.marketScope}.
        Customer segment: {data.customerType}.
        """,

        f"""
        Competitive landscape and competitor market shares in Tunisia
        in the {data.sector} sector.
        Known competitors: {data.competitorNames or 'None listed'}.
        Differentiation strategy: {data.differentiation}.
        """,

        f"""
        PESTEL factors (Political, Economic, Social, Technological, Environmental, Legal)
        affecting businesses in Tunisia in the {data.sector} sector.
        """,

        f"""
        Financial viability, startup budget requirements and distribution channels
        for {data.productDescription}.
        Budget: {data.initialBudget} TND.
        Sales channel: {data.salesChannel}.
        Startup needs: {startup_needs_str}.
        Monthly sales estimate: {sales_estimate_str}.
        Main objective: {data.mainObjective}.
        """
    ]

def build_llm_market_context(data, chunks):
    startup_needs_str = ", ".join(data.startupNeeds) if data.startupNeeds else "None specified"
    sales_estimate_str = f"{data.monthlySalesEstimate} TND" if data.monthlySalesEstimate else "Not estimated"

    return f"""
SYSTEM ROLE:
You are an expert Tunisian market analysis and commercial feasibility consultant.
Your mission is to analyze the market opportunity and feasibility for a new business in Tunisia based on the client's profile and verified official knowledge.

CLIENT PROFILE:
- Product / Service: {data.productDescription}
- Industry sector: {data.sector}
- Target market scope: {data.marketScope}
- Target customer segment: {data.customerType}
- Target age range: {data.ageRange}
- Known competitors: {data.knownCompetitors} ({data.competitorNames or 'None specified'})
- Planned differentiation: {data.differentiation}
- Planned sales channel: {data.salesChannel}
- Estimated initial budget: {data.initialBudget}
- Startup resource needs: {startup_needs_str}
- Has monthly sales estimate: {data.hasSalesEstimate} ({sales_estimate_str})
- Primary objective: {data.mainObjective}

RETRIEVED RESEARCH CONTEXT:
{chunks}

CRITICAL INSTRUCTIONS:
1. Output ONLY a raw JSON object. No other text before or after it.
2. The very first character of your response MUST be {{ and the very last character MUST be }}.
3. Do NOT use backticks, triple backticks, or any markdown (no \`\`\`, no \`\`\`json).
4. Do NOT write any preamble, greeting, or intro (e.g. do NOT say "Okay", "Sure", "Here is", "Of course", etc.).
5. Do NOT add any trailing notes, comments, or explanations after the closing brackets in the end.
6. Output strictly valid JSON: every string must be properly quoted and escaped, all commas and colons must be correct.
7. For 'competitors': include 3 to 4 existing market players (use the user's competitors if provided, otherwise established Tunisian sector players, plus 'Regional Providers' or 'Other Small Players'). All 'marketShare' values must be integers and SUM TO EXACTLY 100%. Do NOT include the user's new business in this list.
8. For 'regionalDemand': provide customer demand percentages across 5 Tunisian regions: 'Greater Tunis', 'Coastal Hubs (Sahel)', 'Sfax Region', 'North (Bizerte/Nabeul)', 'Central & South'. All 'share' values must be integers and SUM TO EXACTLY 100%.
9. For 'pestel': provide one concise, high-value sentence for each of the 6 dimensions relevant to Tunisia.
10. For 'swot': provide 3 to 4 concise bullet points for each quadrant.
11. For 'recommendations': provide 3 practical, actionable launch steps tailored for a first-time founder in Tunisia.

EXACT JSON SCHEMA TO RETURN:
{{
  "summary": "Concise 2-3 sentence overview assessing sector dynamics, customer demand, and financial feasibility in Tunisia.",
  "indicators": {{
    "growthRate": "+8.4% / year",
    "demandLevel": "Strong & Growing",
    "targetBudget": "20,000 - 50,000 TND",
    "breakEvenTime": "5 to 6 months"
  }},
  "competitors": [
    {{ "name": "Market Leader Name", "marketShare": 45 }},
    {{ "name": "Regional Providers", "marketShare": 32 }},
    {{ "name": "Other Small Players", "marketShare": 23 }}
  ],
  "regionalDemand": [
    {{ "region": "Greater Tunis", "share": 38 }},
    {{ "region": "Coastal Hubs (Sahel)", "share": 26 }},
    {{ "region": "Sfax Region", "share": 18 }},
    {{ "region": "North (Bizerte/Nabeul)", "share": 11 }},
    {{ "region": "Central & South", "share": 7 }}
  ],
  "pestel": {{
    "political": "Specific Tunisian governmental policies or startup incentives affecting this activity.",
    "economic": "Consumer purchasing power and inflation impact in the Tunisian market.",
    "social": "Local consumer behaviors and demographic trends in Tunisia.",
    "technological": "Digital adoption and payment methods (e.g. Flouci, D17, Konnect) relevant to this sector.",
    "environmental": "Eco-friendly practices, waste, or sustainable sourcing considerations in Tunisia.",
    "legal": "Regulatory registration requirements (RNE, tax obligations, permits) in Tunisia."
  }},
  "swot": {{
    "strengths": ["Internal advantage 1", "Internal advantage 2", "Internal advantage 3"],
    "weaknesses": ["Internal limitation 1", "Internal limitation 2", "Internal limitation 3"],
    "opportunities": ["External market opportunity 1", "External market opportunity 2", "External market opportunity 3"],
    "threats": ["External market threat 1", "External market threat 2", "External market threat 3"]
  }},
  "recommendations": [
    "Practical launch recommendation 1",
    "Practical launch recommendation 2",
    "Practical launch recommendation 3"
  ]
}}
"""

def predict_market_analysis(data):
    embedding_model = load_embedding_model()
    queries = build_market_queries(data)
    chunks = []
    for query in queries:
        elements = predict(query=query, embedding_model=embedding_model)
        for element in elements:
            chunks.append(element)
    docs = prepare_docs(chunks)
    context = build_llm_market_context(data, docs)
    raw_output = invoke_local_llm(context)
    return clean_and_parse_json(raw_output)