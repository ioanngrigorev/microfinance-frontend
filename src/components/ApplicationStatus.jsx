import React, { useState, useEffect } from 'react'
import applicationService from '../services/applicationService'

const ApplicationStatus = ({ phoneNumber }) => {
  const [currentApplication, setCurrentApplication] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (phoneNumber) {
      loadApplication()
    }
  }, [phoneNumber])

  const loadApplication = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await applicationService.getApplicationByPhone(phoneNumber)
      setCurrentApplication(result)
    } catch (err) {
      setError(err.message)
      console.error('Ошибка загрузки заявки:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'REGISTERED':
        return {
          text: 'Зарегистрирован',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: '📱'
        }
      case 'SUBMITTED':
        return {
          text: 'Заявка подана',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          icon: '📋'
        }
      case 'PAID':
        return {
          text: 'Оплачено',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: '💳'
        }
      case 'UNPAID':
        return {
          text: 'Не оплачено',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          icon: '⏰'
        }
      case 'UND':
        return {
          text: 'На рассмотрении',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: '⏳'
        }
      case 'APPROVED':
        return {
          text: 'Одобрена',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: '✅'
        }
      case 'REJECTED':
        return {
          text: 'Отклонена',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: '❌'
        }
      default:
        return {
          text: 'Неизвестный статус',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: '❓'
        }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано'
    return new Date(dateString).toLocaleString('ru-RU')
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Ошибка загрузки</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadApplication}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  if (!currentApplication) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Заявка не найдена</h3>
          <p className="text-gray-600 mb-4">
            Заявка с номером телефона {phoneNumber} не найдена
          </p>
          <button
            onClick={() => window.location.href = '/application'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Подать заявку
          </button>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(currentApplication.status)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Статус заявки</h3>
        <button
          onClick={loadApplication}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Обновить
        </button>
      </div>

      <div className="space-y-6">
        {/* Статус */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-lg p-4`}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{statusInfo.icon}</span>
            <div>
              <p className={`font-semibold ${statusInfo.color}`}>
                {statusInfo.text}
              </p>
              <p className="text-sm text-gray-600">
                Обновлено: {formatDate(currentApplication.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Детали заявки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер телефона
            </label>
            <p className="text-gray-900 font-mono">{currentApplication.phoneNumber}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата подачи
            </label>
            <p className="text-gray-900">{formatDate(currentApplication.createdAt)}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Сумма займа
            </label>
            <p className="text-gray-900 font-semibold">${currentApplication.amount}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Срок займа
            </label>
            <p className="text-gray-900">{currentApplication.term} месяцев</p>
          </div>
        </div>

        {/* Выбранный продукт */}
        {currentApplication.selectedProduct && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Выбранный продукт</h4>
            <p className="text-gray-700">{currentApplication.selectedProduct.name}</p>
            <p className="text-sm text-gray-600">{currentApplication.selectedProduct.description}</p>
          </div>
        )}

        {/* Кошелек */}
        {currentApplication.walletAddress && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Крипто кошелек</h4>
            <p className="text-blue-800 font-mono text-sm">
              {currentApplication.walletAddress.slice(0, 6)}...{currentApplication.walletAddress.slice(-4)}
            </p>
          </div>
        )}

        {/* Комментарии администратора */}
        {currentApplication.adminNotes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Комментарии администратора</h4>
            <p className="text-yellow-800">{currentApplication.adminNotes}</p>
          </div>
        )}

        {/* Действия в зависимости от статуса */}
        {currentApplication.status === 'APPROVED' && !currentApplication.walletAddress && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Заявка одобрена!</h4>
            <p className="text-green-800 mb-4">
              Ваша заявка одобрена. Подключите крипто кошелек для получения средств.
            </p>
            <button
              onClick={() => window.location.href = '/wallet?tab=wallet'}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Подключить кошелек
            </button>
          </div>
        )}

        {currentApplication.status === 'PAID' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Оплата подтверждена!</h4>
            <p className="text-blue-800">
              Ваша заявка оплачена и кошелек подключен. Ожидайте рассмотрения.
            </p>
          </div>
        )}

        {currentApplication.status === 'REJECTED' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Заявка отклонена</h4>
            <p className="text-red-800">
              К сожалению, ваша заявка была отклонена. Проверьте комментарии администратора.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationStatus