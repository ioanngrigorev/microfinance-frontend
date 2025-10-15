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
                  
                  {/* Email input and CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                    <input
                      type="email"
                      placeholder="Email адрес"
                      className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                      Начать сейчас →
                    </button>
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

                          {/* Input fields */}
                          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Номер телефона
                              </label>
                              <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                maxLength={12}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
                                placeholder="+15551234567"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={50}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
                                placeholder="user@example.com"
                              />
        </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Цель займа
                              </label>
                              <div className="relative">
                                <select
                                  value={loanPurpose}
                                  onChange={(e) => setLoanPurpose(e.target.value)}
                                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none cursor-pointer pr-8 text-sm"
                                >
                                  <option value="Покупка товаров и услуг">Покупка товаров и услуг</option>
                                  <option value="Медицинские расходы">Медицинские расходы</option>
                                  <option value="Образование">Образование</option>
                                  <option value="Ремонт дома/квартиры">Ремонт дома/квартиры</option>
                                  <option value="Покупка автомобиля">Покупка автомобиля</option>
                                  <option value="Свадьба">Свадьба</option>
                                  <option value="Отпуск/путешествие">Отпуск/путешествие</option>
                                  <option value="Бизнес-нужды">Бизнес-нужды</option>
                                  <option value="Погашение других долгов">Погашение других долгов</option>
                                  <option value="Непредвиденные расходы">Непредвиденные расходы</option>
                                  <option value="Покупка техники">Покупка техники</option>
                                  <option value="Другое">Другое</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
        </div>

                          
                          {/* Quick actions */}
                          <div className="space-y-3">
                            <Link 
                              to="/application"
                              state={{ 
                                amount, 
                                term, 
                                phoneNumber, 
                                email, 
                                loanPurpose 
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-colors block text-center"
                            >
                              Получить деньги
                            </Link>
                            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold">
                              История
                            </button>
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

        {/* Калькулятор */}
        <div className="animated-gradient-bg rounded-3xl p-12 mb-16 shadow-xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка - параметры */}
          <div>


            {/* Дополнительные поля */}
            <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-3">
                      Номер телефона
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      maxLength={12}
                      className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-0 focus:border-white/50 focus:bg-white/30 transition-all duration-200 text-white placeholder-white/60"
                      placeholder="+15551234567"
                    />
                  </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-0 focus:border-white/50 focus:bg-white/30 transition-all duration-200 text-white placeholder-white/60"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  Цель займа
                </label>
                <div className="relative">
                  <select
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:ring-0 focus:border-white/50 focus:bg-white/30 transition-all duration-200 text-white appearance-none cursor-pointer pr-12"
                  >
                    <option value="Покупка товаров и услуг">Покупка товаров и услуг</option>
                    <option value="Медицинские расходы">Медицинские расходы</option>
                    <option value="Образование">Образование</option>
                    <option value="Ремонт дома/квартиры">Ремонт дома/квартиры</option>
                    <option value="Покупка автомобиля">Покупка автомобиля</option>
                    <option value="Свадьба">Свадьба</option>
                    <option value="Отпуск/путешествие">Отпуск/путешествие</option>
                    <option value="Бизнес-нужды">Бизнес-нужды</option>
                    <option value="Погашение других долгов">Погашение других долгов</option>
                    <option value="Непредвиденные расходы">Непредвиденные расходы</option>
                    <option value="Покупка техники">Покупка техники</option>
                    <option value="Другое">Другое</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - результаты */}
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8">Расчет займа</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-white/30">
                <span className="text-white/80 font-medium">Сумма займа</span>
                <span className="text-2xl font-bold text-white">${amount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-white/30">
                <span className="text-white/80 font-medium">Срок</span>
                <span className="text-2xl font-bold text-white">{term} месяцев</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-white/30">
                <span className="text-white/80 font-medium">Проценты</span>
                <span className="text-2xl font-bold text-orange-300">${payment.totalInterest}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b-2 border-white/40">
                <span className="text-white/80 font-medium">Месячный платеж</span>
                <span className="text-2xl font-bold text-blue-300">${payment.monthlyPayment}</span>
              </div>

              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-white">К возврату</span>
                  <span className="text-4xl font-bold text-green-300">${payment.totalAmount}</span>
                </div>
              </div>
            </div>

            <Link 
              to="/application"
              state={{ 
                amount, 
                term, 
                phoneNumber, 
                email, 
                loanPurpose 
              }}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 block text-center"
            >
              Оформить займ
            </Link>
          </div>
        </div>

      </div>


      </div>
    </div>
  )
}

export default HomePage


