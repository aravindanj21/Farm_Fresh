from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="auth_db"
)

cursor = db.cursor()


@app.route('/register', methods=['POST'])
def register():
    data = request.json

    name = data['name']
    mobile = data['mobile']
    password = data['password']
    location = data['location']
    businessName = data['businessName']
    businessType = data['businessType']
    role = data['role']

    try:
        sql = """
        INSERT INTO users (name, mobile, password, location, businessName, businessType, role)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        values = (name, mobile, password, location, businessName, businessType, role)

        cursor.execute(sql, values)
        db.commit()

        return jsonify({"message": "User registered successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/users', methods=['GET'])
def get_users():
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()

    users = []
    for r in rows:
        users.append({
            "id": r[0],
            "name": r[1],
            "mobile": r[2],
            "password": r[3],
            "location": r[4],
            "businessName": r[5],
            "businessType": r[6],
            "role": r[7],
        })

    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)