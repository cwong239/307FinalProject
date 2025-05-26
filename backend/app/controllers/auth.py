from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import find_user_by_username, insert_user
from app.utils.token import create_token
from app.utils.uuid import generate_uuid, to_bson, from_bson
from app.utils.response import HTTPResponse


def register_user(data):
    if not data['username'] or not data['password'] or len(data['username']) < 3 or len(data['password']) < 3:
        return HTTPResponse(400).message("Must include a username and passoword of at least 3 characters").send()

    if find_user_by_username(data['username']):
        return HTTPResponse(409).message("A user with that name already exists").send()


    hashed_pw = generate_password_hash(data['password'])
    uuid = generate_uuid()

    insert_user(to_bson(uuid), data['username'], hashed_pw)

    token = create_token(uuid)

    return HTTPResponse(201).data({ "token" : token }).send()



def login_user(data):
    if not data['username'] or not data['password'] or len(data['username']) <= 3 or len(data['password']) <= 3:
        return HTTPResponse(400).message("Must include a username and passoword of at least 3 characters").send()

    user = find_user_by_username(data['username'])

    if not user or not check_password_hash(user['password'], data['password']):
        return HTTPResponse(401).message("Invalid credentials").send()


    token = create_token(from_bson(user['_id']))

    return jsonify({
        "token": token
    }), 200
