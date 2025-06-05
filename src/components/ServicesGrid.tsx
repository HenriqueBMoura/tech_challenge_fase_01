"use client";

import React from 'react';
import Image from 'next/image';

interface ServiceItem {
  id: string;
  title: string;
  iconSrc: string;
}

interface ServicesGridProps {
  onServiceSelect?: (serviceId: string) => void;
}

export default function ServicesGrid({ onServiceSelect }: ServicesGridProps) {
  // Lista de serviços disponíveis
  const services: ServiceItem[] = [
    { id: "loan", title: "Empréstimo", iconSrc: "/dashboard/services/emprestimo.svg" },
    { id: "cards", title: "Meus cartões", iconSrc: "/dashboard/services/cartoes.svg" },
    { id: "donation", title: "Doações", iconSrc: "/dashboard/services/doacoes.svg" },
    { id: "pix", title: "Pix", iconSrc: "/dashboard/services/pix.svg" },
    { id: "insurance", title: "Seguros", iconSrc: "/dashboard/services/seguros.svg" },
    { id: "mobile", title: "Crédito celular", iconSrc: "/dashboard/services/credito.svg" }
  ];

  const handleServiceClick = (serviceId: string) => {
    console.log(`Serviço selecionado: ${serviceId}`);
    if (onServiceSelect) {
      onServiceSelect(serviceId);
    }
  };

  return (
    <div className="bg-gray-200 p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Confira os serviços disponíveis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => handleServiceClick(service.id)}
            className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <Image 
                src={service.iconSrc} 
                alt={service.title} 
                width={64} 
                height={64}
                className="text-green-600"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-800">{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
