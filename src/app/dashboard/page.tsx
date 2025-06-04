"use client";

import { useState } from "react";
import Header from "@/components/Layouts/header";
import Sidebar from "@/components/Layouts/sidebar";
import TransactionForm from "@/components/TransactionForm";
// import { onNavigate } from "@/types/sidebarprops";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("overview"); // Default view
  const [showBalance, setShowBalance] = useState(true);

  const mockTransactions = [
    { id: 1, type: "Depósito", amount: 150, date: "18/11/2022", month: "Novembro" },
    { id: 2, type: "Depósito", amount: 100, date: "21/11/2022", month: "Novembro" },
    { id: 3, type: "Depósito", amount: 50, date: "21/11/2022", month: "Novembro" },
    { id: 4, type: "Transferência", amount: -500, date: "21/11/2022", month: "Novembro" },
  ];

  const handleSubmitTransaction = (type: string, value: string) => {
    // Transaction logic would go here
    console.log("Transaction submitted:", { type, value });
    // You could add the transaction to the mockTransactions array or make an API call
  };
  
  // Function to handle sidebar navigation
  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "transaction":
        return <TransactionForm onSubmitTransaction={handleSubmitTransaction} />;
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
                  {showBalance ? "R$ 2.500,00" : "••••••"}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0eb]">
      {/* Using the Header component */}
      <Header />

      <div className="flex">
        {/* Using the Sidebar component with navigation callback */}
        <Sidebar onNavigate={handleNavigate} activeView={activeView} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Render the active view component based on sidebar selection */}
              {renderActiveView()}
              
              {/* Only show transaction form on overview page */}
              {activeView === "overview" && (
                <TransactionForm onSubmitTransaction={handleSubmitTransaction} />
              )}
            </div>
            
            {/* Right Column (1/3 width on large screens) - Transaction History */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl text-gray-800 font-bold">Extrato</h2>
                <div className="flex space-x-3">
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[#003a49] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-[#003a49] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="border-b border-gray-200 pb-5">
                    <p className="text-sm text-green-700 font-medium">{transaction.month}</p>
                    <div className="flex justify-between mt-2">
                      <div>
                        <p className="text-gray-800 font-medium">{transaction.type}</p>
                        <p className={`text-xl font-bold ${transaction.amount < 0 ? "text-red-600" : "text-gray-800"}`}>
                          {transaction.amount < 0 ? "-" : ""}R$ {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <p className="text-gray-500 text-right">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}