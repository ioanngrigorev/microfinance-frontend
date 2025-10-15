import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ApplicationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cryptoWalletCreated, setCryptoWalletCreated] = useState(false)
  const [finalDecision, setFinalDecision] = useState(null) // 'approved' or 'rejected'
  
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
      // Переходим к выбору продуктов
        setStep(2)
    } catch (error) {
      setErrors({ submit: 'Ошибка при отправке заявки. Попробуйте позже.' })
    } finally {
      setLoading(false)
    }
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setStep(3) // Переход к созданию крипто-кошелька
  }

  const handleCryptoWalletCreated = () => {
    setCryptoWalletCreated(true)
    setStep(4) // Переход к ожиданию решения
  }

  // Эффект для автоматического принятия финального решения
  useEffect(() => {
    if (step === 4) {
    setLoading(true)
      const decisionTimer = setTimeout(() => {
        // Имитация финального решения: 70% одобрено, 30% отказано
        const isApproved = Math.random() < 0.7
        setFinalDecision(isApproved ? 'approved' : 'rejected')
      setLoading(false)
        setStep(5) // Переход к финальному результату
      }, 5000) // 5 секунд на "принятие решения"

      return () => clearTimeout(decisionTimer)
    }
  }, [step])

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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Реквизиты</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Продукты</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Крипто</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                4
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Ожидание</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 5 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 5 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                ✓
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Решение</span>
            </div>
          </div>
        </div>

        {/* Step 1: Анкета */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 1: Платежные реквизиты</h2>
            
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

        {/* Step 2: Выбор продуктов */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Шаг 2: Выберите продукт</h2>
            <p className="text-gray-600 text-center mb-8">
              На основе ваших данных мы подобрали 3 оптимальных варианта займа:
            </p>

            {/* Продукты */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div 
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition transform hover:scale-105"
                onClick={() => handleProductSelect({
                  id: 1,
                  name: 'Экспресс займ',
                  amount: formData.amount,
                  term: formData.termDays,
                  rate: 2.0,
                  totalAmount: (formData.amount * 1.6).toFixed(2),
                  description: 'Быстрое одобрение, минимальные требования'
                })}
              >
                <h4 className="text-xl font-bold text-blue-800 mb-3">Экспресс займ</h4>
                <p className="text-gray-600 mb-4">Быстрое одобрение, минимальные требования</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Сумма:</span> ${formData.amount}</p>
                  <p><span className="font-semibold">Срок:</span> {formData.termDays} дней</p>
                  <p><span className="font-semibold">Ставка:</span> 2.0% в день</p>
                  <p className="text-lg font-bold text-green-600">К возврату: ${(formData.amount * 1.6).toFixed(2)}</p>
                </div>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                  Выбрать
                </button>
              </div>

              <div 
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 cursor-pointer transition transform hover:scale-105"
                onClick={() => handleProductSelect({
                  id: 2,
                  name: 'Стандарт',
                  amount: formData.amount,
                  term: formData.termDays,
                  rate: 1.8,
                  totalAmount: (formData.amount * 1.54).toFixed(2),
                  description: 'Оптимальные условия, подходит для большинства'
                })}
              >
                <h4 className="text-xl font-bold text-green-800 mb-3">Стандарт</h4>
                <p className="text-gray-600 mb-4">Оптимальные условия, подходит для большинства</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Сумма:</span> ${formData.amount}</p>
                  <p><span className="font-semibold">Срок:</span> {formData.termDays} дней</p>
                  <p><span className="font-semibold">Ставка:</span> 1.8% в день</p>
                  <p className="text-lg font-bold text-green-600">К возврату: ${(formData.amount * 1.54).toFixed(2)}</p>
                </div>
                <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                  Выбрать
                </button>
              </div>

              <div 
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-500 cursor-pointer transition transform hover:scale-105"
                onClick={() => handleProductSelect({
                  id: 3,
                  name: 'Максимум',
                  amount: formData.amount,
                  term: formData.termDays,
                  rate: 1.5,
                  totalAmount: (formData.amount * 1.45).toFixed(2),
                  description: 'Выгодные условия для постоянных клиентов'
                })}
              >
                <h4 className="text-xl font-bold text-purple-800 mb-3">Максимум</h4>
                <p className="text-gray-600 mb-4">Выгодные условия для постоянных клиентов</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Сумма:</span> ${formData.amount}</p>
                  <p><span className="font-semibold">Срок:</span> {formData.termDays} дней</p>
                  <p><span className="font-semibold">Ставка:</span> 1.5% в день</p>
                  <p className="text-lg font-bold text-green-600">К возврату: ${(formData.amount * 1.45).toFixed(2)}</p>
                </div>
                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition">
                  Выбрать
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Создание крипто-кошелька */}
        {step === 3 && selectedProduct && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Шаг 3: Создание крипто-кошелька</h2>
            
            {/* Информация о выбранном продукте */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Выбранный продукт:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Продукт:</span> {selectedProduct.name}</div>
                <div><span className="font-medium">Сумма займа:</span> ${selectedProduct.amount}</div>
                <div><span className="font-medium">Срок:</span> {selectedProduct.term} дней</div>
                <div><span className="font-medium">Ставка:</span> {selectedProduct.rate}% в день</div>
                <div className="col-span-2"><span className="font-medium">К возврату:</span> ${selectedProduct.totalAmount}</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-6">🔐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Создание безопасного кошелька</h3>
              <p className="text-gray-600 mb-6">
                Мы создадим для вас персональный крипто-кошелек, на который будут переведены средства займа.
                Кошелек будет защищен современными методами шифрования.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  ⚠️ <strong>Важно:</strong> За создание кошелька взимается комиссия $1 для покрытия расходов на безопасность и обслуживание.
                </p>
              </div>

              <button
                onClick={handleCryptoWalletCreated}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition"
              >
                Создать крипто-кошелек и оплатить $1
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Ожидание решения */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ожидание решения</h2>
              <p className="text-gray-600 text-lg">
                Ваша заявка обрабатывается. Мы принимаем финальное решение по вашему займу...
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Проверяем:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Кредитная история
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Доходы и расходы
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Банковские данные
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Скоринг-модель
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Риск-анализ
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Финальная проверка
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-3 mb-4">
                <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{width: '90%'}}></div>
              </div>
              <p className="text-gray-600">Анализ завершен на 90%</p>
            </div>

            {loading && (
              <p className="text-blue-600 font-semibold text-lg">Принимаем финальное решение...</p>
            )}
          </div>
        )}

        {/* Step 5: Финальное решение */}
        {step === 5 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            {finalDecision === 'approved' ? (
              <>
                <div className="text-green-500 text-7xl mb-6">🎉</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Заявка одобрена!</h3>
                <p className="text-gray-600 text-lg mb-8">
                  Поздравляем! Ваша заявка на займ успешно одобрена.
                  Средства будут переведены на ваш крипто-кошелек в течение 24 часов.
                </p>
                <button
                  onClick={() => navigate('/personal-account')}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Перейти в личный кабинет
                </button>
              </>
            ) : (
              <>
                <div className="text-red-500 text-7xl mb-6">❌</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Заявка отклонена</h3>
                <p className="text-gray-600 text-lg mb-8">
                  К сожалению, ваша заявка на займ была отклонена.
                  Вы можете попробовать подать заявку снова позже.
                </p>
            <button
                  onClick={() => setStep(1)}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
                  Подать новую заявку
            </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationPage