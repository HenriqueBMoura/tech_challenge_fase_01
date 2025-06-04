import React from 'react';
import Link from 'next/link';

interface NavItem {
  href: string;
  label: string;
  isActive?: boolean;
}

interface SidebarProps {
  navItems?: NavItem[];
  onNavigate?: (href: string) => void;
  activeView: string;
}

export default function Sidebar({ navItems }: SidebarProps) {
  // Default navigation items if none provided
  const defaultNavItems: NavItem[] = navItems || [
    { href: "/dashboard", label: "Início", isActive: true },
    { href: "/dashboard/transferencias", label: "Transferências" },
    { href: "/dashboard/investimentos", label: "Investimentos" },
    { href: "/dashboard/servicos", label: "Outros serviços" },
  ];

  return (
    <aside className="w-64 bg-white p-7 h-screen rounded-lg mt-6 ml-6">
      <nav className="space-y-4 text-center">
        {defaultNavItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`block py-2 px-4 ${item.isActive ? "text-green-dark font-bold border-b-2" : "text-black border-b-1 hover:text-green-dark hover:border-green-dark"}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}