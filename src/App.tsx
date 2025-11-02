import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, RefreshCcw, BookOpen, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { clsx } from "clsx";
import type { Book } from "./types";
import { listBooks, createBook, updateBook, deleteBook } from "./books.service";

type Mode = "create" | "edit" | null;

export default function App() {
  const [data, setData] = useState<Book[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [form, setForm] = useState<Book>({ title: "", author: "", price: 0 });
  const [selected, setSelected] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const page = await listBooks(q);
      setData(page.content);
    } catch (e) {
      toast.error("Falha ao carregar livros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  const openCreate = () => { setMode("create"); setForm({ title: "", author: "", price: 0 }); };
  const openEdit = (b: Book) => { setMode("edit"); setSelected(b); setForm({ ...b }); };
  const closeModal = () => { setMode(null); setSelected(null); };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === "edit" && selected?.id) {
        await updateBook(selected.id, form);
        toast.success("Livro atualizado!");
      } else {
        await createBook(form);
        toast.success("Livro criado!");
      }
      await load();
      closeModal();
    } catch {
      toast.error("Erro ao salvar livro");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (b: Book) => {
    if (!confirm(`Remover "${b.title}"?`)) return;
    try {
      await deleteBook(b.id!);
      toast.success("Livro removido");
      await load();
    } catch {
      toast.error("Erro ao remover livro");
    }
  };

  const filtered = useMemo(
    () => data.filter(b => b.title.toLowerCase().includes(q.toLowerCase())),
    [data, q]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-right" />
      {/* Header sticky */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">Books</h1>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
            onClick={openCreate}
          >
            <Plus className="w-4 h-4" />
            Novo
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* filtros */}
        <div className="flex items-center gap-3 mb-6">
          <input
            className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black/30"
            placeholder="Buscar por título..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button
            className={clsx(
              "inline-flex items-center gap-2 px-4 py-2 border rounded-xl",
              loading && "opacity-70 cursor-not-allowed"
            )}
            onClick={load}
            disabled={loading}
            title="Atualizar"
          >
            <RefreshCcw className={clsx("w-4 h-4", loading && "animate-spin")} />
            Atualizar
          </button>
        </div>

        {/* tabela */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="p-4 w-[36%]">Título</th>
                <th className="p-4 w-[28%]">Autor</th>
                <th className="p-4 w-[18%]">Preço</th>
                <th className="p-4 w-[18%]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr key={b.id} className={clsx("border-t", i % 2 ? "bg-white" : "bg-gray-50/50")}>
                  <td className="p-4 font-medium">{b.title}</td>
                  <td className="p-4 text-gray-700">{b.author}</td>
                  <td className="p-4 text-gray-700">R$ {b.price?.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-100 transition"
                        onClick={() => openEdit(b)}
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-100 transition"
                        onClick={() => onDelete(b)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="p-8 text-center text-gray-500" colSpan={4}>
                    Nenhum livro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal overlay */}
      {mode && (
        <div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-lg font-semibold">
                {mode === "edit" ? "Editar livro" : "Novo livro"}
              </h2>
              <button className="p-1 rounded hover:bg-gray-100" onClick={closeModal}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="px-5 py-4 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm mb-1">Título</label>
                <input
                  required
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Autor</label>
                <input
                  required
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Preço</label>
                <input
                  required
                  type="number"
                  min={0}
                  step={0.01}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/30"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl border hover:bg-gray-100"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-white bg-black hover:opacity-90 transition",
                    saving && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
