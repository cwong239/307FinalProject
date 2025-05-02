from app.extensions import mongo

def find_user_by_username(name):
    return mongo.db.users.find_one({"username": name})

def insert_user(id, username, password):
    return mongo.db.users.insert_one({
        "_id": id,
        "username": username,
        "password": password
    })
