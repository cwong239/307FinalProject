from flask_jwt_extended import create_access_token

def create_token(identity):
  return create_access_token(identity=identity)
