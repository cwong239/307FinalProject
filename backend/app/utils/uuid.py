import uuid, base64
from bson import Binary

def generate_uuid():
    return uuid.uuid4()

def to_bson(uuid_obj):
    if isinstance(uuid_obj, str):
        uuid_obj = uuid.UUID(uuid_obj)
    return Binary.from_uuid(uuid_obj)

def from_bson(bson_binary):
    return uuid.UUID(bytes=bson_binary)

def as_str(uuid_obj):
    return str(uuid_obj)

def compress_uuid(uuid_obj):
    if isinstance(uuid_obj, str):
        uuid_obj = uuid.UUID(uuid_obj)
    return base64.urlsafe_b64encode(uuid_obj.bytes).decode('utf-8').rstrip('=')
