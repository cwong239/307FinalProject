from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route('/process', methods=['POST'])
def process_image():
    brightness = request.args.get('brightness', default=0, type=float)
    contrast = request.args.get('contrast', default=1.0, type=float)
    
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400

    uploaded_file = request.files['image']
    file_bytes = np.frombuffer(uploaded_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    if image is None:
        return jsonify({'error': 'Invalid image file.'}), 400

    processed_image = cv2.convertScaleAbs(image, alpha=contrast, beta=brightness)
    success, encoded_image = cv2.imencode('.jpg', processed_image)
    if not success:
        return jsonify({'error': 'Failed to encode image.'}), 500

    return send_file(
        io.BytesIO(encoded_image.tobytes()),
        mimetype='image/jpeg',
        as_attachment=True,
        download_name='processed_image.jpg'
    )

if __name__ == '__main__':
    app.run(debug=True)
