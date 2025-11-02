import { useEffect, useMemo, useState, useRef } from "react";
import { Plus, Pencil, Trash2, RefreshCcw, BookOpen, X, Github } from "lucide-react";
import { Toaster, toast } from "sonner";
import { clsx } from "clsx";
import type { Book } from "./types";
import { listBooks, createBook, updateBook, deleteBook } from "./books.service";

type Mode = "create" | "edit" | null;

/* ========================================
   COMPONENTE: Modal Reutilizável
   ======================================== */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap: foca no primeiro input ao abrir
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Fecha modal ao pressionar Escape
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
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-5">
          {/* Injeta o ref no primeiro input do children */}
          {typeof children === "object" && "type" in children && children.type === "form"
            ? (children as React.ReactElement<{ firstInputRef?: React.RefObject<HTMLInputElement> }>)
            : children}
        </div>
      </div>
    </div>
  );
}

/* ========================================
   COMPONENTE: Modal de Confirmação de Exclusão
   ======================================== */
interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteDialog({ isOpen, bookTitle, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
  // Fecha ao pressionar Escape
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
            Confirmar exclusão
          </h3>
          <p className="text-gray-600 mb-6">
            Tem certeza que deseja remover o livro <strong>"{bookTitle}"</strong>? Esta ação não pode ser desfeita.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onCancel}
              aria-label="Cancelar exclusão"
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              onClick={onConfirm}
              aria-label="Confirmar exclusão"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   COMPONENTE PRINCIPAL: App
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

  // Carrega os livros da API
  const load = async () => {
    setLoading(true);
    try {
      const page = await listBooks(q);
      setData(page.content);
      toast.success("Livros carregados com sucesso");
    } catch (e) {
      toast.error("Falha ao carregar livros");
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
        toast.success("Livro atualizado com sucesso!");
      } else {
        await createBook(form);
        toast.success("Livro criado com sucesso!");
      }
      await load();
      closeModal();
    } catch {
      toast.error("Erro ao salvar livro");
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
      toast.success(`Livro "${bookToDelete.title}" removido`);
      await load();
    } catch {
      toast.error("Erro ao remover livro");
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
          HEADER STICKY COM CORES VIBRANTES
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
            aria-label="Criar novo livro"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo</span>
          </button>
        </div>
      </header>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-400"
            placeholder="Buscar por título..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Campo de busca por título"
          />
          <button
            className={clsx(
              "inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400",
              loading && "opacity-60 cursor-not-allowed"
            )}
            onClick={load}
            disabled={loading}
            title="Atualizar lista de livros"
            aria-label="Atualizar lista de livros"
          >
            <RefreshCcw className={clsx("w-4 h-4", loading && "animate-spin")} />
            <span>Atualizar</span>
          </button>
        </div>

        {/* Tabela - Desktop */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr className="text-left text-gray-700 font-semibold">
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Título</th>
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-4 text-sm uppercase tracking-wider">Ações</th>
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
                          aria-label={`Editar livro ${b.title}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="text-sm">Editar</span>
                        </button>
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 whitespace-nowrap"
                          onClick={() => handleDeleteClick(b)}
                          aria-label={`Excluir livro ${b.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-sm">Excluir</span>
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
                        <p className="text-lg font-medium">Nenhum livro encontrado</p>
                        <p className="text-sm text-gray-400">Tente ajustar sua busca ou adicione um novo livro</p>
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
                <span className="font-medium">Autor:</span> {b.author}
              </p>
              <p className="text-gray-900 font-semibold mb-4">
                <span className="font-medium text-gray-600">Preço:</span> R$ {b.price?.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-all shadow-sm"
                  onClick={() => openEdit(b)}
                  aria-label={`Editar livro ${b.title}`}
                >
                  <Pencil className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition-all shadow-sm"
                  onClick={() => handleDeleteClick(b)}
                  aria-label={`Excluir livro ${b.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir</span>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-900 mb-1">Nenhum livro encontrado</p>
              <p className="text-sm text-gray-500">Tente ajustar sua busca ou adicione um novo livro</p>
            </div>
          )}
        </div>
      </main>

      {/* ========================================
          FOOTER SIMPLES
          ======================================== */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
            <p>© 2025 Books API - Projeto Full Stack</p>
            <a
              href="https://github.com/ramirovictor/books-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              aria-label="Repositório do backend no GitHub"
            >
              <Github className="w-4 h-4" />
              <span>Backend (Spring Boot)</span>
            </a>
            <a
              href="https://github.com/ramirovictor/books-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              aria-label="Repositório do frontend no GitHub"
            >
              <Github className="w-4 h-4" />
              <span>Frontend (React + Vite)</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ========================================
          MODAL DE CRIAR/EDITAR
          ======================================== */}
      <Modal
        isOpen={mode !== null}
        onClose={closeModal}
        title={mode === "edit" ? "Editar livro" : "Novo livro"}
      >
        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Título <span className="text-rose-600">*</span>
            </label>
            <input
              id="title"
              ref={firstInputRef}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ex: Clean Code"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1.5">
              Autor <span className="text-rose-600">*</span>
            </label>
            <input
              id="author"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Ex: Robert C. Martin"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1.5">
              Preço (R$) <span className="text-rose-600">*</span>
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
            <p className="mt-1.5 text-xs text-gray-500">Valor deve ser maior ou igual a zero</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={closeModal}
              aria-label="Cancelar e fechar modal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className={clsx(
                "px-6 py-2.5 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                saving && "opacity-60 cursor-not-allowed"
              )}
              aria-label="Salvar livro"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================
          MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
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
