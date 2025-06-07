# 📋 Contributing Documentation

## 🔧 Version Control

- We use **Git** to manage our project and follow a structured branching strategy:
  - **`main`** – Production branch; all changes require code review before merging. Only complete and functional versions of dev, or emergency production fixes, are pushed to main.
  - **`dev`** – Development branch; changes are reviewed before merging. All commits are pulled from other branches, like *frontend* or a specific feature branch.
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
- [React Router DOM](https://reactrouter.com/) – Client-side routing for React applications.
- [Axios](https://axios-http.com/) – Promise-based HTTP client for making API requests.
- [Framer Motion](https://www.framer.com/motion/) – Animation library for React components.
- [React Intersection Observer](https://www.npmjs.com/package/react-intersection-observer) – React hook for observing when elements enter the viewport.
- [Vite](https://vitejs.dev/) – Fast frontend build tool and development server.
- [Cypress](https://www.cypress.io/) – End-to-end testing framework for web applications.

### ⚙️ Backend
- Python (see `requirements.txt` for full list)
  - Flask – Web framework for the backend API.
  - Flask-JWT-Extended – For JWT-based authentication.
  - Flask-CORS – For handling cross-origin requests.
  - pymongo – For connecting to MongoDB.
  - python-dotenv – For environment variable management.
  - OpenCV - Image Processing Library

The full list of Python dependencies can be found in [`requirements.txt`](../backend/requirements.txt)

**© 2025 [FotoMagic](https://ambitious-dune-0f7fde21e.6.azurestaticapps.net/). All rights reserved.**
