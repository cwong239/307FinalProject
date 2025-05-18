from flask import Blueprint, current_app, jsonify
from ..controllers.azure import *

azure_bp = Blueprint("azure_bp", __name__)

@azure_bp.route("/media", methods=["POST"])
def azure_route():

	# Retrieve the container client from the app’s config
    container_client = current_app.config.get("AZURE_CONTAINER_CLIENT")
    if not container_client:
        return jsonify({"error": "Azure Blob Storage not configured."}), 500

    return azure_controller(container_client)
