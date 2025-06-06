# 📋 Contributing Documentation

## 🔧 Version Control

- We use **Git** to manage our project and follow a structured branching strategy:
  - **`main`** – Production branch; all changes require code review before merging.
  - **`dev`** – Backend development branch; changes are also reviewed before merging.
  - **`frontend`** – Frontend development branch; uses a **rebasing strategy**.

## 🎨 Code Style

- We follow the default styling conventions of our chosen languages.
- **Prettier** and **ESLint** are used in the frontend to enforce consistent code formatting.

### ▶️ Running Style Checks (Frontend)

- Format code with Prettier:
  ```npm run format```
- Format code with Lint:
  ```npm run lint```

## 📦 Libraries & Dependencies

### 🖥️ Frontend
- [React.js](https://reactjs.org/) – JavaScript library for building user interfaces.
- [Prettier](https://prettier.io/) – Code formatter.
- [ESLint](https://eslint.org/) – Linting utility for JavaScript and JSX.

### ⚙️ Backend
- Python (see `requirements.txt` for full list)
  - Flask – Web framework for the backend API.
  - Flask-JWT-Extended – For JWT-based authentication.
  - Flask-CORS – For handling cross-origin requests.
  - pymongo – For connecting to MongoDB.
  - python-dotenv – For environment variable management.

The full list of Python dependencies can be found in [`requirements.txt`](../backend/requirements.txt)

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
