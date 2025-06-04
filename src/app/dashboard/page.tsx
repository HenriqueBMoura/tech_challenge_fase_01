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

  // Obter a data atual formatada
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('pt-BR', options);
  // Transformar primeira letra em maiúscula
  const formattedDateCapitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

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

  // Componente de saldo que será exibido em todas as views
  const BalanceCard = () => (
    <div className="bg-primary text-white p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Olá, Joana! :)</h1>
          <p className="text-sm opacity-90">{formattedDateCapitalized}</p>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="border-b border-opacity-20 border-white pb-3 mb-4 flex justify-between items-center">
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

  const renderActiveViewContent = () => {
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
        return <TransactionForm onSubmitTransaction={handleSubmitTransaction} initialBalance={currentBalance} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0eb]">
      <Header />

      <div className="max-w-7xl mx-auto">
        <div className="flex py-5">
          {/* Sidebar com altura ajustada */}
          <div className="pl-5 self-start sticky top-5">
            <Sidebar onNavigate={handleNavigate} activeView={activeView} />
          </div>

          {/* Main Content - ajustado para alinhar com a barra lateral */}
          <main className="flex-1 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Conteúdo principal (2 colunas em telas grandes) */}
              <div className="lg:col-span-2 space-y-5">
                {/* O componente de saldo sempre aparecerá no topo */}
                <BalanceCard />
                
                {/* O conteúdo específico da view selecionada */}
                {renderActiveViewContent()}
              </div>
              
              {/* Componente de extrato sempre visível à direita */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold text-gray-800">Extrato</h2>
                    <div className="flex space-x-2">
                      <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-[#003a49] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-[#003a49] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo do extrato com altura ajustada */}
                  <TransactionHistory transactions={transactions} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}