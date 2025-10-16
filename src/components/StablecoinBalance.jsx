import React, { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { stablecoinContracts, erc20ABI } from '../config/moralis'

const StablecoinBalance = ({ walletAddress }) => {
  const { Moralis } = useMoralis()
  const [balances, setBalances] = useState({
    USDC: '0',
    USDT: '0'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress && Moralis) {
      fetchBalances()
    }
  }, [walletAddress, Moralis])

  const fetchBalances = async () => {
    if (!walletAddress || !Moralis) return

    setLoading(true)
    try {
      // Получаем баланс USDC
      const usdcBalance = await Moralis.Web3API.account.getTokenBalances({
        address: walletAddress,
        chain: 'eth',
        token_addresses: [stablecoinContracts.USDC]
      })

      // Получаем баланс USDT
      const usdtBalance = await Moralis.Web3API.account.getTokenBalances({
        address: walletAddress,
        chain: 'eth',
        token_addresses: [stablecoinContracts.USDT]
      })

      setBalances({
        USDC: usdcBalance[0]?.balance || '0',
        USDT: usdtBalance[0]?.balance || '0'
      })
    } catch (error) {
      console.error('Ошибка получения баланса:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatBalance = (balance, decimals = 6) => {
    if (!balance || balance === '0') return '0.00'
    return (parseFloat(balance) / Math.pow(10, decimals)).toFixed(2)
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Баланс стейблкоинов
        </h3>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Баланс стейблкоинов
        </h3>
        <button
          onClick={fetchBalances}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Обновить
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">$</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">USDC</p>
              <p className="text-sm text-gray-600">USD Coin</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatBalance(balances.USDC)} USDC
            </p>
            <p className="text-sm text-gray-600">
              ≈ ${formatBalance(balances.USDC)} USD
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">₮</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">USDT</p>
              <p className="text-sm text-gray-600">Tether USD</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatBalance(balances.USDT)} USDT
            </p>
            <p className="text-sm text-gray-600">
              ≈ ${formatBalance(balances.USDT)} USD
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-600">
            💡 Стейблкоины привязаны к доллару США и имеют стабильную стоимость
          </p>
        </div>
      </div>
    </div>
  )
}

export default StablecoinBalance
