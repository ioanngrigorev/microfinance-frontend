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
        <div className="bg-white rounded-3xl p-12 mb-16 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Кредитный калькулятор
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Рассчитайте условия займа за несколько секунд
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
                  {term} дней
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="365"
                step="1"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                <span>1 день</span>
                <span>365 дней</span>
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
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
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
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Цель займа
                </label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900"
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
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Расчет займа</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Сумма займа</span>
                <span className="text-2xl font-bold text-gray-900">${amount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Срок</span>
                <span className="text-2xl font-bold text-gray-900">{term} дней</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Проценты</span>
                <span className="text-2xl font-bold text-orange-600">${payment.totalInterest}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b-2 border-gray-300">
                <span className="text-gray-600 font-medium">Дневной платеж</span>
                <span className="text-2xl font-bold text-blue-600">${payment.dailyPayment}</span>
              </div>

              <div className="bg-white rounded-2xl p-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">К возврату</span>
                  <span className="text-4xl font-bold text-green-600">${payment.totalAmount}</span>
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


