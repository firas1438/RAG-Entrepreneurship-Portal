from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List

from business_creation import predict_business_creation
from market_analysis import predict_market_analysis

app = FastAPI(title="RAG API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


class QuestionRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Question to answer")

class BusinessCreationRequest(BaseModel):
    activityType: str = Field(
        ...,
        description="General business domain (digital, commerce, industry, craft, agriculture, etc.)"
    )

    activityDescription: str = Field(
        ...,
        description="Short description of the business activity"
    )

    location: str = Field(
        ...,
        description="Tunisian governorate or region where the business will be registered"
    )

    founderCount: str = Field(
        ...,
        description="Number of founders or partners"
    )

    role: str = Field(
        ...,
        description="Role of the user in the company (founder, partner, investor, etc.)"
    )

    existingBusiness: str = Field(
        ...,
        description="Indicates whether the user already owns an existing business"
    )

    budget: str = Field(
        ...,
        description="Initial budget or planned capital in TND"
    )

    patrimonialProtection: str = Field(
        ...,
        description="Priority given to personal asset protection"
    )

    requiresAuthorization: str = Field(
        ...,
        description="Indicates whether the activity requires special permits or authorization"
    )

    additionalInfo: Optional[str] = Field(
        None,
        description="Additional details or comments"
    )

class MarketAnalysisRequest(BaseModel):
    productDescription: str = Field(
        ...,
        description="Description of the proposed product or service"
    )

    sector: str = Field(
        ...,
        description="Industry sector of the business"
    )

    marketScope: str = Field(
        ...,
        description="Geographical scope of the target market"
    )

    customerType: str = Field(
        ...,
        description="Target customer segment (B2C, B2B, B2G, students, etc.)"
    )

    ageRange: str = Field(
        ...,
        description="Primary target age range"
    )

    knownCompetitors: str = Field(
        ...,
        description="Indicates whether competitors are already identified"
    )

    competitorNames: Optional[str] = Field(
        None,
        description="Names or references of known competitors"
    )

    differentiation: str = Field(
        ...,
        description="Primary competitive advantage (price, quality, innovation, service, proximity)"
    )

    salesChannel: str = Field(
        ...,
        description="Primary distribution channel (e-commerce, physical store, social media, etc.)"
    )

    initialBudget: str = Field(
        ...,
        description="Estimated startup budget in TND"
    )

    startupNeeds: Optional[List[str]] = Field(
        None,
        description="Initial resources or equipment needed for launch"
    )

    hasSalesEstimate: str = Field(
        ...,
        description="Indicates whether the user has a sales estimate"
    )

    monthlySalesEstimate: Optional[str] = Field(
        None,
        description="Estimated monthly sales in TND if available"
    )

    mainObjective: str = Field(
        ...,
        description="Primary objective of the market analysis"
    )

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/business-creation")
async def business_creation(request: BusinessCreationRequest):
    result = predict_business_creation(request)
    return result

@app.post("/market-analysis")
async def create_market_analysis(request: MarketAnalysisRequest):
    result = predict_market_analysis(request)
    return result
