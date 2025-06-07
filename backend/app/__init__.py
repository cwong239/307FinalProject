from flask import Flask
from .config import Config
from .extensions import mongo, jwt, cors
from .routes.auth import auth_bp
from .routes.user import user_bp
from .extensions import cors
from flask_cors import CORS
from .extensions import azure
import os
from azure.storage.blob import BlobServiceClient
from .routes.image import image_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    cors.init_app(app)
    CORS(app, resources={r"/*": {"origins": "https://ambitious-dune-0f7fde21e.6.azurestaticapps.net"}}, supports_credentials=True)
    try:
        mongo.init_app(app)
        print("Mongo initialized successfully!")
    except Exception as e:
        print("Error initializing mongo:", e)

    print("Mongo object after init:", mongo)
    print("Mongo DB object:", mongo.db)

    ######################################################
    #Azure initialization.

    # Get connection details from environment variables
    AZURE_CONNECTION_STRING = os.environ.get("AZURE_CONNECTION_STRING")
    CONTAINER_NAME = os.environ.get("AZURE_CONTAINER_NAME", "images")

    try:
        # Initialize the BlobServiceClient
        blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
        print("Connected to Azure Blob Storage.")
    except Exception as e:
        print("Failed to connect to Azure Blob Storage:", e)
        blob_service_client = None

    container_client = None
    if blob_service_client:
        container_client = blob_service_client.get_container_client(CONTAINER_NAME)
        try:
            # Try creating the container (if it doesn't exist)
            container_client.create_container()
        except Exception:
            # Assume container already exists if error is thrown
            pass

    # Store the container client in the app config for later use
    app.config["AZURE_CONTAINER_CLIENT"] = container_client

    print(f"Port env {os.environ.get('PORT')}")

    ######################################################

    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp)
    app.register_blueprint(image_bp)

    return app
