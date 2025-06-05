import React from 'react';

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
    <aside className="w-64 bg-white rounded-lg shadow-sm h-fit">
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`block py-3 px-4 cursor-pointer border-l-4 ${
              activeView === item.id
                ? "text-green-700 font-bold border-green-700"
                : "text-black border-transparent hover:text-green-700 hover:border-green-700"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}