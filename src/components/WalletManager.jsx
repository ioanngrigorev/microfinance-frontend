import React, { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { networkConfig, stablecoinContracts } from '../config/moralis'

const WalletManager = ({ onWalletConnected, onWalletCreated }) => {
  const { 
    authenticate, 
    isAuthenticated, 
    user, 
    logout, 
    isWeb3Enabled,
    enableWeb3,
    account,
    chainId
  } = useMoralis()
  
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [showCreateWallet, setShowCreateWallet] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user) {
      setWalletAddress(user.get('ethAddress'))
      onWalletConnected?.(user.get('ethAddress'))
    }
  }, [isAuthenticated, user, onWalletConnected])

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      await authenticate({
        signingMessage: 'Подключите кошелек для получения займа в стейблкоинах',
      })
      
      if (!isWeb3Enabled) {
        await enableWeb3()
      }
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleCreateWallet = async () => {
    setIsConnecting(true)
    try {
      // Moralis автоматически создаст кошелек при первой аутентификации
      await authenticate({
        signingMessage: 'Создание нового кошелька для получения займа',
      })
      
      if (!isWeb3Enabled) {
        await enableWeb3()
      }
      
      onWalletCreated?.(user?.get('ethAddress'))
    } catch (error) {
      console.error('Ошибка создания кошелька:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    await logout()
    setWalletAddress('')
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // Можно добавить уведомление о копировании
  }

  if (isAuthenticated && walletAddress) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ваш кошелек</h3>
          <button
            onClick={handleDisconnect}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Отключить
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Адрес кошелька
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(walletAddress)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Копировать
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Кошелек подключен</span>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 Займы будут выданы на этот кошелек в стейблкоинах (USDC/USDT)
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Подключение кошелька
      </h3>
      
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          Для получения займа в стейблкоинах необходимо подключить крипто кошелек
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            {isConnecting ? 'Подключение...' : 'Подключить существующий кошелек'}
          </button>
          
          <div className="text-center text-gray-500 text-sm">или</div>
          
          <button
            onClick={handleCreateWallet}
            disabled={isConnecting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            {isConnecting ? 'Создание...' : 'Создать новый кошелек'}
          </button>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ⚠️ Убедитесь, что у вас есть доступ к кошельку. Без приватного ключа или seed-фразы вы не сможете получить доступ к средствам.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WalletManager
