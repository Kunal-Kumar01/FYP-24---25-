import os
from dotenv import load_dotenv
from mysql.connector import pooling

load_dotenv()

class Database:

    load_dotenv()

    pool = pooling.MySQLConnectionPool(
        pool_name="safify_itsm",
        pool_size=5,
        host=os.getenv("DATABASE_HOST"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
        port=os.getenv("DATABASE_PORT"),
        database=os.getenv("DATABASE_DB"),
        ssl_ca="C:/Users/Sameed/ALL/Work/IBA/FYP/Secrets/ca.pem",
        ssl_verify_cert=True
    )

    @staticmethod
    def get_connection():
        return Database.pool.get_connection()