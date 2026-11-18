from retrieval_pipeline import predict,prepare_docs
from emebedding_model import load_embedding_model
from llm_model import invoke_gemini_model


def build_creation_queries(data):

    queries = [
        f"""
        Conditions et démarches administratives pour créer
        une entreprise dans le secteur {data.activityType}.
        Activité : {data.activityDescription}.
        """,

        f"""
        Comparaison des formes juridiques tunisiennes selon
        le nombre de fondateurs : {data.founderCount}.
        Protection du patrimoine personnel :
        {data.patrimonialProtection}.
        Rôle du fondateur : {data.role}.
        """,

        f"""
        Conditions de capital social et frais de constitution
        d'une entreprise en Tunisie.
        Budget initial : {data.budget}.
        """,

        f"""
        Organismes compétents et formalités de création
        d'entreprise à {data.location}, Tunisie.
        """,

        f"""
        Autorisations et licences administratives nécessaires
        pour l'activité suivante :
        {data.activityDescription}.
        Réponse du client concernant les autorisations :
        {data.requiresAuthorization}.
        """
    ]

    return queries

def build_llm_creation_context(data,chunks) :
    return f"""

SYSTEM ROLE:
You are a Tunisian business creation and administrative
procedures assistant.

Your mission is to guide entrepreneurs through the legal
and administrative process of establishing a business
in Tunisia.

You must provide reliable, contextualized and source-based
recommendations.

CLIENT PROFILE:
- Activity type: {data.activityType}
- Activity description: {data.activityDescription}
- Location: {data.location}
- Number of founders: {data.founderCount}
- User role: {data.role}
- Existing business: {data.existingBusiness}
- Initial budget: {data.budget} TND
- Asset protection importance: {data.patrimonialProtection}
- Authorization declared by user: {data.requiresAuthorization}
- Additional information: {data.additionalInfo}

RETRIEVED OFFICIAL DOCUMENTS:
{chunks}

INSTRUCTIONS:

1. Analyze the user's business profile.
2. Identify the legal structures that may be suitable.
3. Compare the relevant legal structures using the
   retrieved documents.
4. Recommend the most suitable option, explaining
   its advantages, limitations and conditions.
5. Explain the administrative creation process step by step.
6. Identify applicable tax, social and registration obligations
   only when supported by the retrieved sources.
7. Identify activity-specific authorizations and permits.
8. Take the user's location into account when relevant.
9. Distinguish confirmed requirements from points requiring
   verification.
10. Never invent legal rules, capital requirements, fees,
    deadlines or administrative procedures.

If the retrieved documents are insufficient, explicitly
indicate what must be verified with the competent authority.

OUTPUT:
Return a structured response containing:
- Recommended legal structure
- Alternative legal structures
- Comparison and justification
- Administrative steps
- Required documents
- Applicable obligations
- Authorizations to verify
- Official sources
- Missing information and warnings

Respond in clear and professional French.

""" 

def predict_business_creation(data):
    embedding_model=load_embedding_model()
    queries = build_creation_queries(data)
    chunks = []
    for query in queries :
        elements = predict(query=query,embedding_model=embedding_model) 
        for element in elements : 
            chunks.append(element)
    docs = prepare_docs(chunks)
    context = build_llm_creation_context(data,docs)
    return invoke_gemini_model(context)