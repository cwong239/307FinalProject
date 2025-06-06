# Architecture Documentation

## 📚 API Documentation

Full REST API documentation is available [here](../backend/app/API-Docs.md).

## 🧱 Tech Stack

### Frontend
- **UI/UX**: React, HTML, CSS
- **Client Logic**: React

### Backend
- **API**: Python 3 with Flask
- **Image Processing**: OpenCV
- **Database**: MongoDB
- **File Storage**: Azure Blob Storage

## 🔗 Relationships

### General requests
UI/UX ⇄ Client ⇄ Backend API

### Upload image
Client → Backend API → Image Processing → [Azure Blob Storage, MongoDB]

### Get image
Client → Backend API ⇄ MongoDB ⇄ Azure Blob Storage

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
