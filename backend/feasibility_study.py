from retrieval_pipeline import predict,prepare_docs
from emebedding_model import load_embedding_model
from llm_model import invoke_gemini_model

def build_feasibility_queries(data):

    return [
        f"""
        Resources, equipment, premises, raw materials
        and personnel required to operate:
        {data.businessIdea}.
        Products and services: {data.productsServices}.
        Startup needs: {', '.join(data.startupNeeds)}.
        """,

        f"""
        Startup costs, operating expenses and funding
        requirements for {data.businessIdea}.
        Initial budget: {data.initialBudget}.
        Funding source: {data.fundingSource}.
        """,

        f"""
        Operational requirements for a business
        located in {data.activityLocation}.
        Team size: {data.teamSize}.
        Sales channel: {data.salesChannel}.
        """,

        f"""
        Revenue assumptions and commercial viability
        for {data.businessIdea}.
        Estimated monthly sales: {data.monthlySalesEstimate} TND.
        Products and services: {data.productsServices}.
        """,

        f"""
        Potential operational, financial and commercial
        risks for {data.businessIdea}.
        Anticipated challenges: {data.anticipatedChallenges}.
        Additional information: {data.additionalInfo}.
        """
    ]

def build_llm_feasability_context(data,chunks) :

    return f"""


SYSTEM ROLE:

You are a business feasibility consultant specializing
in financial planning, operational assessment and
business risk analysis.

Your mission is to evaluate the feasibility of the
entrepreneur's project using the provided information
and supporting research.

PROJECT PROFILE:

- Business idea: {data.businessIdea}
- Products and services: {data.productsServices}
- Activity location: {data.activityLocation}
- Initial resources: {data.startupNeeds}
- Team size: {data.teamSize}
- Initial budget: {data.initialBudget} TND
- Funding source: {data.fundingSource}
- Sales channel: {data.salesChannel}
- Sales estimate available: {data.hasSalesEstimate}
- Estimated monthly revenue: {data.monthlySalesEstimate} TND
- Anticipated challenges: {data.anticipatedChallenges}
- Additional information: {data.additionalInfo}

RESEARCH CONTEXT:
{chunks}

ANALYSIS REQUIREMENTS:

1. OPERATIONAL FEASIBILITY
Evaluate the premises, equipment, materials, staff
and operational requirements.

2. FINANCIAL FEASIBILITY
Analyze the initial budget and funding assumptions.
Identify missing cost information.
Evaluate whether the estimated revenue is sufficient
to support the proposed business model.

3. COMMERCIAL FEASIBILITY
Assess the sales channels, target customers and
commercial assumptions.

4. RISK ANALYSIS
Identify financial, operational, commercial and
external risks.
Assess their potential impact and suggest mitigation
measures.

5. RECOMMENDATIONS
Provide concrete actions to improve project viability.
Identify the most important assumptions to validate
before launching the business.

IMPORTANT RULES:

- Do not invent prices, expenses or market statistics.
- Distinguish user-provided estimates from verified data.
- Do not claim that a project is profitable without
  sufficient financial information.
- Explicitly identify missing data.
- Use calculations only when the necessary inputs
  are available.
- Explain all assumptions used in calculations.

OUTPUT LANGUAGE: French.

OUTPUT FORMAT:
- Executive summary
- Operational feasibility
- Financial feasibility
- Commercial feasibility
- Risk assessment
- Missing information
- Recommendations
- Overall assessment with justification

"""

def predict_feasability_creation(data):
    embedding_model=load_embedding_model()
    queries = build_feasibility_queries(data)
    chunks = []
    for query in queries :
        elements = predict(query=query,embedding_model=embedding_model) 
        for element in elements : 
            chunks.append(element)
    docs = prepare_docs(chunks)
    context = build_llm_feasability_context(data,docs)
    return invoke_gemini_model(context)