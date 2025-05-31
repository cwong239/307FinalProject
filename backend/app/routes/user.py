from flask import Blueprint, request, jsonify, current_app
from app.controllers.user import purge_images, purge_account
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

@user_bp.route('/image', methods=['DELETE'])
@jwt_required()
def delete_image():
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return HTTPResponse(500).error("Azure Blob Storage not configured").send()

    return purge_images(container_client, get_jwt_identity())

@user_bp.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_account():
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return HTTPResponse(500).error("Azure Blob Storage not configured").send()
    return purge_account(container_client, get_jwt_identity())
