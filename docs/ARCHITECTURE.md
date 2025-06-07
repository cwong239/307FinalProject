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

## 🚀 Frontend Frameworks & Libraries

This project uses a modern React-based frontend powered by Vite, with support for routing, animations, HTTP requests, and automated tooling for development and testing.

### ⚛️ Core Framework
- **React** – UI library for building interactive interfaces (`react`, `react-dom`)

### 🧭 Routing
- **react-router-dom** – Client-side routing for seamless single-page navigation

### 🌐 HTTP Requests
- **axios** – Simplified HTTP client for communicating with backend APIs

### 🧩 Animations
- **framer-motion** – Powerful library for animations and transitions in React

### 👀 Utility
- **react-intersection-observer** – Hook for detecting when components enter the viewport (e.g., for scroll animations)

## 🛠️ Development Tools

### ⚡ Build Tool
- **Vite** – Lightning-fast development server and build tool

### 🧹 Code Quality
- **Prettier** – Automatic code formatter for consistent styling
- **ESLint** – Linter for detecting code issues and enforcing best practices
  - Plugins: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-cypress`

### ✅ Testing
- **Cypress** – End-to-end testing framework for verifying UI functionality

## 🔗 Relationships

### 🔁 General requests
UI/UX ⇄ Client ⇄ Backend API

### ⬆️ Upload image
Client → Backend API → Image Processing → [Azure Blob Storage, MongoDB]

### ⬇️ Get image
Client → Backend API ⇄ MongoDB ⇄ Azure Blob Storage

### 📐 MVC Model Diagram
This project follows the **MVC (Model-View-Controller)** design pattern to separate concerns:
![Screenshot 2025-06-06 205222](https://github.com/user-attachments/assets/ef161b0a-5603-4788-86e2-c93cd4aac21c)

### 📐 UML Class Diagram 
The UML class diagram for this project can be found [here](/docs/DATAMODEL.md)

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
