import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#004D61] to-[#E8F0EB] flex flex-col">
      {/* Header simplificado */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center text-green-500 font-bold text-xl">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
              <path d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z" />
            </svg>
            Bytebank
          </Link>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ops! Não encontramos a página...</h1>
        <p className="text-gray-600 max-w-md mb-4">
          E olha que exploramos o universo procurando por ela!
          <br />
          Que tal voltar e tentar novamente?
        </p>
        
        <div className="my-8 relative w-80 h-80 md:w-96 md:h-96">
          <Image 
            src="/not-found/404.png" 
            alt="Erro 404 - Página não encontrada"
            fill
            className="object-contain"
          />
        </div>
        
        <Link 
          href="/" 
          className="bg-[#f26241] hover:bg-[#e04e30] text-white font-medium px-6 py-3 rounded-md transition-colors"
        >
          Voltar ao início
        </Link>
      </div>

      {/* Footer simplificado */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Bytebank. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}