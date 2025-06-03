# API Documentation

## Authentication

---

### `POST /auth/login`

**Description:** Log in to an existing account.

**Request Body (JSON):**
```json
{
  "username": "<string>", // required
  "password": "<string>"  // required
}
```

**Responses:**
- `200 OK` – Returns **auth token** in response body.
- `400 Bad Request` – Malformed or missing username/password.
- `401 Unauthorized` – Invalid credentials.

---

### `POST /auth/register`

**Description:** Register a new account.

**Request Body (JSON):**
```json
{
  "username": "<string>", // required
  "password": "<string>"  // required
}
```

**Responses:**
- `201 Created` – Returns **auth token** in response body.
- `400 Bad Request` – Malformed or missing username/password.
- `409 Conflict` – Username already exists.

---

## Image Operations

---

### `POST /image`

**Description:** Upload and process an image.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Form Data):**
- `image` (file, **required**)
- `brightness` (number, optional)
- `contrast` (number, optional)
- `opacity` (number, optional)
- `grayscale` (boolean, optional)
- `gamma` (number, optional)
- `remove_bg` (boolean, optional)

**Responses:**
- `201 Created` – Image processed, returns file reference.
- `400 Bad Request` – Malformed or missing data.
- `401 Unauthorized` – Token not present.
- `403 Forbidden` – User quota exceeded.

---

### `GET /image/<file_reference>`

**Description:** Retrieve an uploaded image.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** None

**Responses:**
- `200 OK` – Returns image content.
- `400 Bad Request` – Missing or invalid filename.
- `401 Unauthorized` – Token not present.
- `403 Forbidden` – User not authorized for this image (should not occur).
- `404 Not Found` – Image not found.

---

### `DELETE /image/<file_reference>`

**Description:** Delete a specific uploaded image.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** None

**Responses:**
- `204 No Content` – Successful deletion.
- `400 Bad Request` – Missing or invalid filename.
- `401 Unauthorized` – Invalid token.
- `403 Forbidden` – User forbidden (should not occur).
- `404 Not Found` – Image not found.

---

### `GET /image`

**Description:** List all uploaded image references.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** None

**Responses:**
- `200 OK` – Returns list of all filenames.
- `401 Unauthorized` – Invalid or missing token.

---

### `DELETE /image`

**Description:** Purge all uploaded images.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** None

**Responses:**
- `204 No Content` – All images deleted.
- `401 Unauthorized` – Invalid token.

---

## Account Deletion

---

### `DELETE /delete`

**Description:** Permanently delete the account and all associated data.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** None

**Responses:**
- `204 No Content` – Account and data deleted.
- `401 Unauthorized` – Invalid token.
