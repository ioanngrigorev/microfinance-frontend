import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'bg-white/20' : 'hover:bg-white/10'
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            💰 МикроФинанс
          </Link>
          
          <div className="flex gap-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-white transition ${isActive('/')}`}
            >
              Главная
            </Link>
            <Link 
              to="/calculator" 
              className={`px-4 py-2 rounded-lg text-white transition ${isActive('/calculator')}`}
            >
              Калькулятор
            </Link>
            <Link 
              to="/products" 
              className={`px-4 py-2 rounded-lg text-white transition ${isActive('/products')}`}
            >
              Продукты
            </Link>
            <Link 
              to="/application" 
              className={`px-4 py-2 rounded-lg text-white transition bg-green-500 hover:bg-green-600`}
            >
              Оформить займ
            </Link>
            <Link 
              to="/personal-account" 
              className={`px-4 py-2 rounded-lg text-white transition bg-yellow-500 hover:bg-yellow-600 ${isActive('/personal-account')}`}
            >
              Личный кабинет
            </Link>
            <Link 
              to="/admin" 
              className={`px-4 py-2 rounded-lg text-white transition bg-purple-500 hover:bg-purple-600 ${isActive('/admin')}`}
            >
              Админ
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header


