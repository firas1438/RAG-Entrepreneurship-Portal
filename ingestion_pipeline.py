import os 
from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma


def load_documents(docs_path="docs") : 
    if not os.path.exists(docs_path) : 
        raise FileNotFoundError(f"the directory {docs_path} does not exist.")

    loader = DirectoryLoader(
        path=docs_path,
        glob="*.txt",
        loader_cls=TextLoader
    )

    documents = loader.load()

    if(len(documents)==0) : 
        raise FileNotFoundError("no .txt files found in this directory ")

    for i,doc in enumerate(documents):
        print(f"source : {doc.metadata['source']}")
        print(f"length : {len(doc.page_content)} characters")
        print(f"metadata : {doc.metadata}")
    
    return documents

def split_documents(documents,chunk_size=1000,chunk_overlap=0) :
    text_splitter = CharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
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
    embedding_model = HuggingFaceEmbeddings(
        model_name="paraphrase-multilingual-MiniLM-L12-v2"
    )

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