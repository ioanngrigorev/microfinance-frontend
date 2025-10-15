import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ApplicationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const [formData, setFormData] = useState({
    amount: location.state?.amount || 1000,
    termDays: location.state?.term || 30,
    phoneNumber: '',
    loanPurpose: '',
    firstName: '',
    lastName: '',
    email: '',
    bankName: '',
    accountNumber: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    
    if (formData.amount < 10 || formData.amount > 10000) {
      newErrors.amount = 'Сумма должна быть от $10 до $10,000'
    }
    
    if (formData.termDays < 1 || formData.termDays > 365) {
      newErrors.termDays = 'Срок должен быть от 1 до 365 дней'
    }
    
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Введите корректный номер телефона'
    }
    
    if (!formData.loanPurpose) {
      newErrors.loanPurpose = 'Выберите цель займа'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Submit = async (e) => {
    e.preventDefault()
    
    if (!validateStep1()) {
      return
    }

    setLoading(true)

    try {
      // Отправляем данные на прескоринг
      const response = await axios.post('/api/prescoring/submit', {
        amountUsd: formData.amount,
        termDays: formData.termDays,
        phoneNumber: formData.phoneNumber,
        loanPurpose: formData.loanPurpose
      })

      if (response.data && response.data.products) {
        setProducts(response.data.products)
        setStep(2)
      }
    } catch (error) {
      setErrors({ submit: 'Ошибка при отправке заявки. Попробуйте позже.' })
    } finally {
      setLoading(false)
    }
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setStep(3)
  }

  const validateStep3 = () => {
    const newErrors = {}
    
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'Введите имя'
    }
    
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Введите фамилию'
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Введите корректный email'
    }
    
    if (!formData.bankName) {
      newErrors.bankName = 'Укажите название банка'
    }
    
    if (!formData.accountNumber || formData.accountNumber.length < 10) {
      newErrors.accountNumber = 'Введите корректный номер счета'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep3()) {
      return
    }

    setLoading(true)

    try {
      // Отправляем полную заявку с верификацией
      const response = await axios.post('/api/verification/submit', {
        ...formData,
        productId: selectedProduct.id,
        sessionId: products[0]?.sessionId // Предполагаем, что sessionId приходит с продуктами
      })

      if (response.data.success) {
        setStep(4)
      }
    } catch (error) {
      setErrors({ submit: 'Ошибка при финальной отправке. Попробуйте позже.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Заявка на займ 📝
        </h1>

        {/* Progress bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Анкета</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Продукты</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Верификация</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                ✓
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Готово</span>
            </div>
          </div>
        </div>

        {/* Step 1: Анкета */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 1: Основная информация</h2>
            <form onSubmit={handleStep1Submit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Сумма займа ($) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="10"
                    max="10000"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Срок (дни) *
                  </label>
                  <input
                    type="number"
                    name="termDays"
                    value={formData.termDays}
                    onChange={handleChange}
                    min="1"
                    max="365"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.termDays ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.termDays && <p className="text-red-500 text-sm mt-1">{errors.termDays}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Цель займа *
                </label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.loanPurpose ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Выберите цель займа</option>
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
                {errors.loanPurpose && <p className="text-red-500 text-sm mt-1">{errors.loanPurpose}</p>}
              </div>

              {errors.submit && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Обработка...' : 'Продолжить →'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Выбор продукта */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 2: Выберите продукт</h2>
            <p className="text-gray-600 mb-6">На основе вашей заявки мы подобрали следующие варианты:</p>
            
            <div className="space-y-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition"
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{product.name || `Продукт ${index + 1}`}</h3>
                        <p className="text-gray-600 mt-2">
                          Сумма: ${product.amount} | Срок: {product.term} дней | Ставка: {product.rate}%
                        </p>
                        <p className="text-lg font-semibold text-green-600 mt-2">
                          К возврату: ${product.totalAmount}
                        </p>
                      </div>
                      <div className="text-3xl">→</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Генерируем продукты...</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              ← Назад
            </button>
          </div>
        )}

        {/* Step 3: Верификация */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 3: Верификация счета</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                ⚠️ Для верификации вашего банковского счета с него будет списана сумма $1. 
                Эта сумма будет зачтена в счет погашения займа.
              </p>
            </div>

            <form onSubmit={handleFinalSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Фамилия *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Название банка *
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Bank of America"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Номер счета *
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
              </div>

              {errors.submit && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-4 rounded-lg font-semibold transition"
                >
                  ← Назад
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition disabled:opacity-50"
                >
                  {loading ? 'Обработка...' : 'Подтвердить'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Успех */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Заявка успешно отправлена!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Мы обработаем вашу заявку в течение 5-10 минут. 
              Деньги поступят на ваш счет после верификации.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700">
                Мы отправили подтверждение на ваш email: <strong>{formData.email}</strong>
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Вернуться на главную
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationPage


