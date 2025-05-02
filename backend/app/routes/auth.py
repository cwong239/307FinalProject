from flask import Blueprint, request, jsonify
from app.controllers.auth import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    return register_user(data)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    return login_user(data)
