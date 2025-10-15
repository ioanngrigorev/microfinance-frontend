import { Link } from 'react-router-dom'
import { useState } from 'react'

function HomePage() {
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(30)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-900 placeholder-gray-500"
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-900 placeholder-gray-500"
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-gray-900"
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

      </div>


      </div>
    </div>
  )
}

export default HomePage


