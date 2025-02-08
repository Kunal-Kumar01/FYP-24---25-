from data import extract
from agent import schemaAgent, factDimensionAgent

if __name__ == "__main__":
    schema = extract.extract_schema()
    print("Extracted Schema:", schema)

    userDetails = None
    inputNum = input("Enter 1 to pass default user details prompt for Chinook Database: ")

    if int(inputNum) == 1:
        userDetails = "I need a Listener Engagement Data to analyze how customers engage with different music genres, artists, and playlists to personalize recommendations and improve marketing strategies."

    recommendation = schemaAgent.determine_schema_type(userDetails)
    print("Recommended Schema Type:", recommendation)

    if (recommendation == "Insufficient Tables"):
        print("Insufficient Tables, cannot recommend further")
    else:
        factDimension = factDimensionAgent.get_fact_dimension_tables(recommendation, schema, userDetails)
        print("fact and dimension tables:", factDimension)