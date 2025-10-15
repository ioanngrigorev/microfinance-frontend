function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-gray-800 py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                💰
              </div>
              <span className="text-xl font-bold text-white">МикроФинанс</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Современная платформа для быстрых займов с использованием ИИ-скоринга. 
              Получите деньги за 5 минут.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-gray-400">📧</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-gray-400">📱</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <span className="text-gray-400">💬</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Продукты</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">Экспресс займ</li>
              <li className="hover:text-white transition-colors cursor-pointer">Стандартный займ</li>
              <li className="hover:text-white transition-colors cursor-pointer">Долгосрочный займ</li>
              <li className="hover:text-white transition-colors cursor-pointer">Калькулятор</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Поддержка</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">Помощь</li>
              <li className="hover:text-white transition-colors cursor-pointer">Контакты</li>
              <li className="hover:text-white transition-colors cursor-pointer">Статус системы</li>
              <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 МикроФинанс. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Политика конфиденциальности</span>
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Условия использования</span>
            <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Лицензии</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


