"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface UserDropdownProps {
  username: string;
}

export default function UserDropdown({ username }: UserDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center gap-5" ref={dropdownRef}>
      <span className="mr-2">{username}</span>
      <div className="relative">
        <button 
          className="w-8 h-8 rounded-full border border-red-hot flex items-center justify-center focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#FF5031">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-black rounded-sm shadow-lg z-50">
            <div className="flex justify-end p-2">
              <button 
                className="text-green-500 focus:outline-none"
                onClick={() => setIsDropdownOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="py-1">
              <Link 
                href="/minha-conta"
                className="block px-4 py-2 text-green-500 hover:bg-gray-900"
              >
                Minha conta
              </Link>
              <div className="border-t border-gray-700"></div>
              
              <Link 
                href="/configuracoes"
                className="block px-4 py-2 text-white hover:bg-gray-900"
              >
                Configurações
              </Link>
              <div className="border-t border-gray-700"></div>
              
              <Link 
                href="/login"
                className="block px-4 py-2 text-white hover:bg-gray-900"
              >
                Sair
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}