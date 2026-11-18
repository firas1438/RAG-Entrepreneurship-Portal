from retrieval_pipeline import predict,prepare_docs
from emebedding_model import load_embedding_model
from llm_model import invoke_gemini_model

def build_market_queries(data):

    return [
        f"""
        Market trends, demand and growth opportunities
        for {data.productDescription}.
        Sector: {data.sector}.
        Target market: {data.marketScope}.
        Customer segment: {data.customerType}.
        """,

        f"""
        Competitive landscape and competitor positioning
        in the {data.sector} sector.
        Known competitors: {data.competitorNames}.
        Competitive differentiation: {data.differentiation}.
        """,

        f"""
        Political, economic, social, technological,
        environmental and legal factors affecting
        {data.productDescription} in the
        {data.marketScope} market.
        """,

        f"""
        Business opportunities and potential customer
        segments for {data.productDescription}.
        Main objective: {data.mainObjective}.
        """
    ]

def build_llm_market_context(data,chunks) :

    return f"""

SYSTEM ROLE:

You are a senior business strategy consultant specializing
in market research, competitive intelligence and strategic
planning.

Your task is to evaluate the market potential of a business
project in a structured, evidence-based and actionable way.

PROJECT PROFILE:

- Product / Service: {data.productDescription}
- Sector: {data.sector}
- Target market: {data.marketScope}
- Customer segment: {data.customerType}
- Target age range: {data.ageRange}
- Competitors known by the founder: {data.knownCompetitors}
- Competitor information: {data.competitorNames}
- Differentiation strategy: {data.differentiation}
- Main objective: {data.mainObjective}

RESEARCH CONTEXT:
{chunks}

ANALYSIS REQUIREMENTS:

1. SWOT ANALYSIS

Identify:
- Strengths: Internal competitive advantages.
- Weaknesses: Internal limitations and constraints.
- Opportunities: External market opportunities.
- Threats: External risks and competitive pressures.

Clearly distinguish internal factors from external factors.

2. PESTEL ANALYSIS

Evaluate:
- Political factors
- Economic factors
- Social factors
- Technological factors
- Environmental factors
- Legal factors

Explain how each relevant factor could affect the project.

Do not invent regulations, statistics or market trends.

3. COMPETITIVE ANALYSIS

Analyze:
- Existing competitors.
- Their positioning, when supported by evidence.
- Potential competitive advantages.
- Market differentiation opportunities.

If competitor information is insufficient, indicate
the need for further research.

4. SMART OBJECTIVES

Based on the SWOT and PESTEL findings, propose
three to five strategic objectives.

Each objective must be:
- Specific
- Measurable
- Achievable
- Relevant
- Time-bound

Do not invent numerical targets without sufficient
business data. Clearly label proposed targets as
recommendations or assumptions.

5. STRATEGIC RECOMMENDATIONS

Provide practical recommendations aligned with
the founder's main objective.

EVIDENCE REQUIREMENTS:

- Support factual claims with the provided sources.
- Distinguish verified facts, assumptions and hypotheses.
- Include source titles and publication dates when available.
- Identify missing information and research limitations.

OUTPUT LANGUAGE: French.

OUTPUT FORMAT:
Return structured sections for SWOT, PESTEL,
competitive analysis, SMART objectives and recommendations.

"""

def predict_market_analysis(data):
    embedding_model=load_embedding_model()
    queries = build_market_queries(data)
    chunks = []
    for query in queries :
        elements = predict(query=query,embedding_model=embedding_model) 
        for element in elements : 
            chunks.append(element)
    docs = prepare_docs(chunks)
    context = build_llm_market_context(data,docs)
    return invoke_gemini_model(context)