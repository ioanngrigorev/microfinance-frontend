import React, { useState } from 'react'
import ApplicationStatus from '../components/ApplicationStatus'

function PersonalAccountPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showApplicationStatus, setShowApplicationStatus] = useState(false)

  const handleCheckApplication = () => {
    if (phoneNumber.trim()) {
      setShowApplicationStatus(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Личный кабинет</h1>
          
          <div className="space-y-8">
            {/* Проверка заявки */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Проверить статус заявки</h2>
              <p className="text-gray-600 mb-4">
                Введите номер телефона, который вы использовали при подаче заявки
              </p>
              
              <div className="flex gap-4">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleCheckApplication}
                  disabled={!phoneNumber.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Проверить
                </button>
              </div>
            </div>

            {/* Статус заявки */}
            {showApplicationStatus && (
              <ApplicationStatus phoneNumber={phoneNumber} />
            )}

            {/* Информация о системе */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">О системе</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Простая подача</h3>
                  <p className="text-gray-600 text-sm">
                    Подайте заявку за несколько минут, указав только номер телефона
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Быстрое рассмотрение</h3>
                  <p className="text-gray-600 text-sm">
                    Наши специалисты рассмотрят заявку в течение 24 часов
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Крипто займы</h3>
                  <p className="text-gray-600 text-sm">
                    Получайте займы в стейблкоинах прямо на ваш кошелек
                  </p>
                </div>
              </div>
            </div>

            {/* Статусы заявок */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Статусы заявок</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <h3 className="font-semibold text-yellow-600">Ожидает верификации</h3>
                    <p className="text-sm text-gray-600">Заявка подана и ожидает рассмотрения администратором</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h3 className="font-semibold text-green-600">Одобрена</h3>
                    <p className="text-sm text-gray-600">Заявка одобрена, можно подключать кошелек для получения средств</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <h3 className="font-semibold text-red-600">Отклонена</h3>
                    <p className="text-sm text-gray-600">Заявка отклонена, проверьте комментарии администратора</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h3 className="font-semibold text-blue-600">Средства выданы</h3>
                    <p className="text-sm text-gray-600">Займ переведен на ваш крипто кошелек</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalAccountPage