from config.deepseek import get_llm_deepseek
from config.groq import get_llm_groq
from data.extract import extract_schema
from langchain_core.prompts import PromptTemplate
from langsmith import traceable

llm_deepseek = get_llm_deepseek()
llm_groq = get_llm_groq()

schema_prompt_without_userDetails = PromptTemplate(
    input_variables=["schema"],
    template="""
    given the following OLTP database schema: {schema},
    recommend whether a **Star Schema** or **Snowflake Schema** is best for a data mart.

    **Rules:**
    - Answer concisely and in the following format:

    **Output format:**
    - (Star Schema / Snowflake Schema)

    **Example Output:**
    - Star Schema

    **Rules:**
    - If OLTP database schema has less than or equal to 5 tables then give following output:

    **Output:**
    - Insufficient Tables
    """
)

schema_prompt_with_userDetails = PromptTemplate(
    input_variables=["schema", "userDetails"],
    template="""
    given the following OLTP database schema: {schema} and user requirements: {userDetails},
    identify what does user want either a datawarehouse or a data mart and
    recommend whether a **Star Schema** or **Snowflake Schema** is best for it.

    **Rules:**
    - Answer concisely and in the following format:

    **Output format:**
    - (Star Schema / Snowflake Schema)

    **Example Output:**
    - Star Schema

    **Rules:**
    - If OLTP database schema has less than or equal to 5 tables then give following output:

    **Output:**
    - Insufficient Tables
    """
)

@traceable
def determine_schema_type(userDetails):
    prompt = None

    if not userDetails or not userDetails.strip():
        prompt = schema_prompt_without_userDetails
    else:
        prompt = schema_prompt_with_userDetails

    schema = extract_schema()
    # schema_chain = schema_prompt | llm_deepseek
    schema_chain = prompt | llm_groq
    return schema_chain.invoke({"schema":schema, "userDetails": userDetails})