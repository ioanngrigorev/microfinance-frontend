import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useApplication } from '../context/ApplicationContext'

function HomePage() {
  const { registerUser } = useApplication()
  const [amount, setAmount] = useState(1000)
  const [term, setTerm] = useState(12)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const calculatePayment = () => {
    const interestRate = 10 // 10% годовых
    const totalInterest = (amount * interestRate * term) / 12 / 100
    const totalAmount = amount + totalInterest
    return {
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    }
  }

  const payment = calculatePayment()

  const handlePhoneChange = (e) => {
    let value = e.target.value
    
    // Удаляем все символы кроме + и цифр
    value = value.replace(/[^\d+]/g, '')
    
    // Если начинается не с +, добавляем +
    if (value && !value.startsWith('+')) {
      value = '+' + value
    }
    
    // Ограничиваем до + и 11 цифр (максимум 12 символов)
    if (value.length > 12) {
      value = value.substring(0, 12)
    }
    
    setPhoneNumber(value)
    if (phoneError) setPhoneError('')
  }

  const handleGetMoney = async () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Пожалуйста, введите номер телефона')
      return
    }
    
    // Проверяем формат: + и 11 цифр
    const phoneRegex = /^\+[0-9]{11}$/
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Введите номер в формате +7XXXXXXXXXX (11 цифр после +)')
      return
    }
    
    setIsRegistering(true)
    setPhoneError('')
    
    try {
      // Регистрируем пользователя со статусом REGISTERED
      await registerUser(phoneNumber)
      
      // Переход на страницу анкеты
      window.location.href = `/application?amount=${amount}&term=${term}&phone=${encodeURIComponent(phoneNumber)}`
    } catch (error) {
      setPhoneError('Ошибка регистрации. Попробуйте еще раз.')
      console.error('Ошибка регистрации пользователя:', error)
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Левая колонка - контент */}
          <div>
            {/* Баннер */}
            <div className="bg-black text-white rounded-xl p-4 mb-8 inline-block">
              <span className="text-sm">Кредиты без ограничений • Попробуйте сейчас →</span>
            </div>
            
            {/* Заголовок */}
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Кредиты в стейблкоинах
            </h2>
            
            {/* Описание */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Human Fintech помогает частным клиентам получать займы в стабильной цифровой валюте за минуты, без бюрократии и границ.
            </p>
            
            {/* Форма */}
            <div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      phoneError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+7XXXXXXXXXX"
                    maxLength="12"
                    required
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-2">{phoneError}</p>
                  )}
                </div>
                <button
                  onClick={handleGetMoney}
                  disabled={isRegistering}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
                >
                  {isRegistering ? 'Регистрация...' : 'Получить деньги →'}
                </button>
              </div>
            </div>
          </div>

          {/* Правая колонка - мобильное приложение */}
          <div className="flex justify-center">
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-4 shadow-2xl max-w-sm">
              {/* Мобильный экран */}
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Статус бар */}
                <div className="bg-white px-4 py-2 flex justify-between items-center text-sm">
                  <span className="font-semibold">9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                </div>
                
                {/* Заголовок приложения */}
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900">Выбери сумму и срок кредита</h3>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Контент приложения */}
                <div className="p-4 space-y-6">
                  {/* Сумма займа */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Сумма займа</h4>
                    <div className="relative">
                      <input
                        type="range"
                        min="100"
                        max="10000"
                        step="100"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider-blue"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((amount - 100) / (10000 - 100)) * 100}%, #dbeafe ${((amount - 100) / (10000 - 100)) * 100}%, #dbeafe 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$100</span>
                        <span>$10,000</span>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-2xl font-bold text-gray-900">${amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Срок займа */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Срок займа</h4>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="1"
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider-blue"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((term - 1) / (12 - 1)) * 100}%, #dbeafe ${((term - 1) / (12 - 1)) * 100}%, #dbeafe 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 месяц</span>
                        <span>12 месяцев</span>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-lg font-semibold text-gray-900">{term} месяцев</span>
                    </div>
                  </div>
                  
                  {/* Результат */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">К возврату</p>
                      <p className="text-3xl font-bold text-green-600">${payment.totalAmount}</p>
                      <p className="text-xs text-gray-500 mt-1">При ставке 10% годовых</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Финальные условия продукта будут сформированы после проверки ваших документов
                      </p>
                    </div>
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


