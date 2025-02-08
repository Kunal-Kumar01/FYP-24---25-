from config.database import Database
from sqlalchemy.sql import text

def extract_schema():
    db = Database.get_connection()
    cursor = db.cursor()
    
    cursor.execute("SHOW TABLES;")
    tables = cursor.fetchall()
    
    schema_info = {}
    
    for (table,) in tables:
        schema_info[table] = {}
        
        cursor.execute(f"DESCRIBE {table};")
        columns = cursor.fetchall()
        schema_info[table]["columns"] = [{col[0]: col[1]} for col in columns]
        
        cursor.execute(f"""
        SELECT COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_NAME = '{table}' AND REFERENCED_TABLE_NAME IS NOT NULL;
        """)
        foreign_keys = cursor.fetchall()
        schema_info[table]["foreign_keys"] = [
            {"column": fk[0], "references": fk[1], "ref_column": fk[2]} for fk in foreign_keys
        ]
    
    return schema_info
