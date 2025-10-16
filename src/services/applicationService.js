// Mock API сервис для работы с заявками (демо-версия)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

// Mock данные для демонстрации
const mockApplications = new Map()

class ApplicationService {
  // Создать новую заявку
  async createApplication(applicationData) {
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const application = {
        phoneNumber: applicationData.phoneNumber,
        amount: applicationData.amount,
        term: applicationData.term,
        selectedProduct: applicationData.selectedProduct,
        walletAddress: applicationData.walletAddress || null,
        status: 'PENDING_VERIFICATION',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        adminNotes: ''
      }
      
      // Сохраняем в mock хранилище
      mockApplications.set(applicationData.phoneNumber, application)
      
      console.log('Заявка создана (mock):', application)
      return application
    } catch (error) {
      console.error('Ошибка создания заявки:', error)
      throw error
    }
  }

  // Получить заявку по номеру телефона
  async getApplicationByPhone(phoneNumber) {
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const application = mockApplications.get(phoneNumber)
      
      if (!application) {
        return null // Заявка не найдена
      }
      
      console.log('Заявка найдена (mock):', application)
      return application
    } catch (error) {
      console.error('Ошибка получения заявки:', error)
      throw error
    }
  }

  // Получить все заявки (для админ панели)
  async getAllApplications() {
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 400))
      
      const applications = Array.from(mockApplications.values())
      
      console.log('Все заявки (mock):', applications)
      return applications
    } catch (error) {
      console.error('Ошибка получения заявок:', error)
      throw error
    }
  }

  // Обновить статус заявки (для админ панели)
  async updateApplicationStatus(phoneNumber, status, adminNotes = '') {
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const application = mockApplications.get(phoneNumber)
      
      if (!application) {
        throw new Error('Заявка не найдена')
      }
      
      const updatedApplication = {
        ...application,
        status,
        adminNotes,
        updatedAt: new Date().toISOString()
      }
      
      mockApplications.set(phoneNumber, updatedApplication)
      
      console.log('Статус заявки обновлен (mock):', updatedApplication)
      return updatedApplication
    } catch (error) {
      console.error('Ошибка обновления статуса:', error)
      throw error
    }
  }

  // Получить статистику заявок (для админ панели)
  async getApplicationStats() {
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const applications = Array.from(mockApplications.values())
      
      const stats = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'PENDING_VERIFICATION').length,
        approved: applications.filter(app => app.status === 'APPROVED').length,
        rejected: applications.filter(app => app.status === 'REJECTED').length,
        disbursed: applications.filter(app => app.status === 'DISBURSED').length,
        totalAmount: applications.reduce((sum, app) => sum + app.amount, 0),
        averageAmount: applications.length > 0 ? applications.reduce((sum, app) => sum + app.amount, 0) / applications.length : 0,
        conversionRate: applications.length > 0 ? applications.filter(app => app.status === 'APPROVED' || app.status === 'DISBURSED').length / applications.length : 0
      }
      
      console.log('Статистика заявок (mock):', stats)
      return stats
    } catch (error) {
      console.error('Ошибка получения статистики:', error)
      throw error
    }
  }
}

export default new ApplicationService()