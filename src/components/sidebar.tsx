"use client";

import {
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Target,
  Ticket,
  User
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarLink({ href, icon, label, isActive = false }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/20 ${isActive ? 'bg-muted/20 border-l-2 border-pink-500' : ''}`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <span className="sidebar-label transition-opacity duration-200">{label}</span>
    </Link>
  );
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Abmelden-Funktion
  const handleLogout = () => {
    // Lösche das Token-Cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Navigiere zur Login-Seite
    router.push("/login");
  };

  return (
    <aside className="sidebar" {...props}>
      <Logo />

      <div className="mt-6">
        <p className="px-4 py-2 text-xs text-muted-foreground sidebar-label">MENÜ</p>
        <SidebarLink
          href="/"
          icon={<LayoutDashboard size={18} className="text-gray-400" />}
          label="Dashboard"
          isActive={pathname === '/' || pathname === '/dashboard'}
        />
        <SidebarLink
          href="/zielgruppe"
          icon={<Target size={18} className="text-gray-400" />}
          label="Zielgruppe"
          isActive={pathname === '/zielgruppe'}
        />
        <SidebarLink
          href="/plaene"
          icon={<Ticket size={18} className="text-gray-400" />}
          label="Pläne"
          isActive={pathname === '/plaene'}
        />
        <SidebarLink
          href="/hilfe"
          icon={<HelpCircle size={18} className="text-gray-400" />}
          label="Hilfe"
          isActive={pathname === '/hilfe'}
        />
      </div>

      <div className="absolute bottom-4 w-full">
        <SidebarLink
          href="/mein-profil"
          icon={<User size={18} className="text-gray-400" />}
          label="Mein Profil"
          isActive={pathname === '/mein-profil'}
        />
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-muted/20 text-left"
        >
          <div className="flex items-center justify-center">
            <LogOut size={18} className="text-gray-400" />
          </div>
          <span className="sidebar-label transition-opacity duration-200">Abmelden</span>
        </button>
      </div>
    </aside>
  );
}
