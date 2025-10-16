import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function CryptoAccountPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { product, formData } = location.state || {}
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cryptoData, setCryptoData] = useState({
    walletAddress: '',
    privateKey: '',
    seedPhrase: ''
  })

  // Генерируем моковые данные крипто-кошелька
  const generateWallet = () => {
    const mockWallet = {
      walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
      privateKey: '0x' + Math.random().toString(16).substr(2, 64),
      seedPhrase: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    }
    setCryptoData(mockWallet)
    setStep(2)
  }

  const handlePayment = () => {
    setLoading(true)
    // Имитация оплаты $1
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 2000)
  }

  if (!product || !formData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ошибка</h2>
          <p className="text-gray-600 mb-6">Данные о продукте не найдены.</p>
          <button
            onClick={() => navigate('/application')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
          >
            Вернуться к заявке
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Создание Крипто-Счета 💰
        </h1>

        {/* Progress bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Создание</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Оплата</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                ✓
              </div>
              <span className="ml-2 font-semibold hidden md:inline">Готово</span>
            </div>
          </div>
        </div>

        {/* Step 1: Создание кошелька */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 1: Создание крипто-кошелька</h2>
            
            {/* Информация о продукте */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Выбранный продукт:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Продукт:</span> {product.name}</div>
                <div><span className="font-medium">Сумма займа:</span> ${product.amount}</div>
                <div><span className="font-medium">Срок:</span> {product.term} дней</div>
                <div><span className="font-medium">Ставка:</span> {product.rate}% в день</div>
                <div className="col-span-2"><span className="font-medium">К возврату:</span> ${product.totalAmount}</div>
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
                onClick={generateWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition"
              >
                Создать крипто-кошелек
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Оплата */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Шаг 2: Оплата комиссии</h2>
            
            {/* Данные кошелька */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Ваш крипто-кошелек создан!</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Адрес кошелька:</span>
                  <p className="font-mono bg-gray-100 p-2 rounded mt-1 break-all">{cryptoData.walletAddress}</p>
                </div>
                <div>
                  <span className="font-medium">Приватный ключ:</span>
                  <p className="font-mono bg-gray-100 p-2 rounded mt-1 break-all">{cryptoData.privateKey}</p>
                </div>
                <div>
                  <span className="font-medium">Seed фраза:</span>
                  <p className="font-mono bg-gray-100 p-2 rounded mt-1">{cryptoData.seedPhrase}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">
                🔒 <strong>Безопасность:</strong> Сохраните эти данные в безопасном месте! Без них вы не сможете получить доступ к кошельку.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Оплата комиссии $1</h3>
              <p className="text-gray-600 mb-6">
                Для активации кошелька необходимо оплатить комиссию $1.
                После оплаты средства займа будут переведены на ваш кошелек.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <strong>Сумма к оплате:</strong> $1.00 USD
                </p>
                <p className="text-blue-800">
                  <strong>Назначение:</strong> Комиссия за создание крипто-кошелька
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Обработка платежа...' : 'Оплатить $1'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Готово */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-green-500 text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Кошелек активирован!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Поздравляем! Ваш крипто-кошелек успешно создан и активирован.
              Средства займа будут переведены на ваш кошелек в течение 24 часов.
            </p>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Детали займа:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Продукт:</span> {product.name}</div>
                <div><span className="font-medium">Сумма займа:</span> ${product.amount}</div>
                <div><span className="font-medium">Срок:</span> {product.term} дней</div>
                <div><span className="font-medium">К возврату:</span> ${product.totalAmount}</div>
                <div className="col-span-2"><span className="font-medium">Кошелек:</span> {cryptoData.walletAddress}</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/wallet')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Перейти в личный кабинет
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                На главную
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CryptoAccountPage
