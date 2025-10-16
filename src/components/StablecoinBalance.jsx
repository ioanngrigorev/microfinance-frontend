import React, { useState, useEffect } from 'react';

function StablecoinBalance({ walletAddress }) {
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      fetchBalance();
    }
  }, [walletAddress]);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      // Симуляция получения баланса
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockBalance = (Math.random() * 1000).toFixed(2);
      setBalance(mockBalance);
    } catch (error) {
      console.error('Ошибка получения баланса:', error);
      setBalance('0');
    } finally {
      setLoading(false);
    }
  };

  if (!walletAddress) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Баланс стейблкоинов</h3>
        <p className="text-gray-500">Подключите кошелек для просмотра баланса</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Баланс стейблкоинов</h3>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold text-blue-700">${balance} USDC</p>
          <p className="text-sm text-gray-600 mt-1">
            Демо-версия: случайный баланс
          </p>
        </div>
      )}
    </div>
  );
}

export default StablecoinBalance;