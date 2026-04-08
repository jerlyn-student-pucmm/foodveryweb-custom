"use client";

import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi, getPlateCategories } from "@/lib/api/admin-api";
import type { PlateDTO, StaffStatusResponse } from "@/types/admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut, getIdToken } = useAdminAuth();
  const [staff, setStaff] = useState<StaffStatusResponse | null>(null);
  const [staffLoading, setStaffLoading] = useState(true);
  const [plates, setPlates] = useState<PlateDTO[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [txPage, setTxPage] = useState(1);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCat, setNewCat] = useState("OTHER");
  const [newFeatured, setNewFeatured] = useState(false);

  const [pointsUid, setPointsUid] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");

  const refreshMenu = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    const menu = await adminApi.getMenu(token);
    setPlates(menu.plates);
  }, [getIdToken]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/admin/login");
      return;
    }
    let cancelled = false;
    (async () => {
      setStaffLoading(true);
      setErr(null);
      try {
        const token = await getIdToken();
        if (!token || cancelled) return;
        const s = await adminApi.getStaffStatus(token);
        if (cancelled) return;
        setStaff(s);
        if (!s.is_staff) {
          setStaffLoading(false);
          return;
        }
        const [menu, cats] = await Promise.all([
          adminApi.getMenu(token),
          getPlateCategories(),
        ]);
        if (cancelled) return;
        setPlates(menu.plates);
        setCategories(cats.length ? cats : ["PIZZA", "PASTA", "SALAD", "OTHER"]);
      } catch (e: unknown) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : "Error cargando datos");
        }
      } finally {
        if (!cancelled) setStaffLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading, getIdToken, router]);

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
      setMsg("Platillo creado. Sube una foto abajo si quieres.");
      setNewName("");
      setNewDesc("");
      setNewPrice("");
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

  async function handleAddPoints(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const token = await getIdToken();
    if (!token) return;
    const amount = parseInt(purchaseAmount, 10);
    if (!pointsUid.trim() || Number.isNaN(amount) || amount < 101) {
      setErr("UID y monto ≥ 101 requeridos (puntos = monto ÷ 100)");
      return;
    }
    try {
      await adminApi.addPoints(token, { user_uid: pointsUid.trim(), purchase_amount: amount });
      setMsg(`Puntos añadidos (≈ ${Math.floor(amount / 100)} pts)`);
      setPointsUid("");
      setPurchaseAmount("");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error al añadir puntos");
    }
  }

  if (authLoading || staffLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-zinc-400">
        Cargando…
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!staff?.is_staff) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-white">Sin acceso</h1>
        <p className="mt-4 text-zinc-400">
          Tu usuario no tiene rol de empleado o administrador en el backend.
        </p>
        <button
          type="button"
          onClick={() => signOut()}
          className="mt-8 rounded-lg bg-zinc-800 px-6 py-2 text-white"
        >
          Cerrar sesión
        </button>
        <Link href="/" className="mt-6 block text-emerald-400 underline">
          Ir al sitio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 pb-24">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="font-display text-3xl text-white">Admin FoodVery</h1>
          <p className="text-sm text-zinc-500">
            {user.email} · rol: {staff.role ?? "—"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/" className="text-sm text-zinc-400 underline">
            Sitio público
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white"
          >
            Salir
          </button>
        </div>
      </header>

      {(msg || err) && (
        <div className="mt-6 space-y-2">
          {msg && <p className="rounded-lg bg-emerald-950/50 px-4 py-2 text-emerald-300">{msg}</p>}
          {err && <p className="rounded-lg bg-red-950/50 px-4 py-2 text-red-300">{err}</p>}
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-white">Nuevo platillo</h2>
        <form onSubmit={handleCreatePlate} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
            required
          />
          <input
            placeholder="Precio"
            type="number"
            step="0.01"
            min="0"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
            required
          />
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
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
            className="sm:col-span-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
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
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Menú ({plates.length})</h2>
          <button
            type="button"
            onClick={() => refreshMenu()}
            className="text-sm text-emerald-400 underline"
          >
            Actualizar
          </button>
        </div>
        <ul className="mt-4 space-y-4">
          {plates.map((p) => (
            <li
              key={p.uuid ?? String(p.id)}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{p.name}</p>
                  <p className="text-xs text-zinc-500">
                    uuid: {p.uuid ?? "—"} · {p.category}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{p.description}</p>
                </div>
                <div className="text-right text-sm text-zinc-300">
                  RD${typeof p.price === "string" ? p.price : String(p.price)}
                </div>
              </div>
              {p.image ? (
                <p className="mt-2 truncate text-xs text-zinc-500">{p.image}</p>
              ) : null}
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
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-zinc-800 pt-10">
        <h2 className="text-lg font-semibold text-white">Puntos (compra)</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Monto mínimo 101. Puntos = monto ÷ 100 (regla del backend).
        </p>
        <form onSubmit={handleAddPoints} className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="text-xs text-zinc-500">Firebase UID del cliente</label>
            <input
              value={pointsUid}
              onChange={(e) => setPointsUid(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
              placeholder="user uid"
            />
          </div>
          <div className="w-40">
            <label className="text-xs text-zinc-500">Monto</label>
            <input
              type="number"
              min={101}
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white"
            />
          </div>
          <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-white">
            Añadir puntos
          </button>
        </form>
      </section>

      <TransactionsSection
        getIdToken={getIdToken}
        page={txPage}
        onPage={setTxPage}
      />
    </div>
  );
}

function TransactionsSection({
  getIdToken,
  page,
  onPage,
}: {
  getIdToken: () => Promise<string | null>;
  page: number;
  onPage: (p: number) => void;
}) {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof adminApi.getTransactions>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const token = await getIdToken();
        if (!token || cancelled) return;
        const r = await adminApi.getTransactions(token, page, 15);
        if (!cancelled) setData(r);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getIdToken, page]);

  if (loading || !data) {
    return (
      <section className="mt-12 border-t border-zinc-800 pt-10">
        <h2 className="text-lg font-semibold text-white">Movimientos</h2>
        <p className="mt-2 text-zinc-500">Cargando…</p>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t border-zinc-800 pt-10">
      <h2 className="text-lg font-semibold text-white">
        Movimientos ({data.total})
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500">
              <th className="py-2 pr-4">Fecha</th>
              <th className="py-2 pr-4">Cliente</th>
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
                  {row.user_uid.slice(0, 12)}…
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
          onClick={() => onPage(page - 1)}
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
          onClick={() => onPage(page + 1)}
          className="text-sm text-emerald-400 disabled:opacity-30"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
