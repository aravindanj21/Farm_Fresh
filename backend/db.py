import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="order_management"
)

cursor = connection.cursor(dictionary=True)