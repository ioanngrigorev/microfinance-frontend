import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { stablecoinContracts, erc20ABI, disbursementConfig } from '../config/moralis'

const LoanDisbursement = ({ loanAmount, loanTerm, walletAddress, onDisbursementComplete }) => {
  const { Moralis } = useMoralis()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedToken, setSelectedToken] = useState('USDC')
  const [transactionHash, setTransactionHash] = useState('')
  const [error, setError] = useState('')

  const handleDisburseLoan = async () => {
    if (!walletAddress || !loanAmount) {
      setError('Не указан адрес кошелька или сумма займа')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Конвертируем сумму в wei (для USDC/USDT обычно 6 знаков после запятой)
      const decimals = 6
      const amountInWei = Moralis.Units.Token(loanAmount.toString(), decimals)

      // Выбираем контракт токена
      const tokenContract = selectedToken === 'USDC' 
        ? stablecoinContracts.USDC 
        : stablecoinContracts.USDT

      // Создаем транзакцию для перевода токенов
      const options = {
        contractAddress: tokenContract,
        functionName: 'transfer',
        abi: erc20ABI,
        params: {
          _to: walletAddress,
          _value: amountInWei,
        },
      }

      // Отправляем транзакцию
      const transaction = await Moralis.executeFunction(options)
      
      // Ждем подтверждения транзакции
      await transaction.wait()
      
      setTransactionHash(transaction.hash)
      onDisbursementComplete?.(transaction.hash, selectedToken, loanAmount)
      
    } catch (error) {
      console.error('Ошибка выдачи займа:', error)
      setError(`Ошибка выдачи займа: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2)
  }

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
          
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Посмотреть в Etherscan
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Выдача займа
      </h3>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Детали займа</h4>
          <div className="space-y-1 text-sm text-blue-800">
            <p><span className="font-medium">Сумма:</span> {formatAmount(loanAmount)} USD</p>
            <p><span className="font-medium">Срок:</span> {loanTerm} месяцев</p>
            <p><span className="font-medium">Кошелек:</span> {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Выберите стейблкоин для выдачи
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedToken('USDC')}
              className={`p-3 border rounded-lg text-center transition-colors ${
                selectedToken === 'USDC'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-semibold">USDC</div>
              <div className="text-sm text-gray-600">USD Coin</div>
            </button>
            <button
              onClick={() => setSelectedToken('USDT')}
              className={`p-3 border rounded-lg text-center transition-colors ${
                selectedToken === 'USDT'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-semibold">USDT</div>
              <div className="text-sm text-gray-600">Tether USD</div>
            </button>
          </div>
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
          {isProcessing ? 'Выдача займа...' : `Выдать ${formatAmount(loanAmount)} ${selectedToken}`}
        </button>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ⚠️ Убедитесь, что у вас есть достаточно ETH для оплаты комиссии за транзакцию
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoanDisbursement
