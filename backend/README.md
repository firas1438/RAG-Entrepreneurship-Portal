# RAG Tutorial with Gemini and Chroma

This project is a small, hands-on Retrieval-Augmented Generation (RAG)
tutorial. It demonstrates how to load documents, split them into manageable
chunks, convert those chunks into multilingual vector embeddings, store them
in ChromaDB, retrieve the most relevant documents for a question, and give the
retrieved context to a Gemini model for an answer.

## Architecture

```text
docs/*.txt
    |
    v
ingestion_pipeline.py
    |-- Load text documents
    |-- Split documents into chunks
    |-- Create embeddings with
    |   paraphrase-multilingual-MiniLM-L12-v2
    `-- Store vectors in db/chroma_db
    |
    v
retrieval_pipeline.py
    |-- Load the persisted Chroma vector store
    |-- Retrieve the most relevant chunks
    |-- Build a structured question and context prompt
    `-- Generate an answer with Gemini
```

The same embedding model is used when creating and querying the vector store.
This keeps document vectors and query vectors in the same semantic space.

## Project layout

```text
.
├── docs/                    # Source text documents
├── ingestion_pipeline.py    # Ingestion and vector-store creation
├── retrieval_pipeline.py    # Retrieval and Gemini generation
├── requirements.txt         # Python dependencies
├── .env.example             # Environment-variable template
└── .gitignore               # Excludes secrets and generated files
```

The local `db/` directory and `notes.txt` are intentionally ignored because
the vector database is generated locally and the notes are tutorial material.

## Setup

Use Python 3.10 or newer:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a local `.env` file from the template and add your Gemini API key:

```powershell
Copy-Item .env.example .env
```

Then edit `.env`:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

Never commit `.env` or share the API key. The `.gitignore` file excludes it
from Git.

## Run the tutorial

1. Put `.txt` source documents in `docs/`.
2. Build the local vector store:

   ```powershell
   python ingestion_pipeline.py
   ```

3. Run retrieval and Gemini generation:

   ```powershell
   python retrieval_pipeline.py
   ```

The first embedding run may download the Sentence Transformers model. The
generated Chroma data is stored under `db/chroma_db` and is not committed.

## Run the API server

Start the FastAPI application with Uvicorn:

```powershell
uvicorn main:app --reload
```

The health endpoint is available at `http://127.0.0.1:8000/health`. Ask a
question by sending JSON to `http://127.0.0.1:8000/ask`:

```powershell
Invoke-RestMethod -Method Post `
  -Uri http://127.0.0.1:8000/ask `
  -ContentType "application/json" `
  -Body '{"query":"Quelles sont les démarches administratives ?"}'
```

## What this tutorial teaches

- Why RAG is useful when all documents cannot fit directly into an LLM prompt.
- How chunking reduces the amount of text sent to downstream components.
- How embeddings represent semantic meaning as vectors.
- How similarity search finds relevant context.
- How a vector database supports retrieval.
- How retrieved context can ground a Gemini response.

This is an educational example rather than a production service. A production
implementation should add input validation, structured logging, retry handling,
access controls, and a web or API interface.
