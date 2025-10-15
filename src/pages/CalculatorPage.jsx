import { useState } from 'react'
import { Link } from 'react-router-dom'

function CalculatorPage() {
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(30)
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Кредитный калькулятор 🧮
        </h1>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
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
                state={{ amount, term }}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition block text-center"
              >
                Оформить займ
              </Link>
            </div>
          </div>
        </div>

        {/* Примеры */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
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
    </div>
  )
}

export default CalculatorPage


