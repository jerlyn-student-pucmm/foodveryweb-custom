import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — FoodVery",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">{children}</div>
    </AdminAuthProvider>
  );
}
