import React, { useState, useEffect } from 'react'
import applicationService from '../services/applicationService'

const ApplicationVerification = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await applicationService.getAllApplications()
      setApplications(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (phoneNumber) => {
    setActionLoading(true)
    try {
      await applicationService.updateApplicationStatus(phoneNumber, 'APPROVED', adminNotes)
      await loadApplications()
      setSelectedApplication(null)
      setAdminNotes('')
    } catch (err) {
      console.error('Ошибка одобрения заявки:', err)
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (phoneNumber) => {
    setActionLoading(true)
    try {
      await applicationService.updateApplicationStatus(phoneNumber, 'REJECTED', adminNotes)
      await loadApplications()
      setSelectedApplication(null)
      setAdminNotes('')
    } catch (err) {
      console.error('Ошибка отклонения заявки:', err)
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING_VERIFICATION':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Ожидает верификации</span>
      case 'APPROVED':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Одобрена</span>
      case 'REJECTED':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Отклонена</span>
      case 'DISBURSED':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Средства выданы</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Неизвестно</span>
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано'
    return new Date(dateString).toLocaleString('ru-RU')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Ошибка загрузки</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadApplications}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Верификация заявок</h2>
        <button
          onClick={loadApplications}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Обновить
        </button>
      </div>

      {/* Список заявок */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Заявок нет</h3>
            <p className="text-gray-600">Нет заявок для верификации</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Телефон
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Срок
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата подачи
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.phoneNumber} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${app.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.term} месяцев
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {app.status === 'PENDING_VERIFICATION' && (
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Рассмотреть
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Модальное окно для рассмотрения заявки */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Рассмотрение заявки</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                    <p className="text-gray-900 font-mono">{selectedApplication.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата подачи</label>
                    <p className="text-gray-900">{formatDate(selectedApplication.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сумма</label>
                    <p className="text-gray-900 font-semibold">${selectedApplication.amount}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Срок</label>
                    <p className="text-gray-900">{selectedApplication.term} месяцев</p>
                  </div>
                </div>

                {selectedApplication.selectedProduct && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Выбранный продукт</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="font-semibold text-gray-900">{selectedApplication.selectedProduct.name}</p>
                      <p className="text-sm text-gray-600">{selectedApplication.selectedProduct.description}</p>
                    </div>
                  </div>
                )}

                {selectedApplication.walletAddress && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Кошелек</label>
                    <p className="text-gray-900 font-mono text-sm">
                      {selectedApplication.walletAddress}
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Комментарии администратора
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Добавьте комментарии к решению..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleApprove(selectedApplication.phoneNumber)}
                  disabled={actionLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  {actionLoading ? 'Обработка...' : 'Одобрить'}
                </button>
                <button
                  onClick={() => handleReject(selectedApplication.phoneNumber)}
                  disabled={actionLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  {actionLoading ? 'Обработка...' : 'Отклонить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationVerification
