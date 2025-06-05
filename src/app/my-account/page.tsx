// filepath: /Users/henriquemoura/Documents/GitHub/fiap-postech/tech_challenge_fase_01/src/app/minha-conta/page.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Layouts/header';

export default function MinhaContaPage() {
  const [userData, setUserData] = useState({
    nome: 'Joana da Silva Oliveira',
    email: 'joanadaolveira@email.com.br',
    senha: '•••••••'
  });
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: userData.nome,
    email: userData.email,
    senha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    setUserData({
      nome: formData.nome || userData.nome,
      email: formData.email || userData.email,
      senha: formData.senha ? '•••••••' : userData.senha
    });

    // Reset editing states
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
    
    // Aqui você adicionaria chamadas de API para atualizar os dados no backend
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-[#e8f0eb]">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Minha conta</h1>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Coluna da esquerda - Ilustração */}
              <div className="relative h-64 md:h-80">
                <Image 
                  src="/dashboard/myaccount/ilustracao.svg" 
                  alt="Configurações de conta"
                  width={400}
                  height={320}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback se a imagem não existir
                    const target = e.target as HTMLImageElement;
                    target.src = "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_1280.png";
                  }}
                />
              </div>
              
              {/* Coluna da direita - Formulário */}
              <div className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-gray-700 mb-2 font-medium">
                    Nome
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={isEditingName ? formData.nome : userData.nome}
                      onChange={handleChange}
                      disabled={!isEditingName}
                      className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button 
                      onClick={() => setIsEditingName(!isEditingName)}
                      className="absolute right-3 top-3 text-gray-600 hover:text-green-600"
                      aria-label={isEditingName ? "Concluir edição do nome" : "Editar nome"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isEditingName ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={isEditingEmail ? formData.email : userData.email}
                      onChange={handleChange}
                      disabled={!isEditingEmail}
                      className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button 
                      onClick={() => setIsEditingEmail(!isEditingEmail)}
                      className="absolute right-3 top-3 text-gray-600 hover:text-green-600"
                      aria-label={isEditingEmail ? "Concluir edição do email" : "Editar email"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isEditingEmail ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Senha */}
                <div>
                  <label htmlFor="senha" className="block text-gray-700 mb-2 font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      value={isEditingPassword ? formData.senha : userData.senha}
                      onChange={handleChange}
                      disabled={!isEditingPassword}
                      className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button 
                      onClick={() => setIsEditingPassword(!isEditingPassword)}
                      className="absolute right-3 top-3 text-gray-600 hover:text-green-600"
                      aria-label={isEditingPassword ? "Concluir edição da senha" : "Editar senha"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isEditingPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleSaveChanges}
                  className="w-full bg-[#f26241] hover:bg-[#e04e30] text-white font-medium py-3 px-6 rounded-md transition-colors mt-6"
                >
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}