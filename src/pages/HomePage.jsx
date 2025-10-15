import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-12 mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Быстрые займы онлайн 💸
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Получите деньги на карту за 15 минут без посещения офиса
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/calculator" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Рассчитать займ
            </Link>
            <Link 
              to="/application" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Оформить сейчас
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Быстро</h3>
          <p className="text-gray-600">
            Одобрение за 5 минут, деньги на карте за 15 минут
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Безопасно</h3>
          <p className="text-gray-600">
            Защита данных и конфиденциальность гарантированы
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">💳</div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Удобно</h3>
          <p className="text-gray-600">
            Полностью онлайн, без посещения офиса
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">$10 - $10,000</div>
            <div className="text-blue-200">Сумма займа</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1 - 365</div>
            <div className="text-blue-200">Срок займа (дни)</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2%</div>
            <div className="text-blue-200">Ставка в день</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-200">Работаем круглосуточно</div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-12 bg-white rounded-2xl shadow-2xl p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Как получить займ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Заполните анкету</h3>
            <p className="text-gray-600">Укажите сумму, срок и личные данные</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Получите одобрение</h3>
            <p className="text-gray-600">Выберите подходящий продукт</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Получите деньги</h3>
            <p className="text-gray-600">Деньги поступят на вашу карту</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


