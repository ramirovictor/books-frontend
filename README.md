# Books Frontend - React + Vite + TypeScript

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38bdf8?logo=tailwindcss)

Modern, responsive frontend for a full-stack book management system. Built with React 19, Vite, TypeScript, and Tailwind CSS v4.

**🔗 Backend Repository**: [books-api (Spring Boot)](https://github.com/ramirovictor/books-api)

---

## 📋 Overview

Frontend client for the Books API. A full-stack CRUD application that allows users to:
- View and search books by title
- Create new book entries
- Edit existing books
- Delete books with custom confirmation dialog

Built with React 19, TypeScript, Tailwind CSS v4, and React Router.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1.1 | UI library |
| **Vite** | 7.1.7 | Build tool & dev server |
| **TypeScript** | 5.9.3 | Type safety |
| **Tailwind CSS** | 4.1.16 | Utility-first styling |
| **Axios** | 1.13.1 | HTTP client |
| **lucide-react** | 0.552.0 | Icon library |
| **sonner** | 2.0.7 | Toast notifications |
| **clsx** | 2.1.1 | Conditional class names |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20.19.0 or higher
- **npm** or **yarn**
- **Backend API** running at `https://localhost:8443` ([Setup instructions](https://github.com/ramirovictor/books-api))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ramirovictor/books-frontend.git
cd books-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

---

## ⚠️ Important: SSL Certificate Setup

The backend uses a **self-signed SSL certificate**. Before using the frontend, you must accept the certificate:

1. Start the backend (Spring Boot) on `https://localhost:8443`
2. Open `https://localhost:8443/swagger` in your browser
3. Click **"Advanced"** → **"Proceed to localhost (unsafe)"**
4. Now the frontend will be able to make HTTPS requests

---

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on http://localhost:5173 |
| `npm run build` | Build for production (output: `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run test` | Run unit tests with Vitest (watch mode) |
| `npm run test:run` | Run unit tests once |
| `npm run test:ui` | Run tests with Vitest UI |

---

## 🔗 API Integration

The app consumes the following endpoints from the backend:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/books` | List all books (paginated) |
| `GET` | `/api/v1/books?q=clean` | Search by title |
| `POST` | `/api/v1/books` | Create a new book |
| `PUT` | `/api/v1/books/{id}` | Update a book |
| `DELETE` | `/api/v1/books/{id}` | Delete a book |

**Base URL**: `https://localhost:8443/api/v1`

---

## 📱 Responsive Design

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Card view with stacked buttons |
| Desktop | ≥ 640px | Table view with inline actions |

---

## 📝 License

This project is part of a portfolio and is available under the MIT License.

---

**Made with using React, Vite, TypeScript, and Tailwind CSS**
