from flask import request, send_file, jsonify
import numpy as np
import io
import cv2
from app.processing.image_processing import process_image

from app.utils.response import *

def process_image_controller():

    #print("process_image_controller() called.")

    # Retrieve brightness and contrast from query parameters
    brightness = request.args.get("brightness", default=0, type=float)
    contrast = request.args.get("contrast", default=1.0, type=float)
    gamma = request.args.get("gamma", default=1.0, type=float)
    opacity = request.args.get("opacity", default=1.0, type=float)
    remove_bg = request.args.get("remove_bg", default=0, type=int)

    # Check if an image file is provided
    if "image" not in request.files:
        #return jsonify({"error": "No image file provided."}), 400
        return HTTPResponse(400).error("No image file provided.").send()

    # Read the image file as a numpy array
    uploaded_file = request.files["image"]
    file_bytes = np.frombuffer(uploaded_file.read(), np.uint8)
    
    file_size = uploaded_file.content_length
    #print("File size: ")
    #print(file_size)
    
    if file_size <= 0:
	    return HTTPResponse(400).error("Invalid image file.").send()
    
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        #return jsonify({"error": "Invalid image file."}), 400
        return HTTPResponse(400).error("Invalid image file.").send()

    try:
        encoded_image_bytes = process_image(image, brightness, contrast,
											gamma, opacity, remove_bg)
    except Exception as e:
        #print("Failed to process image.")
        #return jsonify({"error": str(e)}), 500
        return HTTPResponse(500).error(str(e)).send()

    # Return the processed image as a downloadable JPEG file
    return send_file(
        io.BytesIO(encoded_image_bytes),
        mimetype="image/png",
        as_attachment=True,
        download_name="processed_image.png"
    )
