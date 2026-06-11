import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="admin",      
            database="inventory_db"
        )

        return connection

    except Error as e:
        print("Database Connection Error:", e)
        return None