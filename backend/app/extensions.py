from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from azure.storage.blob import BlobServiceClient

mongo = PyMongo()
jwt = JWTManager()
cors = CORS()

azure = BlobServiceClient
