from flask import Blueprint, request, jsonify, current_app
from app.controllers.user import purge_images
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

@user_bp.route('/images', methods=['DELETE'])
@jwt_required()
def delete():
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return jsonify({"error": "Azure Blob Storage not configured."}), 500

    return purge_images(container_client, get_jwt_identity())
#
# @user_bp.route('', methods=['GET'])
# @jwt_required()
# def test():
#     print(get_jwt_identity())
#     return get_jwt_identity()
