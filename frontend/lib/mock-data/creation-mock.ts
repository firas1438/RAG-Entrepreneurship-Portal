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

export function getMockCreationResult(values: Record<string, any>): CreationResultData {
  const isSolo = values.founderCount === "seul";
  const isTech = values.activityType === "numerique";
  const location = values.location || "tunis";
  const locationLabel =
    location === "tunis"
      ? "Tunis / Greater Tunis"
      : location === "sousse"
      ? "Sousse"
      : location === "monastir"
      ? "Monastir"
      : location === "sfax"
      ? "Sfax"
      : "Tunisia";

  return {
    recommendedStructure: isSolo
      ? {
          name: "Société Unipersonnelle à Responsabilité Limitée",
          abbr: "SUARL",
          badge: "Best match for single-founder personal asset protection",
          overview:
            "A single-member limited liability company established under Tunisian commercial law. It creates an independent legal entity separate from the founder's personal estate.",
          capitalRequirement: "No statutory minimum (freely determined in articles)",
          liability: "Strictly limited to the registered capital contribution",
          taxRegime: "Corporate Income Tax (IS) with standard deductions",
        }
      : {
          name: "Société à Responsabilité Limitée",
          abbr: "SARL",
          badge: "Best match for multi-founder ventures with limited liability",
          overview:
            "The premier standard corporate structure in Tunisia for small and medium partnerships (2 to 50 associates). It combines operational flexibility with complete shielding of personal assets.",
          capitalRequirement: "No statutory minimum (freely determined in articles)",
          liability: "Strictly limited to each partner's capital contributions",
          taxRegime: "Corporate Income Tax (IS) with deductible operating expenses",
        },
    alternativeStructures: isSolo
      ? [
          {
            name: "Entreprise Individuelle (EI)",
            abbr: "EI",
            reason:
              "Simpler registration process, but entails unlimited personal liability for business debts.",
          },
          {
            name: "Société par Actions Simplifiée (SAS)",
            abbr: "SAS",
            reason:
              "Applicable if seeking venture capital or under special innovation decrees.",
          },
        ]
      : [
          {
            name: "Société Anonyme (SA)",
            abbr: "SA",
            reason:
              "Suitable for large-scale institutional projects requiring a minimum capital of 5,000 TND and 7+ shareholders.",
          },
          {
            name: "Société en Nom Collectif (SNC)",
            abbr: "SNC",
            reason:
              "Family or direct trust partnerships where partners agree to joint and several liability.",
          },
        ],
    justification: {
      whySuitable: [
        `Strict personal asset protection: Your declared priority is respected; your personal property is completely sheltered from commercial liabilities.`,
        `Tailored to your team size (${isSolo ? "1 founder" : "2+ co-founders"}) without requiring complex board governance.`,
        `Optimal for your starting capital bracket of ${values.budget || "20,000 to 50,000"} TND, allowing all funds to go directly to operations rather than blocked reserves.`,
        isTech
          ? "Eligible for Startup Act labeling, granting social charge exemptions and customs relief in Tunisia."
          : `Fully compatible with commercial and service operations in the governorate of ${locationLabel}.`,
      ],
      advantages: [
        "Complete separation between company assets and personal property.",
        "Operational governance is flexible with manageable administrative compliance.",
        "Ability to onboard new equity partners or investors by amending the articles of association.",
        "Credibility with commercial banks, institutional suppliers, and corporate B2B clients.",
      ],
      limitations: [
        "Mandatory written Articles of Association (Statuts) registered with the tax administration.",
        "Double-entry commercial accounting required by Tunisian law.",
        "Annual financial statements and corporate tax returns (Liasse fiscale) must be filed with the Recette des Finances.",
      ],
    },
    administrativeSteps: [
      {
        stepNumber: "01",
        title: "Negative Certificate & Name Reservation",
        authority: "Registre National des Entreprises (RNE)",
        description:
          "Verification of trade name availability and official issuance of the reservation certificate.",
        duration: "24 – 48 hours",
      },
      {
        stepNumber: "02",
        title: "Drafting Articles of Association (Statuts)",
        authority: "Legal counsel / Certified accountant",
        description:
          "Drafting of bylaws specifying company headquarters, purpose, capital shares, and management powers.",
        duration: "2 – 3 days",
      },
      {
        stepNumber: "03",
        title: "Capital Deposit in Escrow Bank Account",
        authority: "Authorized Tunisian Commercial Bank",
        description:
          "Opening an 'enterprise in formation' account and obtaining the official capital blocking certificate (Attestation de blocage).",
        duration: "24 – 48 hours",
      },
      {
        stepNumber: "04",
        title: "Tax Registration & Patente",
        authority: "Recette des Finances / Ministry of Finance",
        description:
          "Filing declaration of existence, registration of lease agreement (Contrat de bail), and obtaining the Fiscal Identification Code (Matricule Fiscal).",
        duration: "1 – 2 days",
      },
      {
        stepNumber: "05",
        title: "Final Registration & JORT Notice",
        authority: "Registre National des Entreprises (RNE) / Guichet Unique APII",
        description:
          "Submission of incorporation bundle, legal publication in the official bulletin of the RNE (JORT announcement), and issuance of the official Extrait RNE.",
        duration: "24 – 72 hours",
      },
      {
        stepNumber: "06",
        title: "Social Security Employer Affiliation",
        authority: "Caisse Nationale de Sécurité Sociale (CNSS)",
        description:
          "Registering company and management with CNSS to obtain employer registration number.",
        duration: "2 – 3 days",
      },
    ],
    requiredDocuments: [
      {
        name: "Registered Commercial Lease (Contrat de bail enregistré)",
        description:
          "Commercial lease agreement for the registered office registered with the local Recette des Finances, or title deed.",
        status: "mandatory",
      },
      {
        name: "Articles of Association (Statuts)",
        description:
          "Signed original copies of the company bylaws (minimum 4 registered originals).",
        status: "mandatory",
      },
      {
        name: "Bank Capital Deposit Certificate",
        description:
          "Official certificate issued by a Tunisian bank certifying deposit of startup capital.",
        status: "mandatory",
      },
      {
        name: "National ID / Passport Copies of Founders & Manager",
        description:
          "Certified copies of CIN for Tunisian nationals or passports for foreign partners.",
        status: "mandatory",
      },
      {
        name: "Declaration of Beneficial Owners (Bénéficiaires effectifs)",
        description:
          "Official RNE regulatory form identifying natural persons holding 25%+ capital or voting rights.",
        status: "mandatory",
      },
      {
        name: "Specific Activity License / Cahier des charges",
        description:
          values.requiresAuthorization === "oui"
            ? "Administrative authorization or signed Cahier des Charges required for this sector."
            : "Declarative sector clearance — verify specific municipal requirements.",
        status: values.requiresAuthorization === "oui" ? "mandatory" : "conditional",
      },
    ],
    estimatedTimeline: "7 to 12 business days",
    estimatedOfficialFees: "350 – 650 TND (excluding professional legal drafting fees)",
  };
}
