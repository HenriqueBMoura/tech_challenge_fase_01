"use client";

import React from "react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  month: string;
  recipient?: string;
  category?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  // Se não há transações, não temos última operação
  const lastTransaction = transactions.length > 0 ? transactions[0] : null;

  return (
    <>
      {/* Última operação realizada */}
      {lastTransaction && (
        <div className="mb-4 pb-4">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Última operação</h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">{lastTransaction.type}</p>
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
        </div>
      )}
      
      <div className="pt-2 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Histórico completo</h3>
        
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhuma transação encontrada</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-baseline">
                  <p className="text-sm text-green-700 font-medium">{transaction.month}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <div>
                    <p className="text-gray-800 font-medium">{transaction.type}</p>
                    {transaction.recipient && 
                      <span className="block text-xs text-gray-600">
                        Para: {transaction.recipient}
                      </span>
                    }
                    {transaction.category && 
                      <span className="block text-xs text-gray-600">
                        Categoria: {transaction.category}
                      </span>
                    }
                    <p className={`text-base font-bold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
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
    </>
  );
}