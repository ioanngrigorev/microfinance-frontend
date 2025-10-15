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
    <div className="container mx-auto px-4 py-12">

      {/* Кредитный калькулятор */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Кредитный калькулятор 🧮
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка - параметры */}
          <div>
            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-semibold mb-4">
                Сумма займа: ${amount}
              </label>
              <input
                type="range"
                min="10"
                max="10000"
                step="10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$10</span>
                <span>$10,000</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 text-lg font-semibold mb-4">
                Срок займа: {term} дней
              </label>
              <input
                type="range"
                min="1"
                max="365"
                step="1"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 день</span>
                <span>365 дней</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Процентная ставка:</span> {interestRate}% в день
              </p>
            </div>

            {/* Дополнительные поля */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Цель займа
                </label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Расчет займа</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="text-gray-600">Сумма займа:</span>
                <span className="text-xl font-bold text-gray-800">${amount}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="text-gray-600">Срок:</span>
                <span className="text-xl font-bold text-gray-800">{term} дней</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                <span className="text-gray-600">Проценты:</span>
                <span className="text-xl font-bold text-orange-600">${payment.totalInterest}</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b-2 border-gray-400">
                <span className="text-gray-600">Дневной платеж:</span>
                <span className="text-xl font-bold text-blue-600">${payment.dailyPayment}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold text-gray-800">К возврату:</span>
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
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition block text-center"
            >
              Оформить займ
            </Link>
          </div>
        </div>

        {/* Примеры */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Популярные суммы</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => { setAmount(500); setTerm(14) }}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 rounded-lg font-semibold transition"
            >
              $500 / 14 дней
            </button>
            <button
              onClick={() => { setAmount(1000); setTerm(30) }}
              className="bg-green-100 hover:bg-green-200 text-green-800 py-3 rounded-lg font-semibold transition"
            >
              $1,000 / 30 дней
            </button>
            <button
              onClick={() => { setAmount(2000); setTerm(60) }}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-3 rounded-lg font-semibold transition"
            >
              $2,000 / 60 дней
            </button>
            <button
              onClick={() => { setAmount(5000); setTerm(180) }}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 py-3 rounded-lg font-semibold transition"
            >
              $5,000 / 180 дней
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Быстро</h3>
          <p className="text-gray-600">
            Одобрение за 5 минут, деньги на карте за 15 минут
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Безопасно</h3>
          <p className="text-gray-600">
            Защита данных и конфиденциальность гарантированы
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">💳</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Удобно</h3>
          <p className="text-gray-600">
            Полностью онлайн, без посещения офиса
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">$10 - $10,000</div>
            <div className="text-blue-200">Сумма займа</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1 - 365</div>
            <div className="text-blue-200">Срок займа (дни)</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2%</div>
            <div className="text-blue-200">Ставка в день</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-200">Работаем круглосуточно</div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-12 bg-white rounded-2xl shadow-2xl p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Как получить займ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Заполните анкету</h3>
            <p className="text-gray-600">Укажите сумму, срок и личные данные</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Получите одобрение</h3>
            <p className="text-gray-600">Выберите подходящий продукт</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Получите деньги</h3>
            <p className="text-gray-600">Деньги поступят на вашу карту</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


