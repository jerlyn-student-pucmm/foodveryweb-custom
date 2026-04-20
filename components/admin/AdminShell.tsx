"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChefHat,
  Coins,
  Gift,
  LayoutDashboard,
  LogOut,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";
import type { StaffStatusResponse } from "@/types/admin";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/plates", label: "Platillos", icon: UtensilsCrossed },
  { href: "/admin/points", label: "Puntos", icon: Coins },
  { href: "/admin/rewards", label: "Recompensas", icon: Gift },
  { href: "/admin/redemptions", label: "Canjes", icon: Ticket },
] as const;

type AdminShellProps = {
  userEmail: string | null;
  staff: StaffStatusResponse;
  onSignOut: () => void;
  children: React.ReactNode;
};

export function AdminShell({ userEmail, staff, onSignOut, children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900/80">
        <div className="border-b border-zinc-800 px-4 py-5">
          <div className="flex items-center gap-2 text-emerald-400">
            <ChefHat className="h-6 w-6" aria-hidden />
            <span className="font-display text-lg text-white">FoodVery</span>
          </div>
          <p className="mt-2 truncate text-xs text-zinc-500">{userEmail}</p>
          <p className="text-xs text-zinc-600">Rol: {staff.role ?? "—"}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-zinc-800 p-2">
          <Link
            href="/"
            className="mb-1 block rounded-lg px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300"
          >
            Sitio público
          </Link>
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Salir
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1 overflow-auto">
        <main className="mx-auto max-w-5xl px-6 py-8 pb-20">{children}</main>
      </div>
    </div>
  );
}
