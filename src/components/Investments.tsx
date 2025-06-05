"use client";

import React from 'react';
import Image from 'next/image';

export default function Investments() {
  // Dados dos investimentos
  const totalInvestment = 50000;
  const fixedIncome = 36000;
  const variableIncome = 14000;

  return (
    <div className="bg-gray-200 rounded-lg p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Investimentos</h2>
        <p className="text-2xl text-primary font-medium">Total: R$ {totalInvestment.toLocaleString('pt-BR')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary text-white p-6 rounded-lg">
          <p className="text-center text-lg mb-2">Renda Fixa</p>
          <p className="text-center text-2xl font-bold">R$ {fixedIncome.toLocaleString('pt-BR')}</p>
        </div>
        
        <div className="bg-primary text-white p-6 rounded-lg">
          <p className="text-center text-lg mb-2">Renda variável</p>
          <p className="text-center text-2xl font-bold">R$ {variableIncome.toLocaleString('pt-BR')}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Estatísticas</h3>
        
        <div className="bg-primary rounded-lg p-6 text-white">
          <div className="flex justify-center">
            <Image 
              src="/chart/chart.png" 
              alt="Gráfico de distribuição de investimentos"
              width={500}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}