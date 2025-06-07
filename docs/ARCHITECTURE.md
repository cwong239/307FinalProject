# 🏛️ Architecture Documentation

## 📚 API Documentation

Full REST API documentation is available [here](../backend/app/API-Docs.md).

## 🧱 Tech Stack

### 🖥️ Frontend
- **🎨 UI/UX**: React, HTML, CSS
- **⚛️ Client Logic**: React

### ⚙️ Backend
- **🐍 API**: Python 3 with Flask
- **🖼️ Image Processing**: OpenCV
- **🗄️ Database**: MongoDB
- **☁️ File Storage**: Azure Blob Storage

## 🔗 Relationships

### 🔁 General requests
UI/UX ⇄ Client ⇄ Backend API

### ⬆️ Upload image
Client → Backend API → Image Processing → [Azure Blob Storage, MongoDB]

### ⬇️ Get image
Client → Backend API ⇄ MongoDB ⇄ Azure Blob Storage

![Screenshot 2025-06-06 205222](https://github.com/user-attachments/assets/ef161b0a-5603-4788-86e2-c93cd4aac21c)


**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
