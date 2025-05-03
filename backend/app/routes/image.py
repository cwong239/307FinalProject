from flask import Blueprint
from ..controllers.image import process_image_controller

image_bp = Blueprint('image_bp', __name__)

@image_bp.route("/image", methods=["POST"])
def image_route():

    return process_image_controller()
