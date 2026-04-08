"use client";

import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { adminApi } from "@/lib/api/admin-api";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { getPublicApiUrl } from "@/lib/env";
import type { StaffStatusResponse } from "@/types/admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function isStaff(s: StaffStatusResponse): boolean {
  return (
    s.is_staff === true ||
    s.is_employee === true ||
    s.is_admin === true ||
    s.role === "admin" ||
    s.role === "employee"
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading, configMissing, signInEmail, signInGoogle } =
    useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const verifyStaffAndGo = useCallback(
    async (idToken: string, uid: string) => {
      const s = await adminApi.getStaffStatus(idToken);
      if (isStaff(s)) {
        router.replace("/admin");
      } else {
        setErr(
          `Sin rol staff en esta API para tu UID. En user_roles: user_uid = ${uid}, role admin o employee.`
        );
      }
    },
    [router]
  );

  /** Sesión ya existente (recarga / volver desde otra ruta): usa user directo, sin depender de getIdToken en deps. */
  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await user.getIdToken();
        if (!token || cancelled) return;
        await verifyStaffAndGo(token, user.uid);
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : String(e);
          setErr(`API: ${msg}`);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, loading, verifyStaffAndGo]);

  if (configMissing) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-display text-2xl text-white">Configuración Firebase</h1>
        <p className="mt-4 text-zinc-400">
          Copia <code className="text-amber-200">.env.example</code> a{" "}
          <code className="text-amber-200">.env.local</code> y completa las variables{" "}
          <code className="text-amber-200">NEXT_PUBLIC_FIREBASE_*</code> y{" "}
          <code className="text-amber-200">NEXT_PUBLIC_API_URL</code>.
        </p>
        <Link href="/" className="mt-8 inline-block text-emerald-400 underline">
          Volver al sitio
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await signInEmail(email.trim(), password);
      const auth = getFirebaseAuth();
      const u = auth.currentUser;
      if (!u) {
        setErr("No hay sesión tras el login.");
        return;
      }
      const token = await u.getIdToken();
      await verifyStaffAndGo(token, u.uid);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error al iniciar sesión");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setErr(null);
    setBusy(true);
    try {
      await signInGoogle();
      const auth = getFirebaseAuth();
      const u = auth.currentUser;
      if (!u) {
        setErr("Google no dejó sesión activa. Intenta de nuevo.");
        return;
      }
      const token = await u.getIdToken();
      await verifyStaffAndGo(token, u.uid);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error con Google");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <h1 className="font-display text-3xl text-white">Panel admin</h1>
      <p className="mt-2 text-sm text-zinc-400">FoodVery — inicia sesión con Firebase</p>

      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <div>
          <label className="block text-sm text-zinc-400">Correo</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-emerald-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400">Contraseña</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-emerald-600"
            required
          />
        </div>
        {err && (
          <p className="text-sm text-red-400" role="alert">
            {err}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || loading}
          className="w-full rounded-lg bg-emerald-700 py-3 font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
        >
          Entrar
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-950 px-2 text-zinc-500">o</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onGoogle}
        disabled={busy || loading}
        className="w-full rounded-lg border border-zinc-600 bg-zinc-900 py-3 font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        Continuar con Google
      </button>

      <Link href="/" className="mt-10 text-center text-sm text-zinc-500 underline">
        Volver al sitio público
      </Link>
      <p className="mt-6 text-center text-xs text-zinc-600">
        API usada: {getPublicApiUrl()}
      </p>
    </div>
  );
}
