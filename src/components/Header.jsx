import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <span className="text-3xl font-black text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight">
              Human Fintech
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            <Link 
              to="/application" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              Оформить займ
            </Link>
            <Link 
              to="/crypto-wallet" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive('/crypto-wallet')}`}
            >
              Крипто кошелек
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


