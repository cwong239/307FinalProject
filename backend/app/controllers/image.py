from flask import request
import numpy as np
import cv2, os, re
from app.processing.image_processing import process_image
from app.utils.response import HTTPResponse
from app.controllers.azure import upload_bytes_to_storage, download_file_from_storage
from app.extensions import mongo
from app.models.user import *
from app.utils.uuid import compress_uuid

MAX_USER_STORAGE = 20 * 1024 * 1024

def generate_unique_filename(base_filename, uploader_id):
    name, ext = os.path.splitext("".join(base_filename.split()))
    candidate = f"{name}{ext}"
    counter = 1

    while find_image_by_filename(candidate, uploader_id):
        candidate = f"{name}{counter}{ext}"
        counter += 1

    return candidate

def save_image(container_client, uploader_id):
    if "image" not in request.files:
        return HTTPResponse(400).error("No file image selected").send()

    file = request.files["image"]
    if file.filename == "":
        return HTTPResponse(400).error("No file image selected").send()

    if not file.mimetype.startswith("image/"):
        return HTTPResponse(400).error("Uploaded file is not an image").send()

    file.seek(0, 2)  # seek to end
    filesize = file.tell()
    file.seek(0)
    if filesize > MAX_FILESIZE:
        return HTTPResponse(400).error(f"File size exceeds max of {MAX_FILESIZE} bytes").send()

    used_space = get_total_filesize_used(uploader_id)
    if used_space + filesize > MAX_USER_STORAGE:
        return HTTPResponse(400).error("User storage quota exceeded (20 MB max)").send()

    file_bytes = file.read()
    file.seek(0)
    image_array = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    if image is None:
        return HTTPResponse(400).error("Invalid image file.").send()

    encoded_image_bytes_or_response = process_image_controller()
    if not isinstance(encoded_image_bytes_or_response, bytes):
        return encoded_image_bytes_or_response

    encoded_image_bytes = encoded_image_bytes_or_response
    image_name = generate_unique_filename(file.filename, uploader_id)
    processed_filename = f"{compress_uuid(uploader_id)}/{image_name}"

    upload_response = upload_bytes_to_storage(container_client, encoded_image_bytes, processed_filename, image_name)

    insert_image(uploader_id, image_name, len(encoded_image_bytes))

    return upload_response

def process_image_controller():
    brightness = request.form.get("brightness", default=0, type=float)
    contrast = request.form.get("contrast", default=1.0, type=float)
    grayscale = request.form.get("grayscale", default=0, type=int)
    gamma = request.form.get("gamma", default=1.0, type=float)
    opacity = request.form.get("opacity", default=1.0, type=float)
    remove_bg = request.form.get("remove_bg", default=0, type=int)

    if "image" not in request.files:
        return HTTPResponse(400).error("No image file provided.").send()

    uploaded_file = request.files["image"]
    file_bytes = np.frombuffer(uploaded_file.read(), np.uint8)

    if file_bytes.size == 0:
        return HTTPResponse(400).error("Image file is empty.").send()

    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return HTTPResponse(400).error("Invalid image file.").send()

    try:
        encoded_image_bytes = process_image(image, brightness, contrast,
                                            grayscale, gamma, opacity, remove_bg)
    except Exception as e:
        return HTTPResponse(500).error(f"Image processing failed: {str(e)}").send()

    return encoded_image_bytes

def load_image(container_client, requester_id, filename):
    if not filename:
        return HTTPResponse(400).error("No file image selected").send()

    filepath = f"{compress_uuid(requester_id)}/{filename}"

    image_doc = find_image_by_filename(filename, requester_id)

    if not image_doc:
        return HTTPResponse(404).error("Image not found").send()

    if image_doc.get("uploader") != requester_id:
        return HTTPResponse(403).error("Unauthorized to access this image").send()

    return download_file_from_storage(container_client, filepath)

def load_filenames(uploader_id):
    images = find_images_by_uploader(uploader_id)
    return [img for img in images]

def remove_image(container_client, uploader_id, filename):
    image_doc = find_image_by_filename(filename, uploader_id)

    if not image_doc:
        return HTTPResponse(404).error("Image not found").send()

    if image_doc.get("uploader") != uploader_id:
        return HTTPResponse(403).error("Unauthorized to delete this image").send()

    filepath = f"{compress_uuid(uploader_id)}/{filename}"
    try:
        container_client.delete_blob(filepath)
    except Exception as e:
        return HTTPResponse(500).error(f"Failed to delete file from storage: {str(e)}").send()


    try:
        delete_image(filename, uploader_id)

    except Exception as e:
        return HTTPResponse(500).error("Failed to delete image record from database").send()

    return HTTPResponse(204).send()
