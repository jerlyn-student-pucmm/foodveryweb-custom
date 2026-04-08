"use client";

import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi } from "@/lib/api/admin-api";
import { ChefHat, Coins, Gift, UtensilsCrossed } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const { getIdToken } = useAdminAuth();
  const [plates, setPlates] = useState<number | null>(null);
  const [txTotal, setTxTotal] = useState<number | null>(null);
  const [rewardsCount, setRewardsCount] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    setErr(null);
    try {
      const [menu, tx, rewards] = await Promise.all([
        adminApi.getMenu(token),
        adminApi.getTransactions(token, 1, 1),
        adminApi.listRewardsStaff(token),
      ]);
      setPlates(menu.total_count ?? menu.plates.length);
      setTxTotal(tx.total);
      setRewardsCount(rewards.length);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error");
    }
  }, [getIdToken]);

  useEffect(() => {
    void load();
  }, [load]);

  const cards = [
    {
      label: "Platillos en menú",
      value: plates,
      icon: UtensilsCrossed,
      hint: "Incluye todos los ítems activos del menú.",
    },
    {
      label: "Movimientos de puntos",
      value: txTotal,
      icon: Coins,
      hint: "Total de transacciones de puntos registradas.",
    },
    {
      label: "Recompensas activas",
      value: rewardsCount,
      icon: Gift,
      hint: "Recompensas disponibles para canje.",
    },
  ];

  return (
    <div>
      <div className="flex items-start gap-3 border-b border-zinc-800 pb-6">
        <ChefHat className="h-8 w-8 shrink-0 text-emerald-500" aria-hidden />
        <div>
          <h1 className="font-display text-3xl text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Resumen general de la app y el programa de lealtad.
          </p>
        </div>
      </div>

      {err ? (
        <p className="mt-6 rounded-lg bg-red-950/50 px-4 py-2 text-red-300">{err}</p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, hint }) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
          >
            <div className="flex items-center gap-2 text-zinc-500">
              <Icon className="h-4 w-4" aria-hidden />
              <span className="text-xs uppercase tracking-wide">{label}</span>
            </div>
            <p className="mt-3 font-display text-3xl text-white">
              {value === null ? "—" : value}
            </p>
            <p className="mt-2 text-xs text-zinc-600">{hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
