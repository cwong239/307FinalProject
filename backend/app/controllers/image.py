from flask import request, send_file, jsonify
import numpy as np
import io
import cv2
from app.processing.image_processing import process_image

def process_image_controller():

    #print("process_image_controller() called.")

    # Retrieve brightness and contrast from query parameters
    brightness = request.args.get("brightness", default=0, type=float)
    contrast = request.args.get("contrast", default=1.0, type=float)
    gamma = request.args.get("gamma", default=1.0, type=float)
    remove_bg = request.args.get("remove_bg", default=0, type=int)

    # Check if an image file is provided
    if "image" not in request.files:
        return jsonify({"error": "No image file provided."}), 400

    # Read the image file as a numpy array
    uploaded_file = request.files["image"]
    file_bytes = np.frombuffer(uploaded_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({"error": "Invalid image file."}), 400

    try:
        encoded_image_bytes = process_image(image, brightness, contrast,
											gamma, remove_bg)
    except Exception as e:
        #print("Failed to process image.")
        return jsonify({"error": str(e)}), 500

    # Return the processed image as a downloadable JPEG file
    return send_file(
        io.BytesIO(encoded_image_bytes),
        mimetype="image/jpeg",
        as_attachment=True,
        download_name="processed_image.jpg"
    )
