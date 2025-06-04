import React from 'react';

export default function Header() {
  return (
    <header className="bg-primary text-white py-4">
      <div className="max-w-7xl mx-auto px-5 flex justify-end">
        <div className="flex items-center space-x-3">
          <span className="text-white">Joana da Silva Oliveira</span>
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
