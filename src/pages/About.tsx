import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Github, ArrowLeft, Palette } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white via-indigo-50/30 to-indigo-100/50">
      {/* Premium radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_top,rgba(99,102,241,0.15),transparent)]" />

      {/* Header */}
      <header className="relative z-20 sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Books</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Books
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-indigo-600 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>

        {/* Hero section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            About this project
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            A modern full-stack CRUD application built with Spring Boot and React, featuring HTTPS,
            H2 database, Swagger documentation, and a premium UI design.
          </p>
        </div>

        {/* Tech stack cards */}
        <div className="grid gap-6 sm:grid-cols-2 mb-8">
          <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.06)] border border-gray-200 p-6 hover:shadow-[0_20px_40px_rgba(0,0,0,.1)] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-indigo-50">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Frontend Stack</h2>
            </div>
            <ul className="space-y-2.5 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>React 19 + TypeScript</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>Vite 7 (build tool)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>Tailwind CSS v4</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>React Router v6</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>Axios, Lucide Icons, Sonner</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.06)] border border-gray-200 p-6 hover:shadow-[0_20px_40px_rgba(0,0,0,.1)] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-50">
                <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.8537 1.4158a.7502.7502 0 0 0-.8384-.1092L.7753 12.7575a.7502.7502 0 0 0 .1487 1.4009l7.1946 2.3932 2.3938 7.1949a.7502.7502 0 0 0 .7192.5106.7502.7502 0 0 0 .6821-.4003L22.2516 2.5166a.7502.7502 0 0 0-.3979-1.1008zm-2.1097 2.3612-8.0534 8.0535-6.0913-2.025 14.1447-6.0285zm-9.0862 8.9837 8.0534-8.0535-6.0285 14.1447-2.025-6.0912z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Backend Stack</h2>
            </div>
            <ul className="space-y-2.5 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Spring Boot 3.x</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>H2 Database (PostgreSQL mode)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Spring Data JPA</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Swagger/OpenAPI 3.0</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>HTTPS (self-signed cert)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Playground section */}
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.06)] border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-50">
              <Palette className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Playground: Color Picker</h2>
              <p className="text-sm text-gray-600">Demonstrating localStorage and state management</p>
            </div>
          </div>
          <ColorDemo />
        </div>

        {/* GitHub links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://github.com/ramirovictor/books-api"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.06)] border border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,.1)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
              <div>
                <p className="font-medium text-gray-900">Backend Repository</p>
                <p className="text-sm text-gray-600">Spring Boot API</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="https://github.com/ramirovictor/books-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,.06)] border border-gray-200 hover:shadow-[0_20px_40px_rgba(0,0,0,.1)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
              <div>
                <p className="font-medium text-gray-900">Frontend Repository</p>
                <p className="text-sm text-gray-600">React + Vite</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-sm text-gray-600">© 2025 Books API - Full Stack Project</p>
        </div>
      </footer>
    </div>
  );
}

/* ========================================
   COLOR DEMO COMPONENT (localStorage)
   ======================================== */
function ColorDemo() {
  const [color, setColor] = useState(() => {
    const saved = localStorage.getItem("favColor");
    return saved ?? "#6366f1";
  });

  useEffect(() => {
    localStorage.setItem("favColor", color);
  }, [color]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-12 w-20 rounded-lg border-2 border-gray-200 cursor-pointer"
        />
        <div
          className="h-12 w-12 rounded-lg border-2 border-gray-200 shadow-sm transition-all"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 mb-1">
          Selected color: <span className="font-mono text-indigo-600">{color}</span>
        </p>
        <p className="text-xs text-gray-500">
          Your choice is persisted in localStorage and will be remembered on your next visit
        </p>
      </div>
    </div>
  );
}
