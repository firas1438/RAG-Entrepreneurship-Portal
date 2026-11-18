from google import genai
import os
from dotenv import load_dotenv

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