"use client";

import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi } from "@/lib/api/admin-api";
import type { ClaimStaffRowDTO } from "@/types/admin";
import { useCallback, useEffect, useMemo, useState } from "react";

type FilterMode = "all" | "pending";

function formatShortUid(uid: string | null): string {
  if (!uid) return "—";
  if (uid.length <= 12) return uid;
  return `${uid.slice(0, 6)}…${uid.slice(-4)}`;
}

export default function AdminRedemptionsPage() {
  const { getIdToken } = useAdminAuth();
  const [filter, setFilter] = useState<FilterMode>("pending");
  const [items, setItems] = useState<ClaimStaffRowDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [deliveringUuid, setDeliveringUuid] = useState<string | null>(null);

  const pendingOnlyParam = useMemo(() => {
    if (filter === "pending") return true;
    return false;
  }, [filter]);

  const load = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    setLoading(true);
    setErr(null);
    try {
      const r = await adminApi.listClaimsStaff(token, pendingOnlyParam);
      setItems(r);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error al cargar canjes");
    } finally {
      setLoading(false);
    }
  }, [getIdToken, pendingOnlyParam]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDeliver(row: ClaimStaffRowDTO) {
    if (row.delivered_at) return;
    setErr(null);
    setMsg(null);
    const token = await getIdToken();
    if (!token) return;
    setDeliveringUuid(row.uuid);
    try {
      const updated = await adminApi.deliverClaim(token, row.uuid);
      setMsg(`Entregado: ${updated.receipt_code}`);
      if (filter === "pending") {
        setItems((prev) => prev.filter((x) => x.uuid !== updated.uuid));
      } else {
        setItems((prev) => prev.map((x) => (x.uuid === updated.uuid ? updated : x)));
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "No se pudo marcar como entregado");
    } finally {
      setDeliveringUuid(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Canjes</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Valida códigos en mostrador y marca la entrega. Queda registrado quién entrega y cuándo.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-zinc-700 bg-zinc-900 p-0.5">
          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`rounded-md px-3 py-1.5 text-sm ${
              filter === "pending"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Pendientes
          </button>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-md px-3 py-1.5 text-sm ${
              filter === "all"
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Todos
          </button>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-zinc-600 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Actualizar
        </button>
      </div>

      {msg ? (
        <p className="rounded-lg border border-emerald-800 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
          {msg}
        </p>
      ) : null}
      {err ? (
        <p className="rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">{err}</p>
      ) : null}

      {loading ? (
        <p className="text-zinc-500">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="text-zinc-500">
          {filter === "pending" ? "No hay canjes pendientes." : "No hay canjes registrados."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-3 font-medium">Código</th>
                <th className="px-3 py-3 font-medium">Premio</th>
                <th className="px-3 py-3 font-medium">Cliente</th>
                <th className="px-3 py-3 font-medium">Canjeado</th>
                <th className="px-3 py-3 font-medium">Estado</th>
                <th className="px-3 py-3 font-medium">Entrega</th>
                <th className="px-3 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {items.map((row) => {
                const pending = !row.delivered_at;
                return (
                  <tr key={row.uuid} className="bg-zinc-950/40 hover:bg-zinc-900/50">
                    <td className="px-3 py-3 font-mono text-emerald-300">{row.receipt_code}</td>
                    <td className="px-3 py-3 text-white">{row.reward_name}</td>
                    <td className="px-3 py-3 text-zinc-300">
                      <span className="block">{row.user_nickname ?? "—"}</span>
                      <span className="text-xs text-zinc-500">{formatShortUid(row.user_uid)}</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-zinc-400">
                      {new Date(row.claimed_at).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-3">
                      {pending ? (
                        <span className="rounded-full bg-amber-950 px-2 py-0.5 text-xs text-amber-200">
                          Pendiente
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-xs text-emerald-200">
                          Entregado
                        </span>
                      )}
                    </td>
                    <td className="max-w-[200px] px-3 py-3 text-xs text-zinc-400">
                      {row.delivered_at ? (
                        <>
                          <div>
                            {new Date(row.delivered_at).toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="mt-0.5 text-zinc-500">
                            por {formatShortUid(row.delivered_by_uid)}
                          </div>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {pending ? (
                        <button
                          type="button"
                          disabled={deliveringUuid === row.uuid}
                          onClick={() => void handleDeliver(row)}
                          className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
                        >
                          {deliveringUuid === row.uuid ? "…" : "Marcar entregado"}
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
