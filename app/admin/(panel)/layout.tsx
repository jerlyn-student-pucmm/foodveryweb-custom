import { AdminPanelGate } from "@/components/admin/AdminPanelGate";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelGate>{children}</AdminPanelGate>;
}
