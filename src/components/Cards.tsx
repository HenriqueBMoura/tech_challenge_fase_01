"use client";

import React from 'react';
import Image from 'next/image';

interface CardProps {
  type: 'physical' | 'digital';
  number: string;
  name: string;
  cardBrand: string;
  cardLevel: string;
  functions: string[];
}

export default function Cards() {
  // Dados dos cartões
  const cards: CardProps[] = [
    {
      type: 'physical',
      number: '•••• •••• •••• ••••',
      name: 'Joana Fonseca Gomes',
      cardBrand: 'Byte',
      cardLevel: 'Platinum',
      functions: ['Débito', 'Crédito']
    },
    {
      type: 'digital',
      number: '•••• •••• •••• ••••',
      name: 'Joana Fonseca Gomes',
      cardBrand: 'Byte',
      cardLevel: 'Platinum',
      functions: ['Débito']
    }
  ];

  return (
    <div className="bg-gray-200 p-8 rounded-xl space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Meus cartões</h2>

      {/* Cartão físico */}
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-700">Cartão físico</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 lg:w-2/5">
            <div className="relative w-full aspect-[1.6/1]">
              <Image 
                src="/dashboard/cards/fisico.png" 
                alt="Cartão físico" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 lg:w-3/5 flex flex-col justify-center space-y-4">
            <button className="bg-[#f26241] text-white py-3 px-4 rounded-lg hover:bg-[#d75536] transition-colors">
              Configurar
            </button>
            
            <button className="border border-[#f26241] text-[#f26241] py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Bloquear
            </button>
            
            <p className="text-gray-700 text-lg mt-2">
              Função: {cards[0].functions.join("/")}
            </p>
          </div>
        </div>
      </div>

      {/* Cartão digital */}
      <div className="space-y-4 pt-6 border-t border-gray-300">
        <h3 className="text-2xl font-medium text-gray-700">Cartão digital</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 lg:w-2/5">
            <div className="relative w-full aspect-[1.6/1]">
              <Image 
                src="/dashboard/cards/digital.png" 
                alt="Cartão digital" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 lg:w-3/5 flex flex-col justify-center space-y-4">
            <button className="bg-[#f26241] text-white py-3 px-4 rounded-lg hover:bg-[#d75536] transition-colors">
              Configurar
            </button>
            
            <button className="border border-[#f26241] text-[#f26241] py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Bloquear
            </button>
            
            <p className="text-gray-700 text-lg mt-2">
              Função: {cards[1].functions.join("/")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}