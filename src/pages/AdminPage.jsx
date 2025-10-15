import { useState, useEffect } from 'react'
import AdminStats from '../components/AdminStats'

function AdminPage() {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApp, setSelectedApp] = useState(null)

  // Моковые данные заявок
  const mockApplications = [
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@example.com',
      phone: '+1 (555) 123-4567',
      amount: 1000,
      termDays: 30,
      loanPurpose: 'Покупка товаров и услуг',
      country: 'US',
      bankName: 'Bank of America',
      accountNumber: '1234567890',
      status: 'pending',
      createdAt: '2025-01-15T10:30:00Z',
      productId: 1,
      productName: 'Экспресс займ'
    },
    {
      id: 2,
      firstName: 'Мария',
      lastName: 'Петрова',
      email: 'maria@example.com',
      phone: '+7 (999) 123-4567',
      amount: 5000,
      termDays: 60,
      loanPurpose: 'Ремонт дома/квартиры',
      country: 'RU',
      bankName: 'Сбербанк',
      accountNumber: '9876543210',
      status: 'approved',
      createdAt: '2025-01-14T15:45:00Z',
      productId: 2,
      productName: 'Стандарт'
    },
    {
      id: 3,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      phone: '+1 (555) 987-6543',
      amount: 2000,
      termDays: 14,
      loanPurpose: 'Медицинские расходы',
      country: 'US',
      bankName: 'JPMorgan Chase',
      accountNumber: '5555666677',
      status: 'rejected',
      createdAt: '2025-01-13T09:20:00Z',
      productId: 1,
      productName: 'Экспресс займ'
    },
    {
      id: 4,
      firstName: 'Анна',
      lastName: 'Козлова',
      email: 'anna@example.com',
      phone: '+7 (495) 123-4567',
      amount: 8000,
      termDays: 180,
      loanPurpose: 'Покупка автомобиля',
      country: 'RU',
      bankName: 'ВТБ',
      accountNumber: '1111222233',
      status: 'processing',
      createdAt: '2025-01-12T14:15:00Z',
      productId: 3,
      productName: 'Максимум'
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael@example.com',
      phone: '+1 (555) 456-7890',
      amount: 1500,
      termDays: 45,
      loanPurpose: 'Образование',
      country: 'US',
      bankName: 'Wells Fargo',
      accountNumber: '4444555566',
      status: 'pending',
      createdAt: '2025-01-11T11:30:00Z',
      productId: 2,
      productName: 'Стандарт'
    }
  ]

  useEffect(() => {
    setApplications(mockApplications)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает'
      case 'processing': return 'В обработке'
      case 'approved': return 'Одобрено'
      case 'rejected': return 'Отклонено'
      default: return 'Неизвестно'
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch = 
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm)
    return matchesFilter && matchesSearch
  })

  const updateStatus = (id, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU')
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Админ панель</h1>
              <p className="text-gray-600">Управление заявками на займы</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Всего заявок: <span className="font-semibold">{applications.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <AdminStats applications={applications} />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Поиск по имени, email или телефону..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Все статусы</option>
                <option value="pending">Ожидает</option>
                <option value="processing">В обработке</option>
                <option value="approved">Одобрено</option>
                <option value="rejected">Отклонено</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Займ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Продукт
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{app.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {app.firstName} {app.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{app.email}</div>
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatAmount(app.amount)}
                        </div>
                        <div className="text-sm text-gray-500">{app.termDays} дней</div>
                        <div className="text-sm text-gray-500">{app.loanPurpose}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.productName}</div>
                      <div className="text-sm text-gray-500">{app.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Просмотр
                        </button>
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(app.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Одобрить
                            </button>
                            <button
                              onClick={() => updateStatus(app.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Отклонить
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Заявки не найдены</div>
          </div>
        )}
      </div>

      {/* Modal for Application Details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Заявка #{selectedApp.id}
                </h3>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Имя</label>
                    <p className="text-sm text-gray-900">{selectedApp.firstName} {selectedApp.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Телефон</label>
                    <p className="text-sm text-gray-900">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Страна</label>
                    <p className="text-sm text-gray-900">{selectedApp.country}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Сумма займа</label>
                    <p className="text-sm text-gray-900">{formatAmount(selectedApp.amount)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Срок</label>
                    <p className="text-sm text-gray-900">{selectedApp.termDays} дней</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Цель займа</label>
                    <p className="text-sm text-gray-900">{selectedApp.loanPurpose}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Продукт</label>
                    <p className="text-sm text-gray-900">{selectedApp.productName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Банк</label>
                    <p className="text-sm text-gray-900">{selectedApp.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Номер счета</label>
                    <p className="text-sm text-gray-900">{selectedApp.accountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Статус</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedApp.status)}`}>
                      {getStatusText(selectedApp.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Дата создания</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedApp.createdAt)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Закрыть
                </button>
                {selectedApp.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedApp.id, 'approved')
                        setSelectedApp(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                    >
                      Одобрить
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedApp.id, 'rejected')
                        setSelectedApp(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                    >
                      Отклонить
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
