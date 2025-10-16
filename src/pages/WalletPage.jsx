import React, { useState } from 'react'
import { useApplication } from '../context/ApplicationContext'
import WalletManager from '../components/WalletManager'
import StablecoinBalance from '../components/StablecoinBalance'
import LoanDisbursement from '../components/LoanDisbursement'
import ApplicationStatus from '../components/ApplicationStatus'

function WalletPage() {
  const { currentApplication, updateApplicationStatus, updatePaymentStatus } = useApplication()
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showApplicationStatus, setShowApplicationStatus] = useState(false)
  const [activeTab, setActiveTab] = useState('wallet') // 'wallet' или 'applications'

  const handleWalletConnected = async (address) => {
    setWalletAddress(address)
    setIsAuthenticated(!!address)
    
    // Обновляем статус на PAID при подключении кошелька
    if (address && currentApplication) {
      try {
        await updatePaymentStatus(currentApplication.phoneNumber, true, address)
      } catch (error) {
        console.error('Ошибка обновления статуса оплаты:', error)
      }
    }
  }

  const handleWalletCreated = (address) => {
    setWalletAddress(address)
    setIsAuthenticated(true)
  }

  const handleLoanDisbursement = async (loanAmount) => {
    // После успешной выдачи займа обновляем статус
    if (currentApplication) {
      await updateApplicationStatus(currentApplication.phoneNumber, 'DISBURSED', 'Средства выданы на кошелек')
    }
  }

  const handleCheckApplication = () => {
    if (phoneNumber.trim()) {
      setShowApplicationStatus(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Кошелек</h1>
          
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'wallet'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Крипто кошелек
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'applications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Мои заявки
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'wallet' ? (
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
                        Выберите сумму займа
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
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
                        Для получения займов необходимо подключить крипто кошелек
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Проверка заявки */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Проверить статус заявки</h2>
                <p className="text-gray-600 mb-4">
                  Введите номер телефона, который вы использовали при подаче заявки
                </p>
                
                <div className="flex gap-4">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleCheckApplication}
                    disabled={!phoneNumber.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Проверить
                  </button>
                </div>
              </div>

              {/* Статус заявки */}
              {showApplicationStatus && (
                <ApplicationStatus phoneNumber={phoneNumber} />
              )}

              {/* Информация о системе */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">О системе</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Простая подача</h3>
                    <p className="text-gray-600 text-sm">
                      Подайте заявку за несколько минут, указав только номер телефона
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Быстрое рассмотрение</h3>
                    <p className="text-gray-600 text-sm">
                      Наши специалисты рассмотрят заявку в течение 24 часов
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Крипто займы</h3>
                    <p className="text-gray-600 text-sm">
                      Получайте займы в стейблкоинах прямо на ваш кошелек
                    </p>
                  </div>
                </div>
              </div>

              {/* Статусы заявок */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Статусы заявок</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⏳</span>
                    <div>
                      <h3 className="font-semibold text-yellow-600">Ожидает верификации</h3>
                      <p className="text-sm text-gray-600">Заявка подана и ожидает рассмотрения администратором</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <h3 className="font-semibold text-green-600">Одобрена</h3>
                      <p className="text-sm text-gray-600">Заявка одобрена, можно подключать кошелек для получения средств</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <h3 className="font-semibold text-red-600">Отклонена</h3>
                      <p className="text-sm text-gray-600">Заявка отклонена, проверьте комментарии администратора</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <h3 className="font-semibold text-blue-600">Средства выданы</h3>
                      <p className="text-sm text-gray-600">Займ переведен на ваш крипто кошелек</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletPage
