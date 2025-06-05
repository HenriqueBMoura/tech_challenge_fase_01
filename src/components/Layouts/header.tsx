"use client";

import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Função para fechar o dropdown quando clicar fora dele
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Adiciona o event listener quando o componente montar
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpa o event listener quando o componente desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-primary text-white py-4">
      <div className="max-w-7xl mx-auto px-5 flex justify-end">
        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          <span className="text-white">Joana da Silva Oliveira</span>
          <button 
            onClick={toggleDropdown}
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-green-400"
            aria-label="Menu de usuário"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-black rounded-md shadow-lg z-50 overflow-hidden border border-green-500/20">
              <div className="py-1">
                <button
                  onClick={() => {
                    // Navegar para a página da conta
                    setIsDropdownOpen(false);
                  }}
                  className="w-full block px-4 py-3 text-left text-green-400 hover:bg-gray-900 border-b border-gray-800"
                >
                  Minha conta
                </button>
                
                <button
                  onClick={() => {
                    // Navegar para configurações
                    setIsDropdownOpen(false);
                  }}
                  className="w-full block px-4 py-3 text-left text-white hover:bg-gray-900 border-b border-gray-800"
                >
                  Configurações
                </button>
                
                <button
                  onClick={() => {
                    // Lógica para sair/logout
                    setIsDropdownOpen(false);
                  }}
                  className="w-full block px-4 py-3 text-left text-white hover:bg-gray-900"
                >
                  Sair
                </button>
              </div>
              
              {/* Botão de fechar no canto superior direito */}
              <button 
                onClick={() => setIsDropdownOpen(false)}
                className="absolute top-2 right-2 text-green-400 hover:text-green-300 focus:outline-none"
                aria-label="Fechar menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
