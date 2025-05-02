from flask import Blueprint, request, jsonify
from app.controllers.auth import register_user, login_user
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint('user', __name__)

@user_bp.route('/<user_id>', methods=['DELETE'])
@jwt_required()
def delete(user_id):
    return True

@user_bp.route('', methods=['GET'])
@jwt_required()
def test():
    return get_jwt_identity()
