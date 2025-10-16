import { Link } from 'react-router-dom'
import { useState } from 'react'

function HomePage() {
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(12)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loanPurpose, setLoanPurpose] = useState('Покупка товаров и услуг')
  const interestRate = 20.0 // 20% годовых

  const calculatePayment = () => {
    // 20% годовых = 20/12% в месяц
    const monthlyRate = interestRate / 12
    const totalInterest = (amount * monthlyRate * term) / 100
    const totalAmount = amount + totalInterest
    return {
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      monthlyPayment: (totalAmount / term).toFixed(2)
    }
  }

  const payment = calculatePayment()
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">

        {/* Hero Section - Stripe Style */}
        <div className="relative overflow-hidden animated-gradient-bg rounded-3xl mb-16">
          
          <div className="relative px-12 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left side - Content */}
                <div className="space-y-8">
                  {/* Pill-shaped CTA */}
                  <div className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>Human Fintech 2025</span>
                    <span className="ml-2">•</span>
                    <span className="ml-2">Попробуйте сейчас →</span>
                  </div>
                  
                  {/* Main headline */}
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Финансовая инфраструктура
                    <br />
                    <span className="text-gray-700">для роста вашего дохода</span>
          </h1>
                  
                  {/* Description */}
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    Присоединяйтесь к тысячам клиентов, которые используют Human Fintech для получения кредитов в стейблкоинах, 
                    создания крипто-кошельков, управления финансами и построения более прибыльного бизнеса.
                  </p>
                  
                  {/* Phone input and CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                    <input
                      type="tel"
                      placeholder="Номер телефона"
                      maxLength={12}
                      className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                    <Link 
                      to="/application"
                      state={{ 
                        amount: 1000, 
                        term: 12
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap text-center"
                    >
                      Получить деньги →
                    </Link>
                  </div>
                </div>
                
                {/* Right side - Mobile App Widget */}
                <div className="relative flex justify-center">
                  <div className="relative">
                    {/* Mobile phone frame */}
                    <div className="w-80 h-[700px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                        
                        {/* Status bar */}
                        <div className="bg-white px-6 py-3 flex justify-between items-center text-xs text-gray-600">
                          <span>9:41</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                            <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                            <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* App header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                          <div className="flex items-center justify-between text-white">
                            <div>
                              <h2 className="text-lg font-bold">Human Fintech</h2>
                              <p className="text-sm opacity-90">Кредитный лимит</p>
                            </div>
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-sm">👤</span>
                            </div>
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="p-6 space-y-6">
                          {/* Credit calculator sliders */}
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                            {/* Сумма займа slider */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Сумма займа
                                </label>
                                <div className="text-lg font-bold text-gray-900">
                                  ${amount.toLocaleString()}
                                </div>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="10000"
                                step="10"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$10</span>
                                <span>$10,000</span>
                              </div>
                            </div>

                            {/* Срок займа slider */}
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Срок займа
                                </label>
                                <div className="text-lg font-bold text-gray-900">
                                  {term} месяцев
                                </div>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="36"
                                step="1"
                                value={term}
                                onChange={(e) => setTerm(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1 месяц</span>
                                <span>36 месяцев</span>
                              </div>
                            </div>
                          </div>

                          {/* К возврату */}
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-700 mb-2">К возврату</div>
                              <div className="text-3xl font-bold text-green-600 mb-2">
                                ${(amount * 1.10).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                При ставке 10% годовых
                              </div>
                              <div className="text-xs text-gray-500 bg-gray-100 rounded-lg p-2">
                                💡 Финальные условия продукта будут сформированы после проверки ваших документов
                              </div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Статистика</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center">
                                <div className="text-xl font-bold text-gray-900">20%</div>
                                <div className="text-xs text-gray-600">Годовая ставка</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xl font-bold text-gray-900">24ч</div>
                                <div className="text-xs text-gray-600">На одобрение</div>
          </div>
        </div>
      </div>

                          {/* Recent activity */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Последние операции</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-gray-600">Одобрен займ</span>
                                </div>
                                <span className="text-gray-900 font-medium">+$2,500</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-gray-600">Создан кошелек</span>
                                </div>
                                <span className="text-gray-900 font-medium">USDT</span>
                              </div>
                            </div>
        </div>
        </div>
        </div>
      </div>

                    {/* Floating elements around phone */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-60 animate-bounce"></div>
                    <div className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default HomePage


