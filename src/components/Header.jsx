import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
  }

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              💰
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              МикроФинанс
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/')}`}
            >
              Главная
            </Link>
            <Link 
              to="/calculator" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/calculator')}`}
            >
              Калькулятор
            </Link>
            <Link 
              to="/products" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/products')}`}
            >
              Продукты
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              to="/application" 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105"
            >
              Оформить займ
            </Link>
            <Link 
              to="/personal-account" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/personal-account')}`}
            >
              Личный кабинет
            </Link>
            <Link 
              to="/admin" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/admin')}`}
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


