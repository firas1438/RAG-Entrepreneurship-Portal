from retrieval_pipeline import predict, prepare_docs
from emebedding_model import load_embedding_model
from llm_model import invoke_local_llm, clean_and_parse_json


def build_creation_queries(data):

    queries = [
        f"""
        Administrative requirements and procedures to establish
        a business in the {data.activityType} sector.
        Activity: {data.activityDescription}.
        """,

        f"""
        Comparison of Tunisian legal structures (formes juridiques) according
        to number of founders: {data.founderCount}.
        Personal asset protection priority:
        {data.patrimonialProtection}.
        Founder role: {data.role}.
        """,

        f"""
        Share capital requirements (capital social) and incorporation costs
        to register a company in Tunisia.
        Initial budget: {data.budget} TND.
        """,

        f"""
        Competent authorities and business registration formalities
        in {data.location}, Tunisia.
        """,

        f"""
        Administrative authorizations, licenses, and permits required
        for the following activity:
        {data.activityDescription}.
        Client response regarding authorizations:
        {data.requiresAuthorization}.
        """
    ]

    return queries

def build_llm_creation_context(data, chunks):
    return f"""
SYSTEM ROLE:
You are an expert legal and administrative consultant for business creation in Tunisia.
Your mission is to guide entrepreneurs through legal form selection, administrative incorporation steps, and required documents based on official Tunisian laws (RNE, Code des Sociétés Commerciales).

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
- Additional information: {data.additionalInfo or 'None'}

RETRIEVED OFFICIAL DOCUMENTS:
{chunks}

CRITICAL INSTRUCTIONS:
1. Output ONLY a raw JSON object. No other text before or after it.
2. The very first character of your response MUST be {{ and the very last character MUST be }}.
3. Do NOT use backticks, triple backticks, or any markdown (no \`\`\`, no \`\`\`json).
4. Do NOT write any preamble, greeting, or intro (e.g. do NOT say "Okay", "Sure", "Here is", "Of course", etc.).
5. Do NOT add any trailing notes, comments, or explanations after the closing }}.
6. Output strictly valid JSON: every string must be properly quoted and escaped, all commas and colons must be correct.
7. Preserve official Tunisian legal terms (e.g. SUARL, SARL, SA, Entreprise Individuelle, RNE, Patente, CNSS, TND).
8. Ensure 'administrativeSteps' has 4-5 sequential steps ordered chronologically.
9. Ensure 'requiredDocuments' lists all mandatory and conditional documents needed to incorporate.

EXACT JSON SCHEMA TO RETURN:
{{
  "recommendedStructure": {{
    "name": "Full legal name (e.g. Société Unipersonnelle à Responsabilité Limitée)",
    "abbr": "Legal abbreviation (e.g. SUARL)",
    "badge": "Short badge (e.g. Recommended for Solo Founders)",
    "overview": "Concise summary explaining why this structure matches the founder's profile and budget.",
    "capitalRequirement": "Minimum statutory capital requirement in TND (e.g. No legal minimum - 1 TND symbolic, 1,000 TND recommended)",
    "liability": "Liability extent (e.g. Limited to capital contributions)",
    "taxRegime": "Applicable tax regime (e.g. Corporate Income Tax (IS) at 15%)"
  }},
  "alternativeStructures": [
    {{
      "name": "Alternative Structure 1",
      "abbr": "SARL",
      "reason": "When to choose this alternative (e.g. If partnering with co-founders)."
    }},
    {{
      "name": "Alternative Structure 2",
      "abbr": "EI",
      "reason": "When to choose this alternative (e.g. For micro-businesses with low risk)."
    }}
  ],
  "justification": {{
    "whySuitable": [
      "Key reason 1 why this structure is optimal for the founder",
      "Key reason 2",
      "Key reason 3"
    ],
    "advantages": [
      "Specific legal or tax advantage 1",
      "Specific advantage 2"
    ],
    "limitations": [
      "Specific constraint or requirement 1",
      "Specific constraint 2"
    ]
  }},
  "administrativeSteps": [
    {{
      "stepNumber": "01",
      "title": "Articles of Association (Statuts)",
      "authority": "Drafted by lawyer/accountant or certified template",
      "description": "Drafting and legalizing company bylaws defining share distribution and governance.",
      "duration": "1 – 2 business days"
    }},
    {{
      "stepNumber": "02",
      "title": "Bank Account & Capital Deposit",
      "authority": "Licensed Tunisian Commercial Bank",
      "description": "Open a temporary corporate account in escrow and deposit initial share capital to obtain deposit certificate.",
      "duration": "24 – 48 hours"
    }},
    {{
      "stepNumber": "03",
      "title": "Tax Identification (Patente)",
      "authority": "Bureau de Contrôle des Impôts",
      "description": "File tax declaration (Déclaration d'existence) and obtain the company fiscal identification number.",
      "duration": "Same-day"
    }},
    {{
      "stepNumber": "04",
      "title": "RNE Commercial Registration",
      "authority": "Registre National des Entreprises (RNE)",
      "description": "Register in the national trade register and obtain the official RNE extract (Extrait du RNE).",
      "duration": "24 – 48 hours"
    }}
  ],
  "requiredDocuments": [
    {{
      "name": "Registered Lease or Domiciliation Contract",
      "description": "Registered commercial lease or domiciliation agreement registered with the tax authority.",
      "status": "mandatory"
    }},
    {{
      "name": "National Identity Card (CIN) / Passport Copy",
      "description": "Valid legal identity document of the founder(s) and appointed manager.",
      "status": "mandatory"
    }},
    {{
      "name": "Bank Capital Deposit Certificate",
      "description": "Official certificate confirming the escrow deposit of initial capital.",
      "status": "mandatory"
    }},
    {{
      "name": "Sectoral Administrative Authorization / Cahier des Charges",
      "description": "Required only if the activity is regulated by ministerial order.",
      "status": "conditional"
    }}
  ],
  "estimatedTimeline": "7 to 10 business days",
  "estimatedOfficialFees": "250 – 450 TND (excluding legal drafting fees)"
}}
"""

def predict_business_creation(data):
    embedding_model = load_embedding_model()
    queries = build_creation_queries(data)
    chunks = []
    for query in queries:
        elements = predict(query=query, embedding_model=embedding_model)
        for element in elements:
            chunks.append(element)
    docs = prepare_docs(chunks)
    context = build_llm_creation_context(data, docs)
    raw_output = invoke_local_llm(context)
    return clean_and_parse_json(raw_output)