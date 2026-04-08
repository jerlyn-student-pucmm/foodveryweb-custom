"use client";

import { AdminModal } from "@/components/admin/AdminModal";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi } from "@/lib/api/admin-api";
import { decodeQrFromImageFile, parseUserUidFromQrText } from "@/lib/qrDecode";
import { useCallback, useEffect, useState } from "react";

export default function AdminPointsPage() {
  const { getIdToken } = useAdminAuth();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Awaited<
    ReturnType<typeof adminApi.getTransactions>
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [userUid, setUserUid] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [lookupBusy, setLookupBusy] = useState(false);

  const loadTx = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    setLoading(true);
    try {
      const r = await adminApi.getTransactions(token, page, 15);
      setData(r);
    } finally {
      setLoading(false);
    }
  }, [getIdToken, page]);

  useEffect(() => {
    void loadTx();
  }, [loadTx]);

  async function handleLookupEmail() {
    setErr(null);
    const token = await getIdToken();
    if (!token) return;
    const em = email.trim();
    if (!em) {
      setErr("Introduce un correo");
      return;
    }
    setLookupBusy(true);
    try {
      const r = await adminApi.lookupUserByEmail(token, em);
      setUserUid(r.user_uid);
      setMsg(`Usuario encontrado: ${r.email}`);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "No se encontró el usuario");
    } finally {
      setLookupBusy(false);
    }
  }

  async function handleQrFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    const decoded = await decodeQrFromImageFile(file);
    const uid = decoded ? parseUserUidFromQrText(decoded) ?? decoded : null;
    if (uid) {
      setUserUid(uid.trim());
      setMsg("Código leído. Revisa el UID antes de añadir puntos.");
    } else {
      setErr(
        "No se pudo leer un QR válido. Prueba otra foto o pega el UID manualmente."
      );
    }
  }

  async function handleAddPoints(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const token = await getIdToken();
    if (!token) return;
    const amount = parseInt(purchaseAmount, 10);
    const uid = userUid.trim();
    if (!uid || Number.isNaN(amount) || amount < 101) {
      setErr("UID y monto ≥ 101 requeridos (puntos = monto ÷ 100)");
      return;
    }
    try {
      await adminApi.addPoints(token, { user_uid: uid, purchase_amount: amount });
      setMsg(`Puntos añadidos (≈ ${Math.floor(amount / 100)} pts)`);
      setPointsModalClosed();
      void loadTx();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error al añadir puntos");
    }
  }

  function setPointsModalClosed() {
    setModalOpen(false);
    setEmail("");
    setUserUid("");
    setPurchaseAmount("");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="font-display text-3xl text-white">Puntos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Transacciones de puntos y registro de compras.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setErr(null);
            setMsg(null);
            setModalOpen(true);
          }}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Añadir puntos
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-white">
          Movimientos{" "}
          {data ? (
            <span className="text-zinc-500">({data.total})</span>
          ) : null}
        </h2>
        {loading || !data ? (
          <p className="mt-4 text-zinc-500">Cargando…</p>
        ) : (
          <>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="py-2 pr-4">Fecha</th>
                    <th className="py-2 pr-4">Cliente (UID)</th>
                    <th className="py-2 pr-4">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((row) => (
                    <tr key={row.uuid} className="border-b border-zinc-800/80">
                      <td className="py-2 pr-4 text-zinc-400">
                        {new Date(row.created_at).toLocaleString()}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs text-zinc-300">
                        {row.user_uid.slice(0, 14)}…
                      </td>
                      <td className="py-2 text-white">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="text-sm text-emerald-400 disabled:opacity-30"
              >
                Anterior
              </button>
              <span className="text-sm text-zinc-500">
                Página {data.page} / {data.total_pages || 1}
              </span>
              <button
                type="button"
                disabled={page >= (data.total_pages || 1)}
                onClick={() => setPage((p) => p + 1)}
                className="text-sm text-emerald-400 disabled:opacity-30"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </section>

      <AdminModal
        title="Añadir puntos por compra"
        open={modalOpen}
        onClose={() => setPointsModalClosed()}
      >
        <p className="mb-4 text-sm text-zinc-500">
          Monto mínimo 101. Puntos = monto ÷ 100. Puedes localizar al cliente por
          correo o pegar / escanear su UID.
        </p>
        <form onSubmit={handleAddPoints} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500">Correo del cliente</label>
            <div className="mt-1 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
                placeholder="correo@ejemplo.com"
                autoComplete="email"
              />
              <button
                type="button"
                disabled={lookupBusy}
                onClick={() => void handleLookupEmail()}
                className="shrink-0 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white hover:bg-zinc-700 disabled:opacity-50"
              >
                Buscar
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-500">Firebase UID del cliente</label>
            <textarea
              value={userUid}
              onChange={(e) => setUserUid(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-white"
              rows={2}
              placeholder="UID o resultado del QR"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500">
              Escanear QR (foto del código)
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="mt-1 block w-full text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-white"
              onChange={(e) => void handleQrFile(e)}
            />
            <p className="mt-1 text-xs text-zinc-600">
              En Chrome, se usa detección de QR en la imagen. Si falla, pega el UID
              manualmente.
            </p>
          </div>
          <div>
            <label className="text-xs text-zinc-500">Monto de compra (RD$)</label>
            <input
              type="number"
              min={101}
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-600"
            >
              Añadir puntos
            </button>
            <button
              type="button"
              onClick={() => setPointsModalClosed()}
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
