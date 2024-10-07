from flask import Flask, jsonify, request
import requests
import mysql.connector
import mariadb
from pymongo import MongoClient

app = Flask(__name__)

# MySQL connection setup
def mysql_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="nodeside",  # Replace with your MySQL username
            password="Prithibi420@",  # Replace with your MySQL password
            database="listify"  # Replace with your MySQL database name
        )
        return connection
    except mysql.connector.Error as e:
        return str(e)

# MariaDB connection setup
def mariadb_connection():
    try:
        connection = mariadb.connect(
            user="root",  # Replace with your MariaDB username
            password="Prithibi420@",  # Replace with your MariaDB password
            host="127.0.0.1",  # Replace with your MariaDB hostname
            port=3309,  # Replace with your MariaDB port
            database="listify"  # Replace with your MariaDB database name
        )
        return connection
    except mariadb.Error as e:
        return str(e)

# MongoDB connection setup
def mongodb_connection():
    try:
        client = MongoClient('localhost', 27017)
        db = client['listify']  # Replace with your MongoDB database name
        return db
    except Exception as e:
        return str(e)

# Test route
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'Flask is up and running!'})

# Health check endpoint for the Flask app
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'success', 'message': 'Python backend is running!'})

# Test connectivity to Java
@app.route('/api/java', methods=['GET'])
def connect_java():
    try:
        response = requests.get('http://localhost:8080/api/items')  # Replace with your Java service URL
        return jsonify(response.json()), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Test connectivity to Node.js (Health check)
@app.route('/api/health/nodejs', methods=['GET'])
def health_node():
    try:
        response = requests.get('http://localhost:5000/api/health/nodejs')  # Adjust the Node.js health endpoint
        return jsonify({'message': 'Connected to Node.js!', 'nodeResponse': response.json()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# New endpoint: Test MySQL connection
@app.route('/api/mysql/test', methods=['GET'])
def test_mysql():
    conn = mysql_connection()
    if isinstance(conn, str):
        return jsonify({'error': f"MySQL connection failed: {conn}"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 + 1 AS solution")
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify({'message': 'MySQL connected', 'result': result[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# New endpoint: Test MariaDB connection
@app.route('/api/mariadb/test', methods=['GET'])
def test_mariadb():
    conn = mariadb_connection()
    if isinstance(conn, str):
        return jsonify({'error': f"MariaDB connection failed: {conn}"}), 500
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 + 1 AS solution")
        result = cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify({'message': 'MariaDB connected', 'result': result[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# New endpoint: Test MongoDB connection
@app.route('/api/mongodb/test', methods=['GET'])
def test_mongodb():
    db = mongodb_connection()
    if isinstance(db, str):
        return jsonify({'error': f"MongoDB connection failed: {db}"}), 500
    try:
        collection = db['ads']  # Example collection
        doc_count = collection.count_documents({})
        return jsonify({'message': 'MongoDB connected', 'document_count': doc_count})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
