from flask import request, send_file, jsonify

from app.utils.response import *

def azure_controller(container_client):

    # Check if the POST request has the file part named "image"
    if "image" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files["image"]

    # Verify that the file has a valid filename
    if file.filename == "":
        return jsonify({"error": "No file selected for uploading"}), 400
    
    try:
        # Create a blob client with the file's original name
        blob_client = container_client.get_blob_client(blob=file.filename)
        # Upload the file; overwrite if the blob already exists
        blob_client.upload_blob(file, overwrite=True)
        return jsonify({"message": "File uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
