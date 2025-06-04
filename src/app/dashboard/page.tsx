"use client";

import { useState } from "react";
import Header from "@/components/Layouts/header";
import Sidebar from "@/components/Layouts/sidebar";
import TransactionForm from "@/components/TransactionForm";
import TransactionHistory from "@/components/TransactionHistory";
import ServicesGrid from "@/components/ServicesGrid";

// Definindo a interface da transação
interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  month: string;
  recipient?: string;
  category?: string;
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [showBalance, setShowBalance] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(2500);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "Depósito", amount: 150, date: "18/11/2022", month: "Novembro" },
    { id: 2, type: "Depósito", amount: 100, date: "21/11/2022", month: "Novembro" },
    { id: 3, type: "Depósito", amount: 50, date: "21/11/2022", month: "Novembro" },
    { id: 4, type: "Transferência", amount: -500, date: "21/11/2022", month: "Novembro", recipient: "Carlos Silva" },
  ]);

  const handleSubmitTransaction = (
    type: string, 
    value: string, 
    newBalance: number, 
    recipient?: string,
    category?: string
  ) => {
    console.log("Transaction submitted:", { type, value, newBalance, recipient, category });
    
    // Atualiza o saldo
    setCurrentBalance(newBalance);
    
    // Cria uma nova transação
    const numericValue = parseFloat(value.replace(',', '.'));
    const transactionAmount = type === 'deposit' ? numericValue : -numericValue;
    
    // Obtém a data atual formatada
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    // Meses em português
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const monthName = months[today.getMonth()];
    
    // Mapeia os tipos de transação para os rótulos corretos
    const transactionLabels: Record<string, string> = {
      "deposit": "Depósito",
      "transfer": "Transferência",
      "payment": "Pagamento"
    };
    
    // Mapeia categorias para rótulos em português
    const categoryLabels: Record<string, string> = {
      "bills": "Contas e Faturas",
      "services": "Serviços",
      "taxes": "Impostos",
      "education": "Educação",
      "other": "Outros"
    };
    
    const newTransaction: Transaction = {
      id: Date.now(),
      type: transactionLabels[type] || type,
      amount: transactionAmount,
      date: formattedDate,
      month: monthName,
      recipient: recipient, // Para transferências
      category: category ? categoryLabels[category] : undefined // Para pagamentos
    };
    
    // Adiciona a nova transação à lista
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };
  
  const handleServiceSelect = (serviceId: string) => {
    console.log(`Serviço selecionado no Dashboard: ${serviceId}`);
    // Aqui você pode implementar a lógica para navegar para páginas específicas
    // de cada serviço ou exibir componentes específicos
  };
  
  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "transaction":
        return <TransactionForm onSubmitTransaction={handleSubmitTransaction} initialBalance={currentBalance} />;
      case "services":
        return <ServicesGrid onServiceSelect={handleServiceSelect} />;
      case "investments":
        return (
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Investimentos</h2>
            <p className="text-gray-600">Funcionalidade de investimentos em desenvolvimento.</p>
          </div>
        );
      case "overview":
      default:
        return (
          <div className="bg-primary text-white p-8 rounded-xl shadow-md">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Olá, Joana! :)</h1>
                <p className="text-sm opacity-90">Quinta-feira, 08/09/2024</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="border-b border-red-hot pb-3 mb-4 flex justify-between items-center">
                <h2 className="text-xl font-medium">Saldo</h2>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-[#1a6275] rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div>
                <p className="text-sm opacity-80">Conta Corrente</p>
                <p className="text-3xl font-bold mt-2">
                  {showBalance ? `R$ ${currentBalance.toFixed(2).replace('.', ',')}` : "••••••"}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0eb]">
      <Header />

      <div className="flex">
        <Sidebar onNavigate={handleNavigate} activeView={activeView} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {renderActiveView()}
              
              {activeView === "overview" && (
                <TransactionForm 
                  onSubmitTransaction={handleSubmitTransaction} 
                  initialBalance={currentBalance}
                />
              )}
            </div>
            
            {/* O histórico de transações só aparece na visão geral */}
            {activeView === "overview" && (
              <TransactionHistory transactions={transactions} />
            )}
            
            {/* Para outras views, podemos expandir o conteúdo principal */}
            {activeView !== "overview" && (
              <div className="lg:col-span-1"></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}