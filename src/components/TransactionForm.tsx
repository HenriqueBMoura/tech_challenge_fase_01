"use client";

import { useState } from "react";

interface TransactionFormProps {
  onSubmitTransaction: (type: string, value: string) => void;
}

export default function TransactionForm({ onSubmitTransaction }: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitTransaction(transactionType, transactionValue);
    setTransactionType("");
    setTransactionValue("");
  };

  return (
    <div className="bg-secondary p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nova transação</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de transação</label>
          <div className="relative">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="" disabled>Selecione o tipo de transação</option>
              <option value="deposit">Depósito</option>
              <option value="transfer">Transferência</option>
              <option value="payment">Pagamento</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500">R$</span>
            </div>
            <input
              type="text"
              value={transactionValue}
              onChange={(e) => setTransactionValue(e.target.value)}
              className="w-full pl-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0,00"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-primary text-white py-4 px-6 rounded-lg w-full font-medium text-lg hover:bg-[#003a49] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Concluir transação
        </button>
      </form>
    </div>
  );
}