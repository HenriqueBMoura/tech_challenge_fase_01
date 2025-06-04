"use client";

import React from "react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  month: string;
  recipient?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const lastTransaction = transactions.length > 0 ? transactions[0] : null;

  return (
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
      
      {/* Última operação realizada */}
      {lastTransaction && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Última operação</h3>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800">
                {lastTransaction.type}
                {lastTransaction.recipient && <span className="block text-sm text-gray-600">Para: {lastTransaction.recipient}</span>}
              </p>
              <p className={`text-xl font-bold ${lastTransaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                {lastTransaction.amount < 0 ? "-" : "+"}R$ {Math.abs(lastTransaction.amount).toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">{lastTransaction.date}</p>
              <p className="text-sm text-green-700">{lastTransaction.month}</p>
            </div>
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Histórico completo</h3>
      
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhuma transação encontrada</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="border-b border-gray-200 pb-5">
              <p className="text-sm text-green-700 font-medium">{transaction.month}</p>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-gray-800 font-medium">
                    {transaction.type}
                    {transaction.recipient && <span className="block text-sm text-gray-600">Para: {transaction.recipient}</span>}
                  </p>
                  <p className={`text-xl font-bold ${transaction.amount < 0 ? "text-red-600" : "text-gray-800"}`}>
                    {transaction.amount < 0 ? "-" : "+"}R$ {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <p className="text-gray-500 text-right">{transaction.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}