from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

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
        # You can use any simple route from Node.js to verify the health check
        response = requests.get('http://localhost:5000/api/health/nodejs')  # Adjust the Node.js health endpoint
        return jsonify({'message': 'Connected to Node.js!', 'nodeResponse': response.json()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
