"use client";

import React, { useState } from "react";

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
  onDeleteTransaction?: (id: number) => void;
  onEditTransaction?: (transaction: Transaction) => void;
}

export default function TransactionHistory({ 
  transactions, 
  onDeleteTransaction, 
  onEditTransaction 
}: TransactionHistoryProps) {
  // Estados para controlar menus de ações e modal de confirmação
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
  
  // Se não há transações, não temos última operação
  const lastTransaction = transactions.length > 0 ? transactions[0] : null;

  // Função para alternar a visibilidade do menu de ações
  const toggleActionMenu = (id: number) => {
    if (activeActionMenu === id) {
      setActiveActionMenu(null);
    } else {
      setActiveActionMenu(id);
    }
  };

  // Fecha o menu de ações quando clicado fora
  const handleClickOutside = () => {
    setActiveActionMenu(null);
  };

  // Funções para manipular ações
  const handleEdit = (transaction: Transaction) => {
    if (onEditTransaction) {
      onEditTransaction(transaction);
      setActiveActionMenu(null);
    }
  };

  // Abre o modal de confirmação para exclusão
  const confirmDelete = (id: number) => {
    setTransactionToDelete(id);
    setShowDeleteModal(true);
    setActiveActionMenu(null);
  };

  // Executa a exclusão após confirmação
  const handleDelete = () => {
    if (onDeleteTransaction && transactionToDelete !== null) {
      onDeleteTransaction(transactionToDelete);
      setShowDeleteModal(false);
      setTransactionToDelete(null);
    }
  };

  // Cancela a exclusão
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTransactionToDelete(null);
  };

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
              <div key={transaction.id} className="mb-4 pb-4 border-b border-gray-100 relative">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
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
                      <div className="text-right flex items-start">
                        <p className="text-gray-500 mr-2">{transaction.date}</p>
                        
                        {/* Botão de ações */}
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleActionMenu(transaction.id);
                            }} 
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none"
                            aria-label="Opções"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          
                          {/* Menu de ações */}
                          {activeActionMenu === transaction.id && (
                            <div 
                              className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button 
                                onClick={() => handleEdit(transaction)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                disabled={!onEditTransaction}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Editar
                              </button>
                              <button 
                                onClick={() => confirmDelete(transaction.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                disabled={!onDeleteTransaction}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Excluir
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Overlay para fechar o menu quando clicado fora */}
      {activeActionMenu !== null && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={handleClickOutside}
        />
      )}

      {/* Modal de confirmação para exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={cancelDelete}></div>
          
          {/* Modal */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 z-10 shadow-xl">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Confirmar exclusão</h3>
              <p className="text-sm text-gray-500">
                Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}