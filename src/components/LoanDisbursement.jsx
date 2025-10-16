import React, { useState } from 'react';

const LoanDisbursement = ({ loanAmount, loanTerm, walletAddress, onDisbursementComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');

  const handleDisburseLoan = async () => {
    if (!walletAddress || !loanAmount) {
      setError('Ошибка: Не подключен кошелек или отсутствуют данные для займа.');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    try {
      // Симуляция выдачи займа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Генерируем случайный хеш транзакции
      const mockHash = '0x' + Math.random().toString(16).substr(2, 64);
      setTransactionHash(mockHash);
      
      onDisbursementComplete?.(mockHash, selectedToken, loanAmount);
      
    } catch (err) {
      setError(`Ошибка при выдаче займа: ${err.message}`);
      console.error('Disbursement error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  if (transactionHash) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Займ успешно выдан!
          </h3>
          
          <p className="text-gray-600 mb-4">
            {formatAmount(loanAmount)} {selectedToken} переведены на ваш кошелек
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Хеш транзакции:</p>
            <p className="font-mono text-sm text-gray-900 break-all">
              {transactionHash}
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Демо-версия:</strong> Это симуляция транзакции. В реальном приложении средства будут переведены через блокчейн.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Выдача займа
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Сумма займа
          </label>
          <p className="text-lg font-semibold text-gray-900">${formatAmount(loanAmount)}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Срок займа
          </label>
          <p className="text-lg font-semibold text-gray-900">{loanTerm} месяцев</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Получатель
          </label>
          <p className="font-mono text-sm text-gray-900 break-all">
            {walletAddress}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Токен для выдачи
          </label>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        
        <button
          onClick={handleDisburseLoan}
          disabled={isProcessing || !walletAddress}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
        >
          {isProcessing ? 'Выдача займа...' : 'Выдать займ'}
        </button>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Демо-версия:</strong> Это симуляция выдачи займа. В реальном приложении средства будут переведены через блокчейн.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanDisbursement;