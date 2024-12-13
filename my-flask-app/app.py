from flask import Flask, request, redirect, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    print('Received upload request')
    if 'file' not in request.files:
        print('No file part in the request')
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        print('No selected file')
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        print(f'Saving file to {filepath}')
        file.save(filepath)
        if os.path.exists(filepath):
            print(f'File successfully saved: {filepath}')
        else:
            print(f'Failed to save file: {filepath}')
        return redirect(f'/uploads/{file.filename}')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    print(f'Serving file {filename}')
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
