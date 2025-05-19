from flask import Flask
from .config import Config
from .extensions import mongo, jwt
from .routes.auth import auth_bp
from .routes.user import user_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Apply CORS only to /auth/*
    CORS(app, resources={r"/auth/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    try:
        mongo.init_app(app)
        print("Mongo initialized successfully!")
    except Exception as e:
        print("Error initializing mongo:", e)

    print("Mongo object after init:", mongo)
    print("Mongo DB object:", mongo.db)

    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')

    return app
