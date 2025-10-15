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

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl mb-16">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-12 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Кредиты в стейблкоинах
                <br />
                <span className="text-blue-200">для всех национальностей</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Получите мгновенный доступ к кредитам в USDT, USDC и других стейблкоинах. 
                Без границ, без ограничений по гражданству. Финансовая свобода для каждого.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Мгновенное одобрение</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Без проверки кредитной истории</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Доступно в любой стране</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Калькулятор */}
        <div className="bg-white rounded-3xl p-12 mb-16 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Рассчитайте ваш займ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Узнайте условия кредита в стейблкоинах за несколько секунд
            </p>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка - параметры */}
          <div>
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <label className="text-gray-700 font-medium">
                  Сумма займа
                </label>
                <div className="text-3xl font-bold text-gray-900">
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
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                <span>$10</span>
                <span>$10,000</span>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <label className="text-gray-700 font-medium">
                  Срок займа
                </label>
                <div className="text-3xl font-bold text-gray-900">
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
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                <span>1 месяц</span>
                <span>36 месяцев</span>
              </div>
            </div>


            {/* Дополнительные поля */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={12}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="+15551234567"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Цель займа
                </label>
                <div className="relative">
                  <select
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 appearance-none cursor-pointer pr-12"
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
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - результаты */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-8">Расчет займа</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-700">
                <span className="text-gray-300 font-medium">Сумма займа</span>
                <span className="text-2xl font-bold text-white">${amount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-700">
                <span className="text-gray-300 font-medium">Срок</span>
                <span className="text-2xl font-bold text-white">{term} месяцев</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-700">
                <span className="text-gray-300 font-medium">Проценты</span>
                <span className="text-2xl font-bold text-orange-400">${payment.totalInterest}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b-2 border-gray-600">
                <span className="text-gray-300 font-medium">Месячный платеж</span>
                <span className="text-2xl font-bold text-blue-400">${payment.monthlyPayment}</span>
              </div>

              <div className="bg-gray-800 rounded-2xl p-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-white">К возврату</span>
                  <span className="text-4xl font-bold text-green-400">${payment.totalAmount}</span>
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


