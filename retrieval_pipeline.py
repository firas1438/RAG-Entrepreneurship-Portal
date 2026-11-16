import os

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from google import genai

PERSISTENT_DIRECTORY = "db/chroma_db"
GEMINI_MODEL = "gemini-3.8-flash"

load_dotenv()

google_api_key = os.getenv("GOOGLE_API_KEY")
if not google_api_key:
    raise RuntimeError("GOOGLE_API_KEY is not set in the .env file.")

embedding_model = HuggingFaceEmbeddings(
    model_name="paraphrase-multilingual-MiniLM-L12-v2"
)

db = Chroma(
    persist_directory=PERSISTENT_DIRECTORY,
    embedding_function=embedding_model,
    collection_metadata={"hnsw:space": "cosine"},
)

query = "متى تم تأسيس شركة غوغل و من هم المؤسسين"

retriever = db.as_retriever(search_kwargs={"k": 3})

relevant_docs = retriever.invoke(query)

for i, doc in enumerate(relevant_docs):
    print(f"Doc {i+1} : \n{doc.page_content}\n")

context = "\n\n".join(
    f"Document {i + 1}:\n{doc.page_content}" for i, doc in enumerate(relevant_docs)
)

combined_input = f"""You are a helpful question-answering assistant.

Answer the question using only the provided context. If the answer is not
available in the context, say that you do not know.

Question:
{query}

Context:
{context}
"""

try :
    client =  genai.Client(
        api_key=google_api_key
    ) 
    interaction = client.interactions.create(
    model="gemini-4-hydrogen",
    input=combined_input
)

    print(f"Answer:\n{interaction.output_text}")

except Exception as e: 
    print("error while calling gemini model ",e)