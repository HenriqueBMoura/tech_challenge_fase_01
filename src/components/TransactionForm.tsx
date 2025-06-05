"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  month: string;
  recipient?: string;
  category?: string;
}

interface TransactionFormProps {
  onSubmitTransaction: (type: string, value: string, newBalance: number, recipient?: string, category?: string) => void;
  initialBalance?: number;
  editMode?: boolean;
  transactionToEdit?: Transaction;
  onCancelEdit?: () => void;
}

export default function TransactionForm({ 
  onSubmitTransaction, 
  initialBalance = 2500,
  editMode = false,
  transactionToEdit,
  onCancelEdit
}: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [paymentCategory, setPaymentCategory] = useState("");
  const [balance, setBalance] = useState(initialBalance);
  const [error, setError] = useState("");
  const [showRecipientField, setShowRecipientField] = useState(false);
  const [showCategoryField, setShowCategoryField] = useState(false);
  
  // Estado para controlar o modal de confirmação
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTransactionData, setPendingTransactionData] = useState<{
    type: string;
    value: string;
    newBalance: number;
    recipient?: string;
    category?: string;
  } | null>(null);

  // Efeito para preencher o formulário quando estiver em modo de edição
  useEffect(() => {
    if (editMode && transactionToEdit) {
      // Mapeia o tipo da transação para o valor esperado pelo select
      let type = "";
      if (transactionToEdit.type === "Depósito") type = "deposit";
      else if (transactionToEdit.type === "Transferência") type = "transfer";
      else if (transactionToEdit.type === "Pagamento") type = "payment";
      
      setTransactionType(type);
      setShowRecipientField(type === "transfer");
      setShowCategoryField(type === "payment");
      
      // Define o valor absoluto da transação (sem o sinal negativo)
      setTransactionValue(Math.abs(transactionToEdit.amount).toFixed(2).replace(".", ","));
      
      // Define o destinatário se existir
      if (transactionToEdit.recipient) {
        setRecipient(transactionToEdit.recipient);
      }
      
      // Define a categoria se existir
      if (transactionToEdit.category) {
        // Mapeia de volta para o valor do select
        const categoryMap: Record<string, string> = {
          "Contas e Faturas": "bills",
          "Serviços": "services",
          "Impostos": "taxes",
          "Educação": "education",
          "Outros": "other"
        };
        
        // Encontra a chave correspondente ao valor da categoria
        for (const [key, value] of Object.entries(categoryMap)) {
          if (transactionToEdit.category.includes(key)) {
            setPaymentCategory(value);
            break;
          }
        }
      }
    }
  }, [editMode, transactionToEdit]);

  // Função para lidar com mudanças no tipo de transação
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setTransactionType(newType);
    
    // Atualiza a visibilidade dos campos condicionais
    setShowRecipientField(newType === "transfer");
    setShowCategoryField(newType === "payment");
    
    // Limpa campos não relevantes
    if (newType !== "transfer") setRecipient("");
    if (newType !== "payment") setPaymentCategory("");
    
    // Limpa erros
    setError("");
  };

  const getNumericValue = (valueString: string): number => {
    return parseFloat(valueString.replace(',', '.'));
  };

  // Verifica se o formulário está válido
  const isFormValid = (): boolean => {
    // Sempre precisa de um tipo e um valor
    if (!transactionType || !transactionValue) return false;
    
    const numericValue = getNumericValue(transactionValue);
    if (isNaN(numericValue) || numericValue <= 0) return false;
    
    // Se for transferência, precisa de um destinatário
    if (transactionType === "transfer" && !recipient.trim()) return false;
    
    // Se for pagamento, precisa de uma categoria
    if (transactionType === "payment" && !paymentCategory) return false;
    
    // Se não estiver em modo de edição, verifica o saldo para transferências e pagamentos
    if (!editMode && (transactionType === "transfer" || transactionType === "payment")) {
      if (numericValue > balance) return false;
    }
    
    return true;
  };

  // Preparar dados da transação e mostrar modal
  const prepareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!isFormValid()) {
      if (!transactionType) {
        setError("Por favor, selecione um tipo de transação");
      } else if (!transactionValue || getNumericValue(transactionValue) <= 0) {
        setError("O valor da transação deve ser maior que zero");
      } else if (transactionType === "transfer" && !recipient.trim()) {
        setError("É necessário informar um destinatário para transferências");
      } else if (transactionType === "payment" && !paymentCategory) {
        setError("É necessário informar uma categoria para pagamentos");
      } else if (!editMode && (transactionType === "transfer" || transactionType === "payment") && getNumericValue(transactionValue) > balance) {
        setError("Saldo insuficiente para esta operação");
      }
      return;
    }

    const numericValue = getNumericValue(transactionValue);
    let newBalance = balance;
    
    // Se não estiver editando, calcule o novo saldo
    if (!editMode) {
      switch(transactionType) {
        case "deposit":
          newBalance = balance + numericValue;
          break;
        case "transfer":
        case "payment":
          newBalance = balance - numericValue;
          break;
      }
    } else {
      // Em modo de edição, usamos o saldo atual
      newBalance = balance;
    }

    // Guarda os dados da transação e abre o modal
    setPendingTransactionData({
      type: transactionType,
      value: transactionValue,
      newBalance: newBalance,
      recipient: transactionType === "transfer" ? recipient : undefined,
      category: transactionType === "payment" ? paymentCategory : undefined
    });
    
    // Abre o modal de confirmação
    setShowConfirmModal(true);
  };

  // Confirmar a transação
  const confirmTransaction = () => {
    if (pendingTransactionData) {
      const { type, value, newBalance, recipient, category } = pendingTransactionData;
      
      // Executa a submissão da transação
      onSubmitTransaction(type, value, newBalance, recipient, category);
      
      // Limpa os campos após envio se não estiver em modo de edição
      if (!editMode) {
        setBalance(newBalance);
        setTransactionType("");
        setTransactionValue("");
        setRecipient("");
        setPaymentCategory("");
        setShowRecipientField(false);
        setShowCategoryField(false);
      }
      
      // Fecha o modal e limpa os dados pendentes
      setShowConfirmModal(false);
      setPendingTransactionData(null);
    }
  };

  // Cancelar a transação
  const cancelTransaction = () => {
    setShowConfirmModal(false);
    setPendingTransactionData(null);
  };

  // Função para formatar o texto do tipo de transação
  const getTransactionTypeText = (type: string): string => {
    switch (type) {
      case "deposit": return "depósito";
      case "transfer": return "transferência";
      case "payment": return "pagamento";
      default: return "transação";
    }
  };

  return (
    <div className="bg-secondary p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {editMode ? "Editar transação" : "Nova transação"}
      </h2>
      
      <div className="mb-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-gray-700">Saldo atual: <span className="font-bold">R$ {balance.toFixed(2).replace('.', ',')}</span></p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={prepareSubmit} className="space-y-6">
        <div>
          <label htmlFor="transactionType" className="block mb-2 text-gray-700 font-medium">
            Tipo de transação
          </label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={handleTypeChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-white text-black focus:ring-primary"
          >
            <option value="">Selecione o tipo</option>
            <option value="deposit">Depósito</option>
            <option value="transfer">Transferência</option>
            <option value="payment">Pagamento</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="transactionValue" className="block mb-2 text-gray-700 font-medium">
            Valor
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">R$</span>
            <input
              type="text"
              id="transactionValue"
              value={transactionValue}
              onChange={(e) => setTransactionValue(e.target.value)}
              placeholder="0,00"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-white text-black focus:ring-primary"
            />
          </div>
        </div>
        
        {showRecipientField && (
          <div>
            <label htmlFor="recipient" className="block mb-2 text-gray-700 font-medium">
              Destinatário
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Nome do destinatário"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-white text-black focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
        
        {showCategoryField && (
          <div>
            <label htmlFor="category" className="block mb-2 text-gray-700 font-medium">
              Categoria
            </label>
            <select
              id="category"
              value={paymentCategory}
              onChange={(e) => setPaymentCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecione a categoria</option>
              <option value="bills">Contas e Faturas</option>
              <option value="services">Serviços</option>
              <option value="taxes">Impostos</option>
              <option value="education">Educação</option>
              <option value="other">Outros</option>
            </select>
          </div>
        )}
        
        <div className="flex gap-4">
          {editMode && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-300 text-gray-700 py-4 px-6 rounded-lg flex-1 font-medium text-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className={`bg-primary text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-[#003a49] transition-colors ${editMode ? 'flex-1' : 'w-full'} ${!isFormValid() ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={!isFormValid()}
          >
            {editMode ? "Revisar alterações" : 
             (transactionType ? 
               `Confirmar ${getTransactionTypeText(transactionType)}` : 
               "Concluir transação"
             )
            }
          </button>
        </div>
      </form>

      {/* Modal de confirmação */}
      {showConfirmModal && pendingTransactionData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={cancelTransaction}></div>
          
          {/* Modal */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 z-10 shadow-xl">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary bg-opacity-10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                {editMode ? "Confirmar alterações" : `Confirmar ${getTransactionTypeText(pendingTransactionData.type)}`}
              </h3>
              
              <div className="mt-4 text-left p-4 bg-gray-50 rounded-lg">
                <p className="mb-2 text-black font-bold">
                  <span className="font-medium text-black">Tipo:</span>{" "}
                  {pendingTransactionData.type === "deposit" ? "Depósito" : 
                   pendingTransactionData.type === "transfer" ? "Transferência" : 
                   "Pagamento"}
                </p>
                <p className="mb-2 text-gray-700 font-bold">
                  <span className="font-medium text-black">Valor:</span>{" "}
                  R$ {pendingTransactionData.value}
                </p>
                
                {pendingTransactionData.recipient && (
                  <p className="mb-2 text-black font-bold">
                    <span className="font-medium text-gray-700">Destinatário:</span>{" "}
                    {pendingTransactionData.recipient}
                  </p>
                )}
                
                {pendingTransactionData.category && (
                  <p className="mb-2">
                    <span className="font-medium text-gray-700">Categoria:</span>{" "}
                    {pendingTransactionData.category === "bills" ? "Contas e Faturas" :
                     pendingTransactionData.category === "services" ? "Serviços" :
                     pendingTransactionData.category === "taxes" ? "Impostos" :
                     pendingTransactionData.category === "education" ? "Educação" :
                     "Outros"}
                  </p>
                )}
                
                {!editMode && (
                  <p className="mt-4 font-medium">
                    <span className="text-gray-700">Novo saldo:</span>{" "}
                    <span className={pendingTransactionData.newBalance < balance ? "text-red-600" : "text-green-600"}>
                      R$ {pendingTransactionData.newBalance.toFixed(2).replace('.', ',')}
                    </span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelTransaction}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={confirmTransaction}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#003a49] transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}