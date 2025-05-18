from flask import request, send_file, jsonify
import io

from app.utils.response import *

def upload_file_to_storage(container_client):

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


def download_file_from_storage(container_client):

    filename = request.args.get("filename", default="", type=str)
    
    try:
        # Create a blob client for the given filename.
        blob_client = container_client.get_blob_client(blob=filename)
        downloader = blob_client.download_blob()
        
        # Read the Complete blob content into memory.
        file_data = downloader.readall()
        
        return send_file(
            io.BytesIO(file_data),
            mimetype='image/png',
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        print("An error occurred: ", str(e))
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    
