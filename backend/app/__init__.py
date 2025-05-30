from flask import Flask
from .config import Config
from .extensions import mongo, jwt
from .routes.auth import auth_bp
from .routes.user import user_bp
from .extensions import cors

from .routes.image import image_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    cors.init_app(app)

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

    app.register_blueprint(image_bp)

    return app
