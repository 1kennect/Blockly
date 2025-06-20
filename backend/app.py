from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import tempfile
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code', '')

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.py') as temp:
            temp.write(code.encode())
            temp_path = temp.name

        result = subprocess.run(['python', temp_path], capture_output=True, text=True, timeout=5)

        os.unlink(temp_path)

        return jsonify({
            'output': result.stdout + result.stderr
        })

    except subprocess.TimeoutExpired:
        return jsonify({'output': 'Error: Execution timed out after 5 seconds'})
    except Exception as e:
        return jsonify({'output': f'Error: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)
