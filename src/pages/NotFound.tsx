import { Link } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white via-indigo-50/30 to-indigo-100/50 grid place-items-center px-4">
      {/* Premium radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_top,rgba(99,102,241,0.15),transparent)]" />

      <div className="relative text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-indigo-50 border border-indigo-100">
            <BookOpen className="w-16 h-16 text-indigo-400" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl sm:text-9xl font-bold text-gray-200 mb-2">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">Page not found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all active:scale-[.98] shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Home className="w-4 h-4" />
            Back to Books
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            About this project
          </Link>
        </div>
      </div>
    </div>
  );
}
