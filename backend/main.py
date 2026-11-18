from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional,List


from business_creation import predict_business_creation
from market_analysis import predict_market_analysis
from feasibility_study import predict_feasability_creation

app = FastAPI(title="RAG API", version="1.0.0")


class QuestionRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Question to answer")

class BusinessCreationRequest(BaseModel):
    activityType: str = Field(
        ...,
        description="Domaine général de l'activité (numérique, commerce, industrie, etc.)"
    )

    activityDescription: str = Field(
        ...,
        description="Description courte de l'activité de l'entreprise"
    )

    location: str = Field(
        ...,
        description="Gouvernorat ou région où l'entreprise sera immatriculée"
    )

    founderCount: str = Field(
        ...,
        description="Nombre de fondateurs ou associés"
    )

    role: str = Field(
        ...,
        description="Rôle de l'utilisateur dans l'entreprise"
    )

    existingBusiness: str = Field(
        ...,
        description="Indique si l'utilisateur possède déjà une activité"
    )

    budget: str = Field(
        ...,
        description="Budget ou capital prévu en TND"
    )

    patrimonialProtection: str = Field(
        ...,
        description="Importance de la protection du patrimoine personnel"
    )

    requiresAuthorization: str = Field(
        ...,
        description="Indique si l'activité nécessite une autorisation spéciale"
    )

    additionalInfo: Optional[str] = Field(
        None,
        description="Informations ou remarques complémentaires"
    )

class MarketAnalysisRequest(BaseModel):
    productDescription: str = Field(
        ...,
        description="Description du produit ou service proposé"
    )

    sector: str = Field(
        ...,
        description="Secteur d'activité de l'entreprise"
    )

    marketScope: str = Field(
        ...,
        description="Portée géographique du marché cible"
    )

    customerType: str = Field(
        ...,
        description="Type de clientèle visée (B2C, B2B, B2G, étudiants, etc.)"
    )

    ageRange: str = Field(
        ...,
        description="Tranche d'âge principale ciblée"
    )

    knownCompetitors: str = Field(
        ...,
        description="Indique si des concurrents sont déjà identifiés"
    )

    competitorNames: Optional[str] = Field(
        None,
        description="Noms ou références des concurrents connus"
    )

    differentiation: str = Field(
        ...,
        description="Avantage concurrentiel principal (prix, qualité, innovation, service, etc.)"
    )

    mainObjective: str = Field(
        ...,
        description="Objectif principal de l'étude de marché"
    )

class FeasibilityStudyRequest(BaseModel):
    businessIdea: str = Field(
        ...,
        description="Description générale du projet entrepreneurial"
    )

    productsServices: str = Field(
        ...,
        description="Produits ou services qui seront proposés"
    )

    activityLocation: str = Field(
        ...,
        description="Lieu principal d'exercice de l'activité"
    )

    startupNeeds: List[str] = Field(
        ...,
        description="Liste des ressources nécessaires au démarrage"
    )

    teamSize: str = Field(
        ...,
        description="Taille de l'équipe au lancement du projet"
    )

    initialBudget: str = Field(
        ...,
        description="Budget initial estimé pour démarrer l'activité"
    )

    fundingSource: str = Field(
        ...,
        description="Source de financement du projet"
    )

    salesChannel: str = Field(
        ...,
        description="Canal principal de vente ou de distribution"
    )

    hasSalesEstimate: str = Field(
        ...,
        description="Indique si une estimation du chiffre d'affaires mensuel existe (oui/non)"
    )

    monthlySalesEstimate: Optional[str] = Field(
        None,
        description="Estimation du chiffre d'affaires mensuel en TND"
    )

    anticipatedChallenges: Optional[str] = Field(
        None,
        description="Principaux défis ou risques anticipés"
    )

    additionalInfo: Optional[str] = Field(
        None,
        description="Informations supplémentaires concernant la faisabilité du projet"
    )

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/business-creation")
async def business_creation(request: BusinessCreationRequest):
    
    result =  predict_business_creation(request)
    return result


@app.post("/market-analysis")
async def create_market_analysis(request: MarketAnalysisRequest):
    result = predict_market_analysis(request)
    return result

@app.post("/feasability-study")
async def feasability_study(request: FeasibilityStudyRequest):
    result = predict_feasability_creation(request)
    return result