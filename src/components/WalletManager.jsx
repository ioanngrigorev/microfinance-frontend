import React, { useState } from 'react';

const WalletManager = ({ onWalletConnected, onWalletCreated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showCreateWallet, setShowCreateWallet] = useState(false);

  const handleLogin = async () => {
    setIsAuthenticating(true);
    try {
      // Симуляция подключения кошелька
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
      setWalletAddress(mockAddress);
      setIsAuthenticated(true);
      onWalletConnected?.(mockAddress);
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    setWalletAddress('');
    setIsAuthenticated(false);
    onWalletConnected?.('');
  };

  const handleCreateWallet = () => {
    setShowCreateWallet(true);
  };

  const handleCreateNewWallet = () => {
    const newAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWalletAddress(newAddress);
    setIsAuthenticated(true);
    setShowCreateWallet(false);
    onWalletCreated?.(newAddress);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Управление кошельком</h3>
      
      {isAuthenticated ? (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Адрес кошелька:</p>
            <p className="font-mono text-sm text-gray-900 break-all">
              {walletAddress}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Отключить кошелек
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={handleLogin}
            disabled={isAuthenticating}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {isAuthenticating ? "Подключение..." : "Подключить существующий кошелек"}
          </button>
          
          <button
            onClick={handleCreateWallet}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Создать новый кошелек
          </button>
        </div>
      )}

      {showCreateWallet && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Создание нового кошелька</h4>
          <p className="text-sm text-yellow-700 mb-3">
            Внимание! Это демо-версия. В реальном приложении кошелек будет создан через Moralis.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleCreateNewWallet}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
            >
              Создать
            </button>
            <button
              onClick={() => setShowCreateWallet(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletManager;