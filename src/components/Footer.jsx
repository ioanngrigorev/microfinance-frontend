function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">💰 МикроФинанс</h3>
            <p className="text-gray-400">
              Быстрые займы онлайн с минимальными требованиями
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="text-gray-400 space-y-2">
              <li>📞 +1 (800) 123-4567</li>
              <li>📧 support@microfinance.com</li>
              <li>🕐 Пн-Пт: 9:00 - 18:00</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="text-gray-400 space-y-2">
              <li>О компании</li>
              <li>Условия займа</li>
              <li>Политика конфиденциальности</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 МикроФинанс. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


