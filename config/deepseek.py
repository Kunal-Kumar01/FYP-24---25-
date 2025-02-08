import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from langchain_community.llms.huggingface_hub import HuggingFaceHub

load_dotenv()

model_name = os.getenv("DEEPSEEK_MODEL")
huggingface_api = os.getenv("HUGGING_FACE_API_KEY")

def get_llm_deepseek():
    return HuggingFaceHub(repo_id=model_name, model_kwargs={"max_new_tokens": 256}, huggingfacehub_api_token=huggingface_api)