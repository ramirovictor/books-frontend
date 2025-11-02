# Books Frontend - React + Vite + TypeScript

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38bdf8?logo=tailwindcss)

Modern, responsive frontend for a full-stack book management system. Built with React 19, Vite, TypeScript, and Tailwind CSS v4.

**🔗 Backend Repository**: [books-api (Spring Boot)](https://github.com/ramirovictor/books-api)

---

## 📋 Overview

This is the frontend client for the Books API, a CRUD application that allows users to:
- View a paginated list of books
- Search books by title (real-time filtering)
- Create new book entries
- Edit existing books
- Delete books with custom confirmation dialog

The UI features a modern design with vibrant colors, smooth animations, full accessibility support, and responsive layouts for both desktop and mobile devices.

---

## ✨ Features

### Core Functionality
- ✅ **Full CRUD operations** (Create, Read, Update, Delete)
- 🔍 **Real-time search** by book title
- 🔄 **Refresh button** with loading state
- 📱 **Responsive design** (desktop table view, mobile card view)
- 🎨 **Vibrant color palette** (Indigo, Amber, Rose)

### UX Enhancements
- 🎯 **Custom confirmation dialog** (no native browser alerts)
- 🍞 **Toast notifications** for all actions (success/error)
- ⌨️ **Keyboard navigation** (Tab, Escape to close modals)
- ♿ **WCAG accessibility** (ARIA labels, focus management, semantic HTML)
- 🎭 **Smooth animations** (modal fade-in, button hover effects)
- 🎪 **Focus trap** in modals (auto-focus on first input)

### UI Components
- **Sticky Header** with gradient icon and "New" button
- **Search Bar** with real-time filtering
- **Data Table** (desktop) with zebra striping and hover effects
- **Card Layout** (mobile < 640px)
- **Reusable Modal** component
- **Custom Delete Confirmation** dialog
- **Simple Footer** with GitHub links

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

## 📁 Project Structure

```
books-frontend/
├── src/
│   ├── main.tsx              # App entry point
│   ├── App.tsx               # Main component with CRUD logic
│   ├── types.ts              # TypeScript interfaces (Book, Page<T>)
│   ├── config.ts             # API base URL
│   ├── api.ts                # Axios instance
│   ├── books.service.ts      # API methods (listBooks, createBook, etc.)
│   └── index.css             # Tailwind imports
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.cjs
└── README.md
```

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

3. **Configure API endpoint** (already set in `src/config.ts`)
```typescript
export const API_BASE = "https://localhost:8443/api/v1";
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open in browser**
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

---

## 🎨 Design System

### Color Palette
The app uses a consistent, portfolio-ready color scheme:

| Color | Tailwind Class | Usage |
|-------|---------------|-------|
| **Primary (Indigo)** | `bg-indigo-600` | "New" button, "Save" button, focus rings |
| **Secondary (Amber)** | `bg-amber-500` | "Edit" button |
| **Danger (Rose)** | `bg-rose-600` | "Delete" button |
| **Neutral (Gray)** | `bg-gray-50` | Backgrounds, borders |

### Typography
- **Font**: System font stack (Inter-like)
- **Headings**: `font-bold` / `font-semibold`
- **Body**: `font-medium` / `font-normal`

### Spacing
- **Padding**: `px-4`, `py-2`, `px-6`, `py-4`
- **Gaps**: `gap-2`, `gap-3`
- **Rounded corners**: `rounded-xl` (12px), `rounded-2xl` (20px)

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Card view, stacked buttons, vertical footer |
| Desktop | ≥ 640px | Table view, inline buttons, horizontal footer |

---

## ♿ Accessibility Features

- ✅ **Semantic HTML** (`<header>`, `<main>`, `<footer>`, `<table>`)
- ✅ **ARIA labels** on all interactive elements
- ✅ **Keyboard navigation** (Tab, Shift+Tab, Escape)
- ✅ **Focus management** (auto-focus on modal open)
- ✅ **Focus rings** visible on all buttons/inputs
- ✅ **Screen reader support** (`role="dialog"`, `aria-modal="true"`)
- ✅ **Color contrast** WCAG AA compliant

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

## 📸 Screenshots

### Desktop View
- Clean table layout with zebra striping
- Hover effects on rows
- Color-coded action buttons

### Mobile View
- Stacked cards with all book information
- Touch-friendly buttons
- Responsive search bar

*(Add screenshots here after deployment)*

---

## 🐛 Known Issues

1. **SSL Certificate Warning**: First-time users must manually accept the self-signed certificate (see [SSL Setup](#⚠️-important-ssl-certificate-setup))
2. **Toast on Load**: Currently shows "Books loaded successfully" on every page load (can be removed if desired)

---

## 🚧 Future Enhancements

- [ ] Pagination controls (currently client-side filtering only)
- [ ] Sorting by column (title, author, price)
- [ ] Book cover images
- [ ] Dark mode toggle
- [ ] Export to CSV/PDF
- [ ] Batch operations (select multiple books)
- [ ] Advanced filters (by author, price range)

---

## 📝 License

This project is part of a portfolio and is available under the MIT License.

---

## 👤 Author

**Victor Ramiro**
- GitHub: [@ramirovictor](https://github.com/ramirovictor)
- Backend: [books-api](https://github.com/ramirovictor/books-api)
- Frontend: [books-frontend](https://github.com/ramirovictor/books-frontend)

---

## 🙏 Acknowledgments

- **Spring Boot** team for the amazing backend framework
- **Vercel** for Vite and React tooling
- **Tailwind Labs** for Tailwind CSS
- **Lucide Icons** for the beautiful icon set

---

## 📞 Support

If you encounter any issues:
1. Check that the backend is running on `https://localhost:8443`
2. Verify you've accepted the SSL certificate
3. Check browser console for errors
4. Open an issue on GitHub

---

**Made with ❤️ using React, Vite, TypeScript, and Tailwind CSS**
