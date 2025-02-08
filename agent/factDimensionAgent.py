from config.groq import get_llm_groq
from langchain_core.prompts import PromptTemplate
from langsmith import traceable

llm_groq = get_llm_groq()

fact_dimension_prompt_with_userDetails = PromptTemplate(
    input_variables=["schemaType", "DBschema", "userDetails"],
    template="""
    Given this OLTP schema: {DBschema} and the recommended schema type: {schemaType} and user requirements: {userDetails}.
    First identify if the user requirements ask for a datawarehouse or a datamart.
    Then identify the best one **Fact Table** and all required **Dimension Tables** for the user requirements.
    Provide the columns of fact table and dimension tables as well and how dimensions tables link to the fact table.
    Provide the output in JSON format.
    """
)

fact_dimension_prompt_without_userDetails = PromptTemplate(
    input_variables=["schemaType", "DBschema", "userDetails"],
    template="""
    Given this OLTP schema: {DBschema} and the recommended schema type: {schemaType}.
    First identify what would be the best possible data mart for a business problem as per the input.
    Then identify the best one **Fact Table** and all required **Dimension Tables** for that identified data mart.
    Provide the columns of fact table and dimension tables as well and how dimensions tables link to the fact table.
    Provide the output in JSON format.
    """
)

@traceable
def get_fact_dimension_tables(schemaType, DBschema, userDetails):
    prompt = None

    if not userDetails or not userDetails.strip():
        prompt = fact_dimension_prompt_without_userDetails
    else:
        prompt = fact_dimension_prompt_with_userDetails

    schema_chain = prompt | llm_groq
    result = schema_chain.invoke({"schemaType": schemaType, "DBschema": DBschema, "userDetails": userDetails})
    return result