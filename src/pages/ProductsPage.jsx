import { Link } from 'react-router-dom'

function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Экспресс займ',
      icon: '⚡',
      color: 'blue',
      minAmount: 10,
      maxAmount: 1000,
      minTerm: 1,
      maxTerm: 30,
      rate: 2.0,
      features: [
        'Одобрение за 5 минут',
        'Без справок о доходах',
        'Первый займ под 0%',
        'Онлайн оформление'
      ]
    },
    {
      id: 2,
      name: 'Стандарт',
      icon: '💼',
      color: 'green',
      minAmount: 500,
      maxAmount: 5000,
      minTerm: 30,
      maxTerm: 180,
      rate: 1.8,
      features: [
        'Выгодная ставка 1.8%',
        'До $5,000',
        'Гибкие условия',
        'Возможность продления'
      ]
    },
    {
      id: 3,
      name: 'Максимум',
      icon: '💎',
      color: 'purple',
      minAmount: 2000,
      maxAmount: 10000,
      minTerm: 90,
      maxTerm: 365,
      rate: 1.5,
      features: [
        'Максимальная сумма',
        'Минимальная ставка 1.5%',
        'Длительный срок',
        'Персональный менеджер'
      ]
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        gradient: 'from-green-500 to-green-600',
        bg: 'bg-green-50',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    }
    return colors[color]
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Наши продукты 💳
        </h1>
        <p className="text-xl text-white/90 text-center mb-12">
          Выберите подходящий вариант займа
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const colors = getColorClasses(product.color)
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white text-center`}>
                  <div className="text-6xl mb-3">{product.icon}</div>
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Условия */}
                  <div className={`${colors.bg} rounded-lg p-4 mb-6`}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Сумма:</span>
                        <span className={`font-bold ${colors.text}`}>
                          ${product.minAmount} - ${product.maxAmount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Срок:</span>
                        <span className={`font-bold ${colors.text}`}>
                          {product.minTerm} - {product.maxTerm} дней
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ставка:</span>
                        <span className={`font-bold ${colors.text}`}>
                          {product.rate}% в день
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Особенности */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Преимущества:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Кнопка */}
                  <Link
                    to="/application"
                    state={{ productId: product.id, productName: product.name }}
                    className={`w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition block text-center`}
                  >
                    Выбрать продукт
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Как выбрать подходящий продукт?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Экспресс займ</h3>
              <p className="text-gray-600 text-sm">
                Для небольших срочных нужд на короткий срок
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-bold text-gray-800 mb-2">Стандарт</h3>
              <p className="text-gray-600 text-sm">
                Оптимальный вариант для большинства клиентов
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-bold text-gray-800 mb-2">Максимум</h3>
              <p className="text-gray-600 text-sm">
                Для крупных сумм на длительный срок
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage


