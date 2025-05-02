import uuid
from bson import Binary

def generate_uuid():
    return uuid.uuid4()

def to_bson(uuid_obj):
    return Binary.from_uuid(uuid_obj)

def from_bson(bson_binary):
    return uuid.UUID(bytes=bson_binary)

def as_str(uuid_obj):
    return str(uuid_obj)
