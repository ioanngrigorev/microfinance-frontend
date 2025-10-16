// API сервис для работы с заявками
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

class ApplicationService {
  // Создать новую заявку
  async createApplication(applicationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: applicationData.phoneNumber,
          amount: applicationData.amount,
          term: applicationData.term,
          selectedProduct: applicationData.selectedProduct,
          walletAddress: applicationData.walletAddress,
          status: 'PENDING_VERIFICATION',
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка создания заявки:', error)
      throw error
    }
  }

  // Получить заявку по номеру телефона
  async getApplicationByPhone(phoneNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/phone/${encodeURIComponent(phoneNumber)}`)
      
      if (response.status === 404) {
        return null // Заявка не найдена
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка получения заявки:', error)
      throw error
    }
  }

  // Получить все заявки (для админ панели)
  async getAllApplications() {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка получения заявок:', error)
      throw error
    }
  }

  // Обновить статус заявки (для админ панели)
  async updateApplicationStatus(phoneNumber, status, adminNotes = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${encodeURIComponent(phoneNumber)}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminNotes,
          updatedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка обновления статуса:', error)
      throw error
    }
  }

  // Получить статистику заявок (для админ панели)
  async getApplicationStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/stats`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Ошибка получения статистики:', error)
      throw error
    }
  }
}

export default new ApplicationService()
