function AdminStats({ applications }) {
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    processing: applications.filter(app => app.status === 'processing').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    totalAmount: applications.reduce((sum, app) => sum + app.amount, 0),
    averageAmount: applications.length > 0 ? applications.reduce((sum, app) => sum + app.amount, 0) / applications.length : 0
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">📋</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Всего заявок</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Pending Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm font-semibold">⏳</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Ожидают</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
          </div>
        </div>
      </div>

      {/* Approved Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-semibold">✅</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Одобрено</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-semibold">💰</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Общая сумма</p>
            <p className="text-2xl font-semibold text-gray-900">{formatAmount(stats.totalAmount)}</p>
          </div>
        </div>
      </div>

      {/* Processing Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">🔄</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">В обработке</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.processing}</p>
          </div>
        </div>
      </div>

      {/* Rejected Applications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm font-semibold">❌</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Отклонено</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
          </div>
        </div>
      </div>

      {/* Average Amount */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 text-sm font-semibold">📊</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Средняя сумма</p>
            <p className="text-2xl font-semibold text-gray-900">{formatAmount(stats.averageAmount)}</p>
          </div>
        </div>
      </div>

      {/* Approval Rate */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-semibold">📈</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Процент одобрения</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats
