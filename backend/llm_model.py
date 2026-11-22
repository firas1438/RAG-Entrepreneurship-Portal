from google import genai
import os
import json
import requests
from dotenv import load_dotenv
from json_repair import repair_json

def clean_and_parse_json(text: str) -> dict:
    """Extract and parse pure JSON from model output, stripping markdown fences and auto-repairing."""
    cleaned = text.strip()

    # Strip markdown code blocks if present
    if "```json" in cleaned:
        cleaned = cleaned.split("```json", 1)[1].split("```", 1)[0].strip()
    elif "```" in cleaned:
        cleaned = cleaned.split("```", 1)[1].split("```", 1)[0].strip()

    # Extract JSON between outermost '{' and '}'
    start_idx = cleaned.find("{")
    end_idx = cleaned.rfind("}")
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        cleaned = cleaned[start_idx : end_idx + 1]

    # Try strict parse first; fall back to auto-repair for common LLM JSON errors
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        try:
            repaired = repair_json(cleaned)
            return json.loads(repaired)
        except Exception as e:
            raise ValueError(f"Failed to parse model output as JSON even after repair: {e}\nRaw output: {text[:300]}") from e

def invoke_gemini_model(combined_input,model="gemini-4-hydrogen"):
    load_dotenv()
    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        raise RuntimeError("GOOGLE_API_KEY is not set in the .env file.")
    try :
        client =  genai.Client(
            api_key=google_api_key
        ) 
        interaction = client.interactions.create(
        model=model,
        input=combined_input,
        stream=False
    )
        return interaction.output_text

    except Exception as e:
        raise RuntimeError("Error while calling the Gemini model.") from e


def invoke_local_llm(prompt, model="gemma3:4b"):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {
            "num_ctx": 16384,
            "num_predict": 8192,
            "temperature": 0.2
        }
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()["response"]
    except Exception as e:
        raise RuntimeError("Error while calling the local Gemma 3 model.") from e