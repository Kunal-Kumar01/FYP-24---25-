import os
from dotenv import load_dotenv
from groq import Groq
from langchain_core.language_models import LLM
from typing import Optional, List

load_dotenv()

GROQ_API = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL")

client = Groq(api_key=GROQ_API)

# Create a LangChain-compatible LLM wrapper
class GroqLangChainLLM(LLM):
    """Wraps Groq API to make it LangChain-compatible."""

    @property
    def _llm_type(self) -> str:
        return "groq-chat"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        """Processes input prompt and returns generated response."""
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": "You are an expert in database schema design and data warehousing."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1500,
            top_p=0.95
        )
        return response.choices[0].message.content.strip()

def get_llm_groq():
    """Returns a LangChain-compatible Groq model."""
    return GroqLangChainLLM()
