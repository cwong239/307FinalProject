from flask import request
from app.utils.response import HTTPResponse
from app.controllers.image import remove_image
from app.models.user import *
from app.utils.uuid import to_bson

def purge_images(container_client, uploader_id):
    images = find_images_by_uploader(uploader_id)

    for image in images:
        _, status_code = remove_image(container_client, uploader_id, image["filename"])
        if status_code != 204:
            return HTTPResponse(500).error("Failed to delete some images").send()

    return HTTPResponse(204).send()

def purge_account(container_client, account_id):
    images = find_images_by_uploader(account_id)

    for image in images:
        _, status_code = remove_image(container_client, account_id, image["filename"])
        if status_code != 204:
            return HTTPResponse(500).error("Failed to delete some images. Account not deleted").send()

    if delete_account(to_bson(account_id)):
        return HTTPResponse(204).send()
    return HTTPResponse(500).send()
