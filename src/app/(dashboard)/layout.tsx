import { Sidebar } from "@/components/sidebar";
import "../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="main-content flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
