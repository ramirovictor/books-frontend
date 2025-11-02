import { useEffect, useMemo, useState, useRef } from "react";
import { Plus, Pencil, Trash2, RefreshCcw, BookOpen, X, Github } from "lucide-react";
import { Toaster, toast } from "sonner";
import { clsx } from "clsx";
import type { Book } from "./types";
import { listBooks, createBook, updateBook, deleteBook } from "./books.service";

type Mode = "create" | "edit" | null;

/* ========================================
   COMPONENT: Reusable Modal
   ======================================== */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap: auto-focus on first input when opening
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ========================================
   COMPONENT: Confirm Delete Dialog
   ======================================== */
interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteDialog({ isOpen, bookTitle, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <h3 id="confirm-title" className="text-lg font-semibold text-gray-900 mb-2">
            Confirm deletion
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to remove the book <strong>"{bookTitle}"</strong>? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onCancel}
              aria-label="Cancel deletion"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              onClick={onConfirm}
              aria-label="Confirm deletion"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   MAIN COMPONENT: App
   ======================================== */
export default function App() {
  const [data, setData] = useState<Book[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [form, setForm] = useState<Book>({ title: "", author: "", price: 0 });
  const [selected, setSelected] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Load books from API
  const load = async () => {
    setLoading(true);
    try {
      const page = await listBooks(q);
      setData(page.content);
      toast.success("Books loaded successfully");
    } catch (e) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setMode("create");
    setForm({ title: "", author: "", price: 0 });
  };

  const openEdit = (b: Book) => {
    setMode("edit");
    setSelected(b);
    setForm({ ...b });
  };

  const closeModal = () => {
    setMode(null);
    setSelected(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === "edit" && selected?.id) {
        await updateBook(selected.id, form);
        toast.success("Book updated successfully!");
      } else {
        await createBook(form);
        toast.success("Book created successfully!");
      }
      await load();
      closeModal();
    } catch {
      toast.error("Error saving book");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (b: Book) => {
    setBookToDelete(b);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook(bookToDelete.id!);
      toast.success(`Book "${bookToDelete.title}" removed`);
      await load();
    } catch {
      toast.error("Error removing book");
    } finally {
      setBookToDelete(null);
    }
  };

  const cancelDelete = () => {
    setBookToDelete(null);
  };

  const filtered = useMemo(
    () => data.filter((b) => b.title.toLowerCase().includes(q.toLowerCase())),
    [data, q]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Toaster richColors position="top-right" />

      {/* ========================================
          STICKY HEADER WITH VIBRANT COLORS
          ======================================== */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Books</h1>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={openCreate}
            aria-label="Create new book"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </header>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
            placeholder="Search by title..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search books by title"
          />
          <button
            className={clsx(
              "inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400",
              loading && "opacity-60 cursor-not-allowed"
            )}
            onClick={load}
            disabled={loading}
            title="Refresh book list"
            aria-label="Refresh book list"
          >
            <RefreshCcw className={clsx("w-4 h-4", loading && "animate-spin")} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Table - Desktop */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr className="text-left text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((b, i) => (
                  <tr
                    key={b.id}
                    className={clsx(
                      "hover:bg-indigo-50/50 transition-colors",
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    )}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-normal break-words">
                      {b.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700 whitespace-normal break-words">{b.author}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">
                      R$ {b.price?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 whitespace-nowrap"
                          onClick={() => openEdit(b)}
                          aria-label={`Edit book ${b.title}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="text-sm">Edit</span>
                        </button>
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 whitespace-nowrap"
                          onClick={() => handleDeleteClick(b)}
                          aria-label={`Delete book ${b.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td className="px-6 py-12 text-center text-gray-500" colSpan={4}>
                      <div className="flex flex-col items-center gap-2">
                        <BookOpen className="w-12 h-12 text-gray-300" />
                        <p className="text-lg font-medium">No books found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or add a new book</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards - Mobile (< 640px) */}
        <div className="sm:hidden space-y-4">
          {filtered.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Author:</span> {b.author}
              </p>
              <p className="text-gray-900 font-semibold mb-4">
                <span className="font-medium text-gray-600">Price:</span> R$ {b.price?.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-all shadow-sm"
                  onClick={() => openEdit(b)}
                  aria-label={`Edit book ${b.title}`}
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition-all shadow-sm"
                  onClick={() => handleDeleteClick(b)}
                  aria-label={`Delete book ${b.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-900 mb-1">No books found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or add a new book</p>
            </div>
          )}
        </div>
      </main>

      {/* ========================================
          SIMPLE FOOTER
          ======================================== */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
            <p>© 2025 Books API - Full Stack Project</p>
            <a
              href="https://github.com/ramirovictor/books-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              aria-label="Backend repository on GitHub"
            >
              <Github className="w-4 h-4" />
              <span>Backend (Spring Boot)</span>
            </a>
            <a
              href="https://github.com/ramirovictor/books-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              aria-label="Frontend repository on GitHub"
            >
              <Github className="w-4 h-4" />
              <span>Frontend (React + Vite)</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ========================================
          CREATE/EDIT MODAL
          ======================================== */}
      <Modal
        isOpen={mode !== null}
        onClose={closeModal}
        title={mode === "edit" ? "Edit book" : "New book"}
      >
        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-rose-600">*</span>
            </label>
            <input
              id="title"
              ref={firstInputRef}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Clean Code"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1.5">
              Author <span className="text-rose-600">*</span>
            </label>
            <input
              id="author"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="e.g. Robert C. Martin"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
              Price (R$) <span className="text-rose-600">*</span>
            </label>
            <input
              id="price"
              required
              type="number"
              min={0}
              step={0.01}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              placeholder="0.00"
              aria-required="true"
            />
            <p className="mt-1.5 text-xs text-gray-500">Value must be greater than or equal to zero</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={closeModal}
              aria-label="Cancel and close modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={clsx(
                "px-6 py-2.5 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                saving && "opacity-60 cursor-not-allowed"
              )}
              aria-label="Save book"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================
          CONFIRM DELETE DIALOG
          ======================================== */}
      <ConfirmDeleteDialog
        isOpen={bookToDelete !== null}
        bookTitle={bookToDelete?.title || ""}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
