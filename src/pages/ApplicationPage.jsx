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
    phoneNumber: location.state?.phoneNumber || '+1 (555) 123-4567',
    loanPurpose: location.state?.loanPurpose || 'Покупка товаров и услуг',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: location.state?.email || 'ivan@example.com',
    country: 'US',
    bankName: 'Bank of America',
    accountNumber: '1234567890'
  })

  const [errors, setErrors] = useState({})

  // Данные о странах и банках
  const countriesAndBanks = {
    'US': {
      name: '🇺🇸 США',
      banks: [
        'Bank of America',
        'JPMorgan Chase',
        'Wells Fargo',
        'Citibank',
        'US Bank',
        'PNC Bank',
        'Capital One',
        'TD Bank',
        'HSBC Bank USA',
        'Regions Bank'
      ]
    },
    'RU': {
      name: '🇷🇺 Россия',
      banks: [
        'Сбербанк',
        'ВТБ',
        'Альфа-Банк',
        'Газпромбанк',
        'Райффайзенбанк',
        'Тинькофф Банк',
        'Россельхозбанк',
        'Почта Банк',
        'ЮниКредит Банк',
        'Росбанк'
      ]
    },
    'DE': {
      name: '🇩🇪 Германия',
      banks: [
        'Deutsche Bank',
        'Commerzbank',
        'HypoVereinsbank',
        'Sparkasse',
        'Volksbank',
        'Postbank',
        'ING-DiBa',
        'DKB',
        'Consorsbank',
        'Targobank'
      ]
    },
    'GB': {
      name: '🇬🇧 Великобритания',
      banks: [
        'HSBC',
        'Barclays',
        'Lloyds Bank',
        'NatWest',
        'Santander UK',
        'Nationwide',
        'TSB',
        'Halifax',
        'First Direct',
        'Metro Bank'
      ]
    },
    'FR': {
      name: '🇫🇷 Франция',
      banks: [
        'BNP Paribas',
        'Crédit Agricole',
        'Société Générale',
        'Crédit Mutuel',
        'La Banque Postale',
        'LCL',
        'HSBC France',
        'CIC',
        'Banque Populaire',
        'Crédit du Nord'
      ]
    },
    'IT': {
      name: '🇮🇹 Италия',
      banks: [
        'Intesa Sanpaolo',
        'UniCredit',
        'Banco BPM',
        'Banca Popolare di Sondrio',
        'Banca Sella',
        'Monte dei Paschi di Siena',
        'Banca Popolare di Milano',
        'UBI Banca',
        'Banca Nazionale del Lavoro',
        'Credito Emiliano'
      ]
    },
    'ES': {
      name: '🇪🇸 Испания',
      banks: [
        'Santander',
        'BBVA',
        'CaixaBank',
        'Bankia',
        'Sabadell',
        'Unicaja',
        'Ibercaja',
        'Abanca',
        'Kutxabank',
        'Liberbank'
      ]
    },
    'CA': {
      name: '🇨🇦 Канада',
      banks: [
        'Royal Bank of Canada',
        'TD Canada Trust',
        'Scotiabank',
        'Bank of Montreal',
        'CIBC',
        'National Bank of Canada',
        'Desjardins',
        'HSBC Bank Canada',
        'Tangerine',
        'PC Financial'
      ]
    },
    'AU': {
      name: '🇦🇺 Австралия',
      banks: [
        'Commonwealth Bank',
        'Westpac',
        'ANZ',
        'National Australia Bank',
        'Bendigo Bank',
        'Suncorp Bank',
        'Bank of Queensland',
        'ING Australia',
        'Macquarie Bank',
        'St.George Bank'
      ]
    },
    'JP': {
      name: '🇯🇵 Япония',
      banks: [
        'MUFG Bank',
        'Mizuho Bank',
        'Sumitomo Mitsui Banking',
        'Resona Bank',
        'Saitama Resona Bank',
        'Shizuoka Bank',
        'Hokuriku Bank',
        'Chiba Bank',
        'Bank of Yokohama',
        'Shinwa Bank'
      ]
    },
    'CN': {
      name: '🇨🇳 Китай',
      banks: [
        'Industrial and Commercial Bank of China',
        'China Construction Bank',
        'Agricultural Bank of China',
        'Bank of China',
        'Bank of Communications',
        'China Merchants Bank',
        'China Minsheng Bank',
        'China Everbright Bank',
        'Ping An Bank',
        'China Citic Bank'
      ]
    },
    'IN': {
      name: '🇮🇳 Индия',
      banks: [
        'State Bank of India',
        'HDFC Bank',
        'ICICI Bank',
        'Axis Bank',
        'Kotak Mahindra Bank',
        'Punjab National Bank',
        'Bank of Baroda',
        'Canara Bank',
        'Union Bank of India',
        'Indian Bank'
      ]
    },
    'BR': {
      name: '🇧🇷 Бразилия',
      banks: [
        'Banco do Brasil',
        'Caixa Econômica Federal',
        'Bradesco',
        'Itaú Unibanco',
        'Santander Brasil',
        'Banco Safra',
        'Banco Votorantim',
        'Banco Inter',
        'Nubank',
        'Banco Original'
      ]
    }
  }

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

  const handleCountryChange = (e) => {
    const countryCode = e.target.value
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      bankName: countriesAndBanks[countryCode]?.banks[0] || ''
    }))
  }

  const validateStep1 = () => {
    // Упрощенная валидация для демо
    return true
  }

  const handleStep1Submit = async (e) => {
    e.preventDefault()
    
    if (!validateStep1()) {
      return
    }

    setLoading(true)

    try {
      // Переходим к скорингу
      setStep(2)
    } catch (error) {
      setErrors({ submit: 'Ошибка при отправке заявки. Попробуйте позже.' })
    } finally {
      setLoading(false)
    }
  }

  const handleScoringComplete = () => {
    // Моковые данные для демо
    const mockProducts = [
      {
        id: 1,
        name: 'Экспресс займ',
        amount: formData.amount,
        term: formData.termDays,
        rate: 2.0,
        totalAmount: (formData.amount * 1.6).toFixed(2),
        sessionId: 'demo-session-123'
      },
      {
        id: 2,
        name: 'Стандарт',
        amount: formData.amount,
        term: formData.termDays,
        rate: 1.8,
        totalAmount: (formData.amount * 1.54).toFixed(2),
        sessionId: 'demo-session-123'
      },
      {
        id: 3,
        name: 'Максимум',
        amount: formData.amount,
        term: formData.termDays,
        rate: 1.5,
        totalAmount: (formData.amount * 1.45).toFixed(2),
        sessionId: 'demo-session-123'
      }
    ]
    
    setProducts(mockProducts)
    setStep(3)
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setStep(4)
  }

  const validateStep3 = () => {
    // Упрощенная валидация для демо
    return true
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep3()) {
      return
    }

    setLoading(true)

    try {
      // Моковая отправка для демо
      setTimeout(() => {
        setStep(5)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setErrors({ submit: 'Ошибка при финальной отправке. Попробуйте позже.' })
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
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Скоринг</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Продукты</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                4
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Верификация</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 5 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 5 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
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
            
            {/* Отображение данных из калькулятора */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Ваши параметры займа:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Сумма:</span> ${formData.amount}</div>
                <div><span className="font-medium">Срок:</span> {formData.termDays} дней</div>
                <div><span className="font-medium">Телефон:</span> {formData.phoneNumber}</div>
                <div><span className="font-medium">Email:</span> {formData.email}</div>
                <div className="col-span-2"><span className="font-medium">Цель:</span> {formData.loanPurpose}</div>
              </div>
            </div>

            <form onSubmit={handleStep1Submit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Страна *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  {Object.entries(countriesAndBanks).map(([code, data]) => (
                    <option key={code} value={code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Название банка *
                </label>
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  {countriesAndBanks[formData.country]?.banks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
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
                  placeholder="Введите номер банковского счета"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Отправка на рассмотрение...' : 'Отправить на рассмотрение →'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Скоринг */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Анализ вашей заявки</h2>
              <p className="text-gray-600 text-lg">
                Мы анализируем ваши данные и подбираем оптимальные условия займа...
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Проверяем:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Кредитная история</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Доходы и расходы</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Банковские данные</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Скоринг-модель</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Риск-анализ</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Подбор продуктов</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-3 mb-4">
                <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
              <p className="text-gray-600">Анализ завершен на 75%</p>
            </div>

            <button
              onClick={handleScoringComplete}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold transition"
            >
              Продолжить к продуктам →
            </button>
          </div>
        )}

        {/* Step 3: Выбор продукта */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 3: Выберите продукт</h2>
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

        {/* Step 4: Верификация */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 4: Верификация счета</h2>
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
                  Страна *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  {Object.entries(countriesAndBanks).map(([code, data]) => (
                    <option key={code} value={code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Название банка *
                </label>
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  {countriesAndBanks[formData.country]?.banks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
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
                  onClick={() => setStep(3)}
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

        {/* Step 5: Успех */}
        {step === 5 && (
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


