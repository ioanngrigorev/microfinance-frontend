import { useState, useEffect } from 'react'
import AdminStats from '../components/AdminStats'
import ApplicationVerification from '../components/ApplicationVerification'

function AdminPage() {
  const [applications, setApplications] = useState([])
  const [activeTab, setActiveTab] = useState('verification') // 'verification' или 'stats'

  // Моковые данные заявок для статистики
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
      phone: '+1 (555) 987-6543',
      amount: 2500,
      termDays: 60,
      loanPurpose: 'Медицинские расходы',
      country: 'US',
      bankName: 'Chase Bank',
      accountNumber: '0987654321',
      status: 'approved',
      createdAt: '2025-01-14T14:20:00Z',
      productId: 2,
      productName: 'Стандарт займ'
    },
    {
      id: 3,
      firstName: 'Алексей',
      lastName: 'Сидоров',
      email: 'alex@example.com',
      phone: '+1 (555) 456-7890',
      amount: 5000,
      termDays: 90,
      loanPurpose: 'Образование',
      country: 'US',
      bankName: 'Wells Fargo',
      accountNumber: '1122334455',
      status: 'rejected',
      createdAt: '2025-01-13T09:15:00Z',
      productId: 3,
      productName: 'Премиум займ'
    }
  ]

  useEffect(() => {
    setApplications(mockApplications)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
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
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('verification')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'verification'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Верификация заявок
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Статистика
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'verification' ? (
          <ApplicationVerification />
        ) : (
          <AdminStats applications={applications} />
        )}
      </div>
    </div>
  )
}

export default AdminPage