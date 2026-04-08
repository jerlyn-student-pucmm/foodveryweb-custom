"use client";

import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi } from "@/lib/api/admin-api";
import type { StaffStatusResponse } from "@/types/admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "./AdminShell";

type AdminPanelGateProps = {
  children: React.ReactNode;
};

export function AdminPanelGate({ children }: AdminPanelGateProps) {
  const router = useRouter();
  const { user, loading: authLoading, signOut, getIdToken } = useAdminAuth();
  const [staff, setStaff] = useState<StaffStatusResponse | null>(null);
  const [staffLoading, setStaffLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const loadStaff = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    const s = await adminApi.getStaffStatus(token);
    setStaff(s);
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

  if (err) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="text-red-400">{err}</p>
        <button
          type="button"
          onClick={() => void loadStaff()}
          className="mt-4 rounded-lg bg-zinc-800 px-4 py-2 text-white"
        >
          Reintentar
        </button>
      </div>
    );
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
    <AdminShell
      userEmail={user.email ?? null}
      staff={staff}
      onSignOut={() => void signOut()}
    >
      {children}
    </AdminShell>
  );
}
