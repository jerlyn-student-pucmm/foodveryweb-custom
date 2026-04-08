"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi, getPlateCategories } from "@/lib/api/admin-api";
import type { PlateDTO } from "@/types/admin";
import { useCallback, useEffect, useState } from "react";

function plateImageSrc(image: string): string | null {
  const s = image?.trim();
  if (!s) return null;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return null;
}

export default function AdminPlatesPage() {
  const { getIdToken } = useAdminAuth();
  const [plates, setPlates] = useState<PlateDTO[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCat, setNewCat] = useState("OTHER");
  const [newFeatured, setNewFeatured] = useState(false);

  const refreshMenu = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    const menu = await adminApi.getMenu(token);
    setPlates(menu.plates);
  }, [getIdToken]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [cats] = await Promise.all([getPlateCategories()]);
        if (!cancelled) {
          setCategories(cats.length ? cats : ["PIZZA", "PASTA", "SALAD", "OTHER"]);
        }
      } catch {
        if (!cancelled) setCategories(["PIZZA", "PASTA", "SALAD", "OTHER"]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    void refreshMenu();
  }, [refreshMenu]);

  async function handleCreatePlate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const token = await getIdToken();
    if (!token) return;
    const price = parseFloat(newPrice);
    if (Number.isNaN(price) || price <= 0) {
      setErr("Precio inválido");
      return;
    }
    try {
      await adminApi.createPlate(token, {
        name: newName.trim(),
        description: newDesc.trim(),
        price,
        category: newCat,
        is_featured: newFeatured,
        image: "",
      });
      setMsg("Platillo creado. Puedes subir foto desde la lista.");
      setNewName("");
      setNewDesc("");
      setNewPrice("");
      setModalOpen(false);
      await refreshMenu();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error al crear");
    }
  }

  async function handleDelete(uuid: string) {
    if (!confirm("¿Eliminar este platillo del menú?")) return;
    setErr(null);
    const token = await getIdToken();
    if (!token) return;
    try {
      await adminApi.deletePlate(token, uuid);
      setMsg("Eliminado");
      await refreshMenu();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error al eliminar");
    }
  }

  async function handleUpload(uuid: string, file: File | null) {
    if (!file) return;
    setErr(null);
    const token = await getIdToken();
    if (!token) return;
    try {
      await adminApi.uploadPhoto(token, uuid, file);
      setMsg("Foto subida");
      await refreshMenu();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error subiendo foto");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="font-display text-3xl text-white">Platillos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Lista del menú · {plates.length} ítems
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void refreshMenu()}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => {
              setErr(null);
              setMsg(null);
              setModalOpen(true);
            }}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
          >
            Agregar platillo
          </button>
        </div>
      </div>

      {(msg || err) && (
        <div className="mt-6 space-y-2">
          {msg && (
            <p className="rounded-lg bg-emerald-950/50 px-4 py-2 text-emerald-300">{msg}</p>
          )}
          {err && <p className="rounded-lg bg-red-950/50 px-4 py-2 text-red-300">{err}</p>}
        </div>
      )}

      <ul className="mt-8 space-y-4">
        {plates.map((p) => {
          const src = plateImageSrc(p.image);
          const key = p.uuid ?? String(p.id);
          return (
            <li
              key={key}
              className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs text-zinc-600">
                    Sin foto
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-xs text-zinc-500">
                      {p.category}
                      {p.is_featured ? " · destacado" : ""}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{p.description}</p>
                  </div>
                  <div className="text-right text-sm text-zinc-300">
                    RD$
                    {typeof p.price === "string" ? p.price : String(p.price)}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer text-sm text-emerald-400">
                    Subir foto
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (p.uuid) void handleUpload(p.uuid, f ?? null);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => p.uuid && handleDelete(p.uuid)}
                    className="text-sm text-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <AdminModal
        title="Nuevo platillo"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleCreatePlate} className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            required
          />
          <input
            placeholder="Precio"
            type="number"
            step="0.01"
            min="0"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            required
          />
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={newFeatured}
              onChange={(e) => setNewFeatured(e.target.checked)}
            />
            Destacado
          </label>
          <textarea
            placeholder="Descripción"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="sm:col-span-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            rows={3}
            required
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-lg bg-emerald-700 py-2 font-medium text-white hover:bg-emerald-600"
          >
            Crear platillo
          </button>
        </form>
      </AdminModal>
    </div>
  );
}
