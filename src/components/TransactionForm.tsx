"use client";

import { useState } from "react";

interface TransactionFormProps {
  onSubmitTransaction: (type: string, value: string, newBalance: number, recipient?: string) => void;
  initialBalance?: number;
}

export default function TransactionForm({ 
  onSubmitTransaction, 
  initialBalance = 2500 
}: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState(initialBalance);
  const [error, setError] = useState("");
  const [showRecipientField, setShowRecipientField] = useState(false);

  const formatCurrency = (value: string): string => {
    const cleanValue = value.replace(/[^\d,]/g, '');
    return cleanValue;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransactionValue(formatCurrency(value));
  };

  const handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setTransactionType(type);
    // Mostrar campo de destinatário apenas para transferências
    setShowRecipientField(type === "transfer");
  };

  const getNumericValue = (value: string): number => {
    return parseFloat(value.replace(',', '.')) || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const numericValue = getNumericValue(transactionValue);
    
    if (numericValue <= 0) {
      setError("O valor da transação deve ser maior que zero");
      return;
    }

    // Validar destinatário para transferências
    if (transactionType === "transfer" && recipient.trim() === "") {
      setError("É necessário informar um destinatário para transferências");
      return;
    }

    let newBalance = balance;
    
    switch(transactionType) {
      case "deposit":
        newBalance = balance + numericValue;
        break;
      case "transfer":
      case "payment":
        if (numericValue > balance) {
          setError("Saldo insuficiente para esta operação");
          return;
        }
        newBalance = balance - numericValue;
        break;
      default:
        setError("Selecione um tipo de transação válido");
        return;
    }

    // Passa o destinatário quando for transferência
    onSubmitTransaction(
      transactionType, 
      transactionValue, 
      newBalance,
      transactionType === "transfer" ? recipient : undefined
    );
    
    setBalance(newBalance);
    setTransactionType("");
    setTransactionValue("");
    setRecipient("");
    setShowRecipientField(false);
  };

  return (
    <div className="bg-secondary p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nova transação</h2>
      
      <div className="mb-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-gray-700">Saldo atual: <span className="font-bold">R$ {balance.toFixed(2).replace('.', ',')}</span></p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de transação</label>
          <div className="relative">
            <select
              value={transactionType}
              onChange={handleTransactionTypeChange}
              className="w-full p-4 border border-gray-300 text-black rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
        
        {/* Campo de destinatário para transferências */}
        {showRecipientField && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destinatário</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-white text-black focus:ring-primary focus:border-transparent"
              placeholder="Nome do destinatário"
              required
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500">R$</span>
            </div>
            <input
              type="text"
              value={transactionValue}
              onChange={handleValueChange}
              className="w-full pl-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-white text-black focus:ring-primary focus:border-transparent"
              placeholder="0,00"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-primary text-white py-4 px-6 rounded-lg w-full font-medium text-lg hover:bg-[#003a49] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {transactionType ? `Confirmar ${transactionType === "deposit" ? "depósito" : transactionType === "transfer" ? "transferência" : "pagamento"}` : "Concluir transação"}
        </button>
      </form>
    </div>
  );
}