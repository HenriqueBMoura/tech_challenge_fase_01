"use client";

import { useState } from 'react';
import Image from 'next/image';

// import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically call an API to create the account
    // For now we'll just simulate a successful signup
    console.log({ name, email, password, agreeTerms });
    
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
            <Image src="/login/ilustracaoLogin.svg" alt="Logo" width={350} height={350} />
          <h1 className="text-center text-3xl font-bold text-gray-800 mt-2">
            Preencha os campos abaixo para criar sua conta corrente!
          </h1>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6 rounded-md">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-800">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-4 text-gray-500 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-4 text-gray-500 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-800">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-4 text-gray-500 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-800">
                  Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco.
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative flex w-1/2 justify-center rounded-md bg-[#FF5733] px-3 py-4 text-lg font-medium text-white hover:bg-[#ff3d17] focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-offset-2"
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}