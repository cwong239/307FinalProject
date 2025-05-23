from flask import Blueprint, current_app, jsonify, request
from ..controllers.image import save_image, load_image, load_filenames, remove_image
from flask_jwt_extended import jwt_required, get_jwt_identity

image_bp = Blueprint('image_bp', __name__)

@image_bp.route("/image", methods=["POST"])
@jwt_required()
def upload_image():
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return jsonify({"error": "Azure Blob Storage not configured."}), 500
    return save_image(container_client, get_jwt_identity())


@image_bp.route("/image/<filename>", methods=["GET"])
@jwt_required()
def download_image(filename):
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return jsonify({"error": "Azure Blob Storage not configured."}), 500

    return load_image(container_client, get_jwt_identity(), filename)

@image_bp.route("/image", methods=["GET"])
@jwt_required()
def get_filenames():
    return load_filenames(get_jwt_identity())


@image_bp.route("/image/<filename>", methods=["DELETE"])
@jwt_required()
def delete_image(filename):
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return jsonify({"error": "Azure Blob Storage not configured."}), 500

    return remove_image(container_client, get_jwt_identity(), filename)
