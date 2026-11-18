import os 
from langchain_community.document_loaders import  DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_experimental.text_splitter import SemanticChunker
from langchain_chroma import Chroma
from emebedding_model import load_embedding_model

def load_documents(docs_path="docs") : 
    if not os.path.exists(docs_path) : 
        raise FileNotFoundError(f"the directory {docs_path} does not exist.")

    loader = DirectoryLoader(
        path=docs_path,
        glob="*.pdf",
    )

    documents = loader.load()

    if(len(documents)==0) : 
        raise FileNotFoundError("no .txt files found in this directory ")

    for i,doc in enumerate(documents):
        print(f"source : {doc.metadata['source']}")
        print(f"length : {len(doc.page_content)} characters")
        print(f"metadata : {doc.metadata}")
    
    return documents

def split_documents(documents,chunk_size=950,chunk_overlap=50) :
    embeddings = load_embedding_model()
    text_splitter = SemanticChunker(
    embeddings,
    breakpoint_threshold_type="percentile",
    breakpoint_threshold_amount=95
)

    chunks = text_splitter.split_documents(documents=documents)
    if chunks :
        for i,chunk in enumerate(chunks[:10]) :
            print(f"source : {chunk.metadata['source']}") 
            print(f"length : {len(chunk.page_content)} characters") 
            print(f"content : {chunk.page_content}") 
            print(f"-"*50)

    return chunks

def create_vector_store(chunks,persist_directory="db/chroma_db") :
    embedding_model = load_embedding_model()

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=persist_directory,
        collection_metadata={"hnsw:space" : "cosine"} # cosine similarity method
    )

    return vector_store


def main(): 
    # 1 loading files
    documents=load_documents()
    # 2 chuncking
    chunks=split_documents(documents)
    # emebeddings & storing 
    vectore_store = create_vector_store(chunks=chunks)

if __name__ == "__main__" : 
    main()