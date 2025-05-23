from flask import send_file, jsonify
from app.utils.response import HTTPResponse
import io

def upload_bytes_to_storage(container_client, encoded_image_bytes, filename, image_name):
    try:
        blob_client = container_client.get_blob_client(blob=filename)
        image_stream = io.BytesIO(encoded_image_bytes)
        blob_client.upload_blob(image_stream, overwrite=True)
        return HTTPResponse(200).data({"filename": image_name}).send()
    except Exception as e:
        return HTTPResponse(500).error(f"An error occurred during upload: {str(e)}").send()


def download_file_from_storage(container_client, filename):
    try:
        blob_client = container_client.get_blob_client(blob=filename)
        downloader = blob_client.download_blob()
        file_data = downloader.readall()

        return send_file(
            io.BytesIO(file_data),
            mimetype='image/png',
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        return HTTPResponse(500).error(f"An error occurred during download: {str(e)}").send()
