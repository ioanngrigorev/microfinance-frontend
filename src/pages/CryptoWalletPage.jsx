import React, { useState, useEffect } from 'react'
import { useApplication } from '../context/ApplicationContext'
import WalletManager from '../components/WalletManager'
import StablecoinBalance from '../components/StablecoinBalance'
import LoanDisbursement from '../components/LoanDisbursement'

const CryptoWalletPage = () => {
  const { currentApplication, updateApplicationStatus } = useApplication()
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleWalletConnected = (address) => {
    setWalletAddress(address)
    setIsAuthenticated(!!address)
    // Обновляем заявку с адресом кошелька
    if (currentApplication && currentApplication.status === 'APPROVED') {
      updateApplicationStatus(currentApplication.phoneNumber, 'APPROVED', 'Кошелек подключен')
    }
  }

  const handleLoanDisbursement = async (loanAmount) => {
    // После успешной выдачи займа обновляем статус
    if (currentApplication) {
      await updateApplicationStatus(currentApplication.phoneNumber, 'DISBURSED', 'Средства выданы на кошелек')
    }
  }

  const handleWalletCreated = (address) => {
    setWalletAddress(address)
    setIsAuthenticated(true)
  }

  const handleDisbursementComplete = (txHash, token, amount) => {
    console.log('Займ выдан:', { txHash, token, amount })
    // Можно добавить уведомление или перенаправление
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Крипто кошелек
            </h1>
            <p className="text-xl text-gray-600">
              Управляйте своими стейблкоинами и получайте займы
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Левая колонка - управление кошельком */}
            <div className="space-y-6">
              <WalletManager
                onWalletConnected={handleWalletConnected}
                onWalletCreated={handleWalletCreated}
              />
              
              {isAuthenticated && walletAddress && (
                <StablecoinBalance walletAddress={walletAddress} />
              )}
            </div>

            {/* Правая колонка - выдача займов */}
            <div className="space-y-6">
              {isAuthenticated && walletAddress ? (
                <>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Быстрая выдача займа
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setSelectedLoan({ amount: 500, term: 1 })}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            selectedLoan?.amount === 500
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-bold text-lg">$500</div>
                          <div className="text-sm text-gray-600">1 месяц</div>
                        </button>
                        
                        <button
                          onClick={() => setSelectedLoan({ amount: 1000, term: 3 })}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            selectedLoan?.amount === 1000
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-bold text-lg">$1,000</div>
                          <div className="text-sm text-gray-600">3 месяца</div>
                        </button>
                        
                        <button
                          onClick={() => setSelectedLoan({ amount: 2500, term: 6 })}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            selectedLoan?.amount === 2500
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-bold text-lg">$2,500</div>
                          <div className="text-sm text-gray-600">6 месяцев</div>
                        </button>
                        
                        <button
                          onClick={() => setSelectedLoan({ amount: 5000, term: 12 })}
                          className={`p-4 border rounded-lg text-center transition-colors ${
                            selectedLoan?.amount === 5000
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-bold text-lg">$5,000</div>
                          <div className="text-sm text-gray-600">12 месяцев</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {selectedLoan && (
                    <LoanDisbursement
                      loanAmount={selectedLoan.amount}
                      loanTerm={selectedLoan.term}
                      walletAddress={walletAddress}
                      onDisbursementComplete={handleLoanDisbursement}
                    />
                  )}
                </>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Подключите кошелек
                    </h3>
                    <p className="text-gray-600">
                      Для выдачи займа необходимо подключить крипто кошелек
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Информация о стейблкоинах */}
          <div className="mt-12 bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Что такое стейблкоины?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Стабильная стоимость</h3>
                <p className="text-gray-600 text-sm">
                  Стейблкоины привязаны к доллару США и не подвержены волатильности
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Быстрые переводы</h3>
                <p className="text-gray-600 text-sm">
                  Переводы стейблкоинов происходят за минуты, а не дни
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Глобальность</h3>
                <p className="text-gray-600 text-sm">
                  Работают по всему миру без ограничений и границ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoWalletPage
