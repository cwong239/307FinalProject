from app.extensions import mongo
from time import time
MAX_FILESIZE = 5 * 1024 * 1024

def find_user_by_username(name):
    return mongo.db.users.find_one({"username": name})

def insert_user(id, username, password):
    return mongo.db.users.insert_one({
        "_id": id,
        "username": username,
        "password": password
    })

def insert_image(uploader_id, image_name, filesize):
    if filesize > MAX_FILESIZE:
        raise ValueError(f"File size exceeds the maximum allowed {MAX_FILESIZE} bytes")
    return mongo.db.images.insert_one({
        "uploader": uploader_id,
        "filename": image_name,
        "filesize": filesize,
        "time": time()
    })

def find_images_by_uploader(uploader_id):
    return list(mongo.db.images.find({"uploader": uploader_id}))

def find_image_by_filename(filename, uploader_id):
    print(filename)
    return mongo.db.images.find_one({"filename": filename, "uploader": uploader_id})

def delete_image(filename, uploader_id):
    result = mongo.db.images.delete_one({"filename": filename, "uploader": uploader_id})
    return result.deleted_count > 0

def delete_account(user_id):
    result = mongo.db.users.delete_one({"_id": user_id})
    return result.deleted_count > 0

def get_total_filesize_used(uploader_id):
    pipeline = [
        {"$match": {"uploader": uploader_id}},
        {"$group": {"_id": None, "totalSize": {"$sum": "$filesize"}}}
    ]
    result = list(mongo.db.images.aggregate(pipeline))
    if not result:
        return 0
    return result[0]["totalSize"]
