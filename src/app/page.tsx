"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white py-4">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Botão do Menu Mobile - Agora à esquerda */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Logo - Centralizado para Mobile e à esquerda para Desktop */}
          <div className="flex items-center md:order-first">
            <Link href="/" className="flex items-center text-green-500 font-bold text-xl z-10">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
                <path d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z" />
              </svg>
              Bytebank
            </Link>
            
            {/* Menu Desktop */}
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="#" className="text-white hover:text-green-400 transition">Sobre</Link>
              <Link href="/servicos" className="text-white hover:text-green-400 transition">Serviços</Link>
            </nav>
          </div>

          {/* Botões de CTA - Apenas para Desktop */}
          <div className="hidden md:flex space-x-4">
            <Link 
              href="/login/signup" 
              className="bg-green-dark hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            >
              Abrir minha conta
            </Link>
            <Link 
              href="/login/signin" 
              className="border border-green-dark text-green-dark hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition"
            >
              Já tenho conta
            </Link>
          </div>
          
          {/* Espaço vazio para balancear o layout em mobile */}
          <div className="md:hidden w-6"></div>
        </div>

        {/* Menu Mobile Expandido */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 mt-2 py-4">
            <div className="container max-w-7xl mx-auto px-4">
              {/* Botões CTA em Mobile - Dentro do menu hambúrguer */}
              <div className="flex flex-col space-y-3 mb-6">
                <Link 
                  href="/login/signup" 
                  className="bg-green-500 text-white py-3 px-4 rounded-md text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Abrir minha conta
                </Link>
                <Link 
                  href="/login/signin" 
                  className="border border-green-500 text-green-500 bg-transparent py-3 px-4 rounded-md text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Já tenho conta
                </Link>
              </div>
              
              {/* Navegação em Mobile */}
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/sobre" 
                  className="text-white hover:text-green-400 py-2 border-b border-gray-800 pb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </Link>
                <Link 
                  href="/servicos" 
                  className="text-white hover:text-green-400 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#004D61] to-[#FFFFFF] text-white flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-start text-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 text-left">
              Experimente mais liberdade no controle da sua vida financeira.
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
              Crie sua conta com a gente!
            </h1>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-full h-80 md:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/landing-page/ilustracao-banner.svg" 
                  alt="Ilustração de gráfico com pessoa" 
                  width={661}
                  height={412}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>

      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-black text-3xl font-bold mb-12 text-center">Vantagens do nosso banco:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefits content - unchanged */}
            <div className="flex flex-col items-center text-center">
              <div className="text-green-dark mb-4">
                <Image
                  src="/landing-page/presente.svg"
                  alt="Ícone de conta e cartão gratuitos"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-green-dark text-lg font-semibold mb-2">Conta e cartão gratuitos</h3>
              <p className="text-gray-600">Isso mesmo, conta 100% digital, tarifa zero e mais que isso: sem tarifa de manutenção.</p>
            </div>
            
            <div className="text-green-dark flex flex-col items-center text-center">
              <div className="text-green-dark mb-4">
                <Image
                  src="/landing-page/saque.svg"
                  alt="Ícone de saque sem custo"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-green-dark text-lg font-semibold mb-2">Saques sem custo</h3>
              <p className="text-gray-subtitle">Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="text-green-dark mb-4">
                <Image
                  src="/landing-page/pontos.svg"
                  alt="Ícone de programa de pontos"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-green-dark text-lg font-semibold mb-2">Programa de pontos</h3>
              <p className="text-gray-subtitle">Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="text-green-dark mb-4">
                <Image
                  src="/landing-page/dispositivos.svg"
                  alt="Ícone de seguro para dispositivos"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-green-dark text-lg font-semibold mb-2">Seguro Dispositivos</h3>
              <p className="text-gray-subtitle">Seus dispositivos como celular, computador e laptop protegidos por uma mensalidade simbólica.</p>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><Link href="/conta" className="text-gray-300 hover:text-white">Conta corrente</Link></li>
              <li><Link href="/pj" className="text-gray-300 hover:text-white">Conta PJ</Link></li>
              <li><Link href="/cartao" className="text-gray-300 hover:text-white">Cartão de crédito</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">0800 004 250 08</li>
              <li className="text-gray-300">meajuda@bytebank.com.br</li>
              <li className="text-gray-300">ouvidoria@bytebank.com.br</li>
            </ul>
          </div>
          
          {/* Brand */}
          <div className="flex flex-col items-start md:items-end">
            <p className="text-sm text-gray-400 mb-4">Desenvolvido por Henrique Moura</p>
            <div className="mb-4">
              <Link href="/" className="text-green-500 font-bold text-xl flex items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
                  <path d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z" />
                </svg>
                Bytebank
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/bytebank" aria-label="Instagram" className="text-white hover:text-green-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                </svg>
              </Link>
              <Link href="https://whatsapp.com/bytebank" aria-label="WhatsApp" className="text-white hover:text-green-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                </svg>
              </Link>
              <Link href="https://youtube.com/bytebank" aria-label="YouTube" className="text-white hover:text-green-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}