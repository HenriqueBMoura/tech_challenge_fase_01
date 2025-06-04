"use client";

import { useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically call an API to create the account
    // For now we'll just simulate a successful signup
    console.log({email, password });
    
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
            <Image src="/login/ilustracaoCadastro.svg" alt="Logo" width={350} height={350} />
          <h1 className="text-center text-3xl font-bold text-gray-800 mt-2">
            Login
          </h1>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6 rounded-md">
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
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-4 text-gray-500 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <Link 
              href="#" 
              className="underline text-green-dark hover:text-green-500"
            >
              esqueci minha senha
            </Link>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative flex w-1/2 justify-center rounded-md bg-[#FF5733] px-3 py-4 text-lg font-medium text-white hover:bg-[#ff3d17] focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:ring-offset-2"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}