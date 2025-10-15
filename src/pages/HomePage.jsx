import { Link } from 'react-router-dom'
import { useState } from 'react'

function HomePage() {
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(30)
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567')
  const [email, setEmail] = useState('user@example.com')
  const [loanPurpose, setLoanPurpose] = useState('Покупка товаров и услуг')
  const interestRate = 2.0 // 2% в день

  const calculatePayment = () => {
    const totalInterest = (amount * interestRate * term) / 100
    const totalAmount = amount + totalInterest
    return {
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      dailyPayment: (totalAmount / term).toFixed(2)
    }
  }

  const payment = calculatePayment()
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-white">
              МикроФинанс
          </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
              Современная платформа для быстрых займов. 
              <br />
              <span className="text-pink-300 font-semibold">Получите деньги за 5 минут</span> с помощью ИИ-скоринга.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">

        {/* Кредитный калькулятор */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Кредитный калькулятор
          </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка - параметры */}
          <div>
            <div className="mb-8">
              <label className="block text-gray-900 text-lg font-semibold mb-4">
                Сумма займа: ${amount}
              </label>
              <input
                type="range"
                min="10"
                max="10000"
                step="10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$10</span>
                <span>$10,000</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-900 text-lg font-semibold mb-4">
                Срок займа: {term} дней
              </label>
              <input
                type="range"
                min="1"
                max="365"
                step="1"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 день</span>
                <span>365 дней</span>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-700">
                <span className="font-semibold">Процентная ставка:</span> {interestRate}% в день
              </p>
            </div>

            {/* Дополнительные поля */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  Цель займа
                </label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                >
                  <option value="Покупка товаров и услуг">🛒 Покупка товаров и услуг</option>
                  <option value="Медицинские расходы">🏥 Медицинские расходы</option>
                  <option value="Образование">🎓 Образование</option>
                  <option value="Ремонт дома/квартиры">🏠 Ремонт дома/квартиры</option>
                  <option value="Покупка автомобиля">🚗 Покупка автомобиля</option>
                  <option value="Свадьба">💒 Свадьба</option>
                  <option value="Отпуск/путешествие">✈️ Отпуск/путешествие</option>
                  <option value="Бизнес-нужды">💼 Бизнес-нужды</option>
                  <option value="Погашение других долгов">💳 Погашение других долгов</option>
                  <option value="Непредвиденные расходы">⚡ Непредвиденные расходы</option>
                  <option value="Покупка техники">📱 Покупка техники</option>
                  <option value="Другое">📝 Другое</option>
                </select>
              </div>
            </div>
          </div>

          {/* Правая колонка - результаты */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Расчет займа</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="text-gray-600">Сумма займа:</span>
                <span className="text-xl font-bold text-gray-900">${amount}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="text-gray-600">Срок:</span>
                <span className="text-xl font-bold text-gray-900">{term} дней</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="text-gray-600">Проценты:</span>
                <span className="text-xl font-bold text-orange-600">${payment.totalInterest}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b-2 border-gray-400">
                <span className="text-gray-600">Дневной платеж:</span>
                <span className="text-xl font-bold text-purple-600">${payment.dailyPayment}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold text-gray-900">К возврату:</span>
                <span className="text-3xl font-bold text-green-600">${payment.totalAmount}</span>
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
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 block text-center"
            >
              Оформить займ
            </Link>
          </div>
        </div>

        {/* Примеры */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Популярные суммы</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => { setAmount(500); setTerm(14) }}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $500 / 14 дней
            </button>
            <button
              onClick={() => { setAmount(1000); setTerm(30) }}
              className="bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $1,000 / 30 дней
            </button>
            <button
              onClick={() => { setAmount(2000); setTerm(60) }}
              className="bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $2,000 / 60 дней
            </button>
            <button
              onClick={() => { setAmount(5000); setTerm(180) }}
              className="bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $5,000 / 180 дней
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-purple-300 transition-all duration-300 group shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Быстро</h3>
          <p className="text-gray-600">
            Одобрение за 5 минут, деньги на карте за 15 минут
          </p>
        </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-purple-300 transition-all duration-300 group shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Безопасно</h3>
          <p className="text-gray-600">
            Защита данных и конфиденциальность гарантированы
          </p>
        </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-purple-300 transition-all duration-300 group shadow-sm hover:shadow-md">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💳</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Удобно</h3>
          <p className="text-gray-600">
            Полностью онлайн, без посещения офиса
          </p>
        </div>
      </div>

      {/* Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
              <div className="text-4xl font-bold mb-2 text-gray-900">$10 - $10,000</div>
              <div className="text-purple-600">Сумма займа</div>
          </div>
          <div>
              <div className="text-4xl font-bold mb-2 text-gray-900">1 - 365</div>
              <div className="text-purple-600">Срок займа (дни)</div>
          </div>
          <div>
              <div className="text-4xl font-bold mb-2 text-gray-900">2%</div>
              <div className="text-purple-600">Ставка в день</div>
          </div>
          <div>
              <div className="text-4xl font-bold mb-2 text-gray-900">24/7</div>
              <div className="text-purple-600">Работаем круглосуточно</div>
          </div>
        </div>
      </div>

      {/* How it works */}
        <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Как получить займ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-purple-100 border border-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-purple-600">1</span>
            </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Заполните анкету</h3>
            <p className="text-gray-600">Укажите сумму, срок и личные данные</p>
          </div>

            <div className="text-center group">
              <div className="bg-pink-100 border border-pink-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-pink-600">2</span>
            </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Получите одобрение</h3>
            <p className="text-gray-600">Выберите подходящий продукт</p>
          </div>

            <div className="text-center group">
              <div className="bg-green-100 border border-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Получите деньги</h3>
              <p className="text-gray-600">Деньги поступят на вашу карту</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


