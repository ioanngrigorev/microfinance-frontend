import React from 'react'

function PersonalAccountPage() {
  // Mock data for demonstration
  const personalData = {
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    phoneNumber: '+1 (555) 123-4567',
    country: 'US',
    bankName: 'Bank of America',
    accountNumber: '1234567890'
  }

  const applications = [
    {
      id: 'app_001',
      amount: 1000,
      termDays: 30,
      status: 'Approved',
      loanPurpose: 'Покупка товаров и услуг',
      createdAt: '2023-10-26',
      approvedAt: '2023-10-27',
      totalToRepay: 1600,
      repaid: 0,
      nextPaymentDate: '2023-11-26',
      nextPaymentAmount: 1600
    },
    {
      id: 'app_002',
      amount: 500,
      termDays: 14,
      status: 'Completed',
      loanPurpose: 'Медицинские расходы',
      createdAt: '2023-09-10',
      approvedAt: '2023-09-11',
      totalToRepay: 700,
      repaid: 700,
      nextPaymentDate: null,
      nextPaymentAmount: null
    }
  ]

  const paymentSchedule = [
    { date: '2023-11-26', amount: 1600, status: 'Pending' }
  ]

  const repaymentHistory = [
    { date: '2023-09-25', amount: 700, loanId: 'app_002', status: 'Paid' }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Личный Кабинет 👤
      </h2>

      {/* Personal Data */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Персональные данные</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
          <p><span className="font-semibold">Имя:</span> {personalData.firstName}</p>
          <p><span className="font-semibold">Фамилия:</span> {personalData.lastName}</p>
          <p><span className="font-semibold">Email:</span> {personalData.email}</p>
          <p><span className="font-semibold">Телефон:</span> {personalData.phoneNumber}</p>
          <p><span className="font-semibold">Страна:</span> {personalData.country}</p>
          <p><span className="font-semibold">Банк:</span> {personalData.bankName}</p>
          <p><span className="font-semibold">Номер счета:</span> {personalData.accountNumber}</p>
        </div>
      </div>

      {/* Loan Applications & History */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Мои заявки и история займов</h3>
        {applications.length === 0 ? (
          <p className="text-gray-600 text-center">У вас пока нет активных или завершенных заявок.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Сумма</th>
                  <th className="py-3 px-6 text-left">Срок</th>
                  <th className="py-3 px-6 text-left">Цель</th>
                  <th className="py-3 px-6 text-left">Статус</th>
                  <th className="py-3 px-6 text-left">К возврату</th>
                  <th className="py-3 px-6 text-left">Погашено</th>
                  <th className="py-3 px-6 text-left">Дата заявки</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {applications.map(app => (
                  <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{app.id}</td>
                    <td className="py-3 px-6 text-left">${app.amount}</td>
                    <td className="py-3 px-6 text-left">{app.termDays} дней</td>
                    <td className="py-3 px-6 text-left">{app.loanPurpose}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        app.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        app.status === 'Completed' ? 'bg-blue-200 text-blue-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">${app.totalToRepay}</td>
                    <td className="py-3 px-6 text-left">${app.repaid}</td>
                    <td className="py-3 px-6 text-left">{app.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Schedule */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">График платежей</h3>
        {paymentSchedule.length === 0 ? (
          <p className="text-gray-600 text-center">Нет предстоящих платежей.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Дата платежа</th>
                  <th className="py-3 px-6 text-left">Сумма</th>
                  <th className="py-3 px-6 text-left">Статус</th>
                  <th className="py-3 px-6 text-left">Действия</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {paymentSchedule.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{payment.date}</td>
                    <td className="py-3 px-6 text-left">${payment.amount}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        payment.status === 'Pending' ? 'bg-orange-200 text-orange-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {payment.status === 'Pending' && (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-xs transition">
                          Оплатить
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

      {/* Repayment Information */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Информация о погашениях</h3>
        {repaymentHistory.length === 0 ? (
          <p className="text-gray-600 text-center">История погашений пуста.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Дата погашения</th>
                  <th className="py-3 px-6 text-left">Сумма</th>
                  <th className="py-3 px-6 text-left">Займ ID</th>
                  <th className="py-3 px-6 text-left">Статус</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {repaymentHistory.map((repayment, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{repayment.date}</td>
                    <td className="py-3 px-6 text-left">${repayment.amount}</td>
                    <td className="py-3 px-6 text-left">{repayment.loanId}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        repayment.status === 'Paid' ? 'bg-green-200 text-green-800' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {repayment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonalAccountPage
