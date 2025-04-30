from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import io
from processing.image_processing import process_image

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route('/image', methods=['POST'])
def process_request():
    # Retrieve brightness and contrast from query parameters
    brightness = request.args.get('brightness', default=0, type=float)
    contrast = request.args.get('contrast', default=1.0, type=float)

    # Check if an image file is provided
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided.'}), 400

    # Read the image file as a numpy array
    uploaded_file = request.files['image']
    file_bytes = np.frombuffer(uploaded_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({'error': 'Invalid image file.'}), 400

    try:
        # Process the image using the dedicated function
        encoded_image_bytes = process_image(image, brightness, contrast)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Send the processed image back as a downloadable JPEG file
    return send_file(
        io.BytesIO(encoded_image_bytes),
        mimetype='image/jpeg',
        as_attachment=True,
        download_name='processed_image.jpg'
    )

if __name__ == '__main__':
    app.run(debug=True)
