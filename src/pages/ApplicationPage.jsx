import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ApplicationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1) // 1: Ожидание, 2: Предодобрение, 3: Оплата, 4: Рассмотрение
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [finalDecision, setFinalDecision] = useState(null) // 'approved' or 'rejected'
  
  const [formData, setFormData] = useState({
    amount: location.state?.amount || 1000,
    termDays: location.state?.term || 30,
    phoneNumber: location.state?.phoneNumber || '+1 (555) 123-4567',
    loanPurpose: location.state?.loanPurpose || 'Покупка товаров и услуг',
    email: location.state?.email || 'user@example.com'
  })

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const [errors, setErrors] = useState({})

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    setStep(3) // Переход к оплате
  }

  const handleCardDataChange = (e) => {
    const { name, value } = e.target
    setCardData(prev => ({
      ...prev,
      [name]: value
    }))
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateCardData = () => {
    const newErrors = {}
    
    if (!cardData.cardNumber || cardData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Введите корректный номер карты'
    }
    
    if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Введите дату в формате MM/YY'
    }
    
    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = 'Введите корректный CVV код'
    }
    
    if (!cardData.cardholderName || cardData.cardholderName.length < 2) {
      newErrors.cardholderName = 'Введите имя держателя карты'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    
    if (!validateCardData()) {
      return
    }

    setLoading(true)
    
    // Имитация обработки платежа
    setTimeout(() => {
      setPaymentCompleted(true)
      setLoading(false)
      setStep(4) // Переход к финальному рассмотрению
    }, 2000)
  }

  // Эффект для автоматического перехода между шагами
  useEffect(() => {
    if (step === 1) {
      // Автоматический переход к предодобрению через 3 секунды
      setLoading(true)
      const preapprovalTimer = setTimeout(() => {
        setLoading(false)
        setStep(2) // Переход к предодобрению
      }, 3000)

      return () => clearTimeout(preapprovalTimer)
    } else if (step === 4) {
      // Финальное рассмотрение
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
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Ожидание</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Предодобрение</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Оплата</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 4 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                ✓
              </div>
              <span className="ml-1 font-semibold hidden lg:inline text-xs">Рассмотрение</span>
            </div>
          </div>
        </div>

        {/* Step 1: Ожидание решения */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Анализ вашей заявки</h2>
              <p className="text-gray-600 text-lg">
                Система принятия решений анализирует ваши данные...
              </p>
            </div>

            {/* Отображение данных из калькулятора */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-blue-800 mb-4">Ваши параметры займа:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Сумма:</span> ${formData.amount}</div>
                <div><span className="font-medium">Срок:</span> {formData.termDays} дней</div>
                <div><span className="font-medium">Телефон:</span> {formData.phoneNumber}</div>
                <div><span className="font-medium">Email:</span> {formData.email}</div>
                <div className="col-span-2"><span className="font-medium">Цель:</span> {formData.loanPurpose}</div>
              </div>
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
              <p className="text-blue-600 font-semibold text-lg">Принимаем предварительное решение...</p>
            )}
          </div>
        )}

        {/* Step 2: Предодобрение */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Предварительное одобрение!</h2>
            <p className="text-gray-600 text-center mb-8">
              🎉 Поздравляем! Система принятия решений предварительно одобрила вашу заявку.
              Выберите один из предложенных продуктов:
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

        {/* Step 3: Оплата */}
        {step === 3 && selectedProduct && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Оплата за создание крипто-счета</h2>
            
            {/* Информация о выбранном продукте */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">✅ Выбранный продукт:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Продукт:</span> {selectedProduct.name}</div>
                <div><span className="font-medium">Сумма займа:</span> ${selectedProduct.amount}</div>
                <div><span className="font-medium">Срок:</span> {selectedProduct.term} дней</div>
                <div><span className="font-medium">Ставка:</span> {selectedProduct.rate}% в день</div>
                <div className="col-span-2"><span className="font-medium">К возврату:</span> ${selectedProduct.totalAmount}</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-6">💳</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Оплата $1 за создание крипто-счета</h3>
              <p className="text-gray-600 mb-6">
                Для получения кредита необходимо оплатить $1 за создание вашего персонального крипто-счета.
                После оплаты заявка будет передана на финальное рассмотрение.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-blue-800 text-lg">
                  <strong>Сумма к оплате:</strong> $1.00 USD
                </p>
                <p className="text-blue-800">
                  <strong>Назначение:</strong> Создание крипто-счета для получения займа
                </p>
              </div>

              {/* Простая форма оплаты */}
              <form onSubmit={handlePaymentSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Данные карты:</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Номер карты *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardDataChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Срок действия *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardDataChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardDataChange}
                        placeholder="123"
                        maxLength="4"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Имя держателя карты *
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardData.cardholderName}
                      onChange={handleCardDataChange}
                      placeholder="IVAN IVANOV"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 px-8 rounded-lg text-lg font-semibold transition"
                >
                  {loading ? 'Обработка платежа...' : 'Оплатить $1'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 4: Финальное рассмотрение */}
        {step === 4 && paymentCompleted && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">⏳</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Финальное рассмотрение заявки</h2>
              <p className="text-gray-600 text-lg">
                Ваша заявка передана в систему принятия решений для финального рассмотрения...
              </p>
            </div>

            {/* Подтверждение оплаты */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">✅ Оплата успешно завершена!</h3>
              <p className="text-green-700">
                Комиссия $1 успешно списана с вашей карты. Крипто-счет создан.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Финальная проверка:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Оплата подтверждена
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Крипто-счет создан
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Документы проверены
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Риск-анализ завершен
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Скоринг пройден
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✔</span> Финальное решение
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-3 mb-4">
                <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{width: '95%'}}></div>
              </div>
              <p className="text-gray-600">Рассмотрение завершено на 95%</p>
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
                  Поздравляем! Ваша заявка на займ успешно одобрена системой принятия решений.
                  Средства будут переведены на ваш крипто-счет в течение 24 часов.
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
                  К сожалению, система принятия решений отклонила вашу заявку на займ.
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