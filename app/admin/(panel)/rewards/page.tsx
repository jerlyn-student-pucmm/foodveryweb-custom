"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi } from "@/lib/api/admin-api";
import type { RewardDTO } from "@/types/admin";
import { useCallback, useEffect, useState } from "react";

export default function AdminRewardsPage() {
  const { getIdToken } = useAdminAuth();
  const [items, setItems] = useState<RewardDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<RewardDTO | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pointsRequired, setPointsRequired] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    setLoading(true);
    try {
      const r = await adminApi.listRewardsStaff(token);
      setItems(r);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setName("");
    setDescription("");
    setPointsRequired("");
    setImageUrl("");
    setErr(null);
    setMsg(null);
    setModalOpen(true);
  }

  function openEdit(r: RewardDTO) {
    setEditing(r);
    setName(r.name);
    setDescription(r.description ?? "");
    setPointsRequired(String(r.points_required));
    setImageUrl(r.image_url ?? "");
    setErr(null);
    setMsg(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const token = await getIdToken();
    if (!token) return;
    const pts = parseInt(pointsRequired, 10);
    if (!name.trim() || Number.isNaN(pts) || pts < 0) {
      setErr("Nombre y puntos requeridos (≥ 0)");
      return;
    }
    try {
      if (editing) {
        await adminApi.updateReward(token, editing.uuid, {
          name: name.trim(),
          description: description.trim() || null,
          points_required: pts,
          image_url: imageUrl.trim() || null,
        });
        setMsg("Recompensa actualizada");
      } else {
        await adminApi.createReward(token, {
          name: name.trim(),
          description: description.trim() || null,
          points_required: pts,
          image_url: imageUrl.trim() || null,
        });
        setMsg("Recompensa creada");
      }
      closeModal();
      await load();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error");
    }
  }

  async function handleDelete(r: RewardDTO) {
    if (!confirm(`¿Eliminar recompensa «${r.name}»?`)) return;
    setErr(null);
    const token = await getIdToken();
    if (!token) return;
    try {
      await adminApi.deleteReward(token, r.uuid);
      setMsg("Recompensa eliminada");
      await load();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="font-display text-3xl text-white">Recompensas</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Canjes por puntos · {loading ? "…" : items.length} activas
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Nueva recompensa
        </button>
      </div>

      {(msg || err) && (
        <div className="mt-6 space-y-2">
          {msg && (
            <p className="rounded-lg bg-emerald-950/50 px-4 py-2 text-emerald-300">{msg}</p>
          )}
          {err && <p className="rounded-lg bg-red-950/50 px-4 py-2 text-red-300">{err}</p>}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-zinc-500">Cargando…</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((r) => (
            <li
              key={r.uuid}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
            >
              <div>
                <p className="font-medium text-white">{r.name}</p>
                <p className="text-sm text-zinc-500">
                  {r.points_required} pts
                  {r.description ? ` · ${r.description}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(r)}
                  className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(r)}
                  className="rounded-lg px-3 py-1.5 text-sm text-red-400 hover:bg-red-950/40"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AdminModal
        title={editing ? "Editar recompensa" : "Nueva recompensa"}
        open={modalOpen}
        onClose={closeModal}
      >
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-3">
          <div>
            <label className="text-xs text-zinc-500">Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
              rows={2}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500">Puntos requeridos</label>
            <input
              type="number"
              min={0}
              value={pointsRequired}
              onChange={(e) => setPointsRequired(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500">URL de imagen (opcional)</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
              placeholder="https://…"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-600"
            >
              {editing ? "Guardar" : "Crear"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
