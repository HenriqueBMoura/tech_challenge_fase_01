"use client";

import { useState } from "react";
import Header from "@/components/Layouts/header";
import Sidebar from "@/components/Layouts/sidebar";
import TransactionForm from "@/components/TransactionForm";
import TransactionHistory from "@/components/TransactionHistory";
import ServicesGrid from "@/components/ServicesGrid";
import Investments from '@/components/Investments';
import Cards from '@/components/Cards';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

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
    setSelectedService(serviceId);
    if (serviceId === "cards") {
      setActiveView("cards"); // Isso vai acionar a renderização do componente Cards
    }
  };
  
  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const handleDeleteTransaction = (id: number) => {
    // Filtra as transações, removendo a que tem o id correspondente
    const transactionToDelete = transactions.find(t => t.id === id);
    
    if (transactionToDelete) {
      // Atualiza o saldo atual após a remoção
      // Se removeu uma transação com valor negativo, adicionamos esse valor ao saldo
      // Se removeu uma transação com valor positivo, subtraímos do saldo
      setCurrentBalance(prev => prev - transactionToDelete.amount);
      
      // Remove a transação da lista
      setTransactions(prevTransactions => 
        prevTransactions.filter(transaction => transaction.id !== id)
      );
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setActiveView("edit-transaction");
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
      case "edit-transaction":
        return editingTransaction ? 
          <TransactionForm 
            onSubmitTransaction={(type, value, newBalance, recipient, category) => {
              // Remove a transação antiga do estado
              const transactionDate = new Date();
              const day = transactionDate.getDate().toString().padStart(2, '0');
              const month = (transactionDate.getMonth() + 1).toString().padStart(2, '0');
              const formattedDate = `${day}/${month}/${transactionDate.getFullYear()}`;
              
              // Mapeia o tipo de transação para o texto a ser exibido
              let displayType = "";
              if (type === "deposit") displayType = "Depósito";
              else if (type === "transfer") displayType = "Transferência";
              else if (type === "payment") displayType = "Pagamento";
              
              // Mapeia a categoria para o texto a ser exibido
              let displayCategory = category;
              if (category) {
                switch (category) {
                  case "bills": displayCategory = "Contas e Faturas"; break;
                  case "services": displayCategory = "Serviços"; break;
                  case "taxes": displayCategory = "Impostos"; break;
                  case "education": displayCategory = "Educação"; break;
                  case "other": displayCategory = "Outros"; break;
                }
              }
              
              // Converte o valor da transação
              const numericValue = parseFloat(value.replace(',', '.'));
              
              // Determina o sinal do valor com base no tipo de transação
              let transactionAmount = numericValue;
              if (type === "transfer" || type === "payment") {
                transactionAmount = -numericValue;
              }
              
              // Removemos a transação antiga do estado
              setTransactions(prevTransactions => 
                prevTransactions.filter(t => t.id !== editingTransaction.id)
              );
              
              // Adicionamos a transação atualizada
              const updatedTransaction = {
                id: editingTransaction.id, // Mantemos o mesmo ID
                type: displayType,
                amount: transactionAmount,
                date: formattedDate,
                month: new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(transactionDate),
                recipient: recipient,
                category: displayCategory,
              };
              
              // Adiciona a transação atualizada no topo da lista
              setTransactions(prevTransactions => [updatedTransaction, ...prevTransactions.filter(t => t.id !== editingTransaction.id)]);
              
              // Atualiza o saldo com base na diferença entre o valor original e o novo valor
              const oldTransaction = transactions.find(t => t.id === editingTransaction.id);
              if (oldTransaction) {
                const valueDifference = transactionAmount - oldTransaction.amount;
                setCurrentBalance(prev => prev + valueDifference);
              }
              
              // Limpa o estado de edição e volta para a visão geral
              setEditingTransaction(null);
              setActiveView("overview");
            }}
            initialBalance={currentBalance}
            editMode={true}
            transactionToEdit={editingTransaction}
            onCancelEdit={() => {
              setEditingTransaction(null);
              setActiveView("overview");
            }}
          /> : 
          <TransactionForm onSubmitTransaction={handleSubmitTransaction} initialBalance={currentBalance} />;
      case "services":
        return <ServicesGrid onServiceSelect={handleServiceSelect} />;
      case "investments":
        return <Investments />;
      case "cards":
        return <Cards />;
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
                  </div>
                  <TransactionHistory 
                    transactions={transactions}
                    onDeleteTransaction={handleDeleteTransaction}
                    onEditTransaction={handleEditTransaction}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}