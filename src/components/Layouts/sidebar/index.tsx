import React from 'react';
// import Link from 'next/link';

interface NavItem {
  href: string;
  label: string;
  isActive?: boolean;
}

interface SidebarProps {
  navItems?: NavItem[];
  onNavigate: (view: string) => void;
  activeView: string;
}

export default function Sidebar({ onNavigate, activeView }: SidebarProps) {
  // Items do menu com valores funcionais
  const menuItems = [
    { id: "overview", label: "Início" },
    { id: "transaction", label: "Nova Transação" },
    { id: "investments", label: "Investimentos" },
    { id: "services", label: "Outros serviços" },
  ];

  return (
    <aside className="w-64 bg-white p-7 h-screen rounded-lg m-6">
      <nav className="space-y-4 text-center">
        {menuItems.map((item) => (
          <a
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`block py-2 px-4 cursor-pointer ${
              activeView === item.id
                ? "text-green-700 font-bold border-b-2 border-green-700"
                : "text-black border-b border-gray-100 hover:text-green-700 hover:border-green-700"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}