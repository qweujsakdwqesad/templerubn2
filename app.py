import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all origins
CORS(app)

# OR, for specific origins
# CORS(app, resources={r"/*": {"origins": "https://your-frontend-url"}})

UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 180 * 1024 * 1024  # Limit to 180 MB

app.config['DEBUG'] = False

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Check for file size before saving
    if len(file.read()) > app.config['MAX_CONTENT_LENGTH']:
        return jsonify({'error': 'File size exceeds the limit'}), 413

    # Move the file pointer back to the start after checking size
    file.seek(0)
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    return jsonify({'success': True, 'fileUrl': f'/uploads/{file.filename}'})


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Explicitly handle preflight OPTIONS requests by adding CORS headers
@app.route('/upload', methods=['OPTIONS'])
def options_request():
    response = jsonify({'message': 'Preflight request handled'})
    # Add CORS headers manually
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

if __name__ == '__main__':
    app.run(port=3000, debug=False)
