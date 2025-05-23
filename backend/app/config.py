import os
from dotenv import load_dotenv

load_dotenv()

class Config:
  MONGO_URI = os.getenv("MONGO_URI")
  JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
  AZURE_CONNECTION_STRING = os.getenv("AZURE_CONNECTION_STRING")
  CONTAINER_NAME = os.getenv("AZURE_CONTAINER_NAME")

  DEBUG = True

