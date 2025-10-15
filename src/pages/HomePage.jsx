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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              МикроФинанс
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Современная платформа для быстрых займов. 
              <br />
              <span className="text-blue-400 font-semibold">Получите деньги за 5 минут</span> с помощью ИИ-скоринга.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/application"
                state={{ amount, term, phoneNumber, email, loanPurpose }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105"
              >
                Получить займ сейчас
              </Link>
              <Link 
                to="/calculator"
                className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-white/5"
              >
                Калькулятор займа
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">

        {/* Кредитный калькулятор */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Кредитный калькулятор
          </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка - параметры */}
          <div>
            <div className="mb-8">
              <label className="block text-white text-lg font-semibold mb-4">
                Сумма займа: ${amount}
              </label>
              <input
                type="range"
                min="10"
                max="10000"
                step="10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>$10</span>
                <span>$10,000</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white text-lg font-semibold mb-4">
                Срок займа: {term} дней
              </label>
              <input
                type="range"
                min="1"
                max="365"
                step="1"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>1 день</span>
                <span>365 дней</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-blue-300">
                <span className="font-semibold">Процентная ставка:</span> {interestRate}% в день
              </p>
            </div>

            {/* Дополнительные поля */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Цель займа
                </label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
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
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Расчет займа</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="text-gray-300">Сумма займа:</span>
                <span className="text-xl font-bold text-white">${amount}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="text-gray-300">Срок:</span>
                <span className="text-xl font-bold text-white">{term} дней</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="text-gray-300">Проценты:</span>
                <span className="text-xl font-bold text-orange-400">${payment.totalInterest}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b-2 border-gray-600">
                <span className="text-gray-300">Дневной платеж:</span>
                <span className="text-xl font-bold text-blue-400">${payment.dailyPayment}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold text-white">К возврату:</span>
                <span className="text-3xl font-bold text-green-400">${payment.totalAmount}</span>
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
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105 block text-center"
            >
              Оформить займ
            </Link>
          </div>
        </div>

        {/* Примеры */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Популярные суммы</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => { setAmount(500); setTerm(14) }}
              className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $500 / 14 дней
            </button>
            <button
              onClick={() => { setAmount(1000); setTerm(30) }}
              className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $1,000 / 30 дней
            </button>
            <button
              onClick={() => { setAmount(2000); setTerm(60) }}
              className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $2,000 / 60 дней
            </button>
            <button
              onClick={() => { setAmount(5000); setTerm(180) }}
              className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              $5,000 / 180 дней
            </button>
          </div>
        </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-blue-500/50 transition-all duration-300 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Быстро</h3>
            <p className="text-gray-400">
              Одобрение за 5 минут, деньги на карте за 15 минут
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-green-500/50 transition-all duration-300 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-xl font-bold text-white mb-3">Безопасно</h3>
            <p className="text-gray-400">
              Защита данных и конфиденциальность гарантированы
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 text-center hover:border-purple-500/50 transition-all duration-300 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💳</div>
            <h3 className="text-xl font-bold text-white mb-3">Удобно</h3>
            <p className="text-gray-400">
              Полностью онлайн, без посещения офиса
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-white">$10 - $10,000</div>
              <div className="text-blue-300">Сумма займа</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">1 - 365</div>
              <div className="text-blue-300">Срок займа (дни)</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">2%</div>
              <div className="text-blue-300">Ставка в день</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">24/7</div>
              <div className="text-blue-300">Работаем круглосуточно</div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Как получить займ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-500/20 border border-blue-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Заполните анкету</h3>
              <p className="text-gray-400">Укажите сумму, срок и личные данные</p>
            </div>

            <div className="text-center group">
              <div className="bg-green-500/20 border border-green-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-green-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Получите одобрение</h3>
              <p className="text-gray-400">Выберите подходящий продукт</p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-500/20 border border-purple-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Получите деньги</h3>
              <p className="text-gray-400">Деньги поступят на вашу карту</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


