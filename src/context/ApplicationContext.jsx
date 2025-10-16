import React, { createContext, useContext, useState, useEffect } from 'react'
import applicationService from '../services/applicationService'

const ApplicationContext = createContext()

export const useApplication = () => {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider')
  }
  return context
}

export const ApplicationProvider = ({ children }) => {
  const [currentApplication, setCurrentApplication] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Регистрация пользователя (при вводе номера телефона)
  const registerUser = async (phoneNumber) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.registerUser(phoneNumber)
      setCurrentUser(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Получить пользователя по номеру телефона
  const getUserByPhone = async (phoneNumber) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.getUserByPhone(phoneNumber)
      setCurrentUser(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Обновить статус пользователя
  const updateUserStatus = async (phoneNumber, status, additionalData = {}) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.updateUserStatus(phoneNumber, status, additionalData)
      if (currentUser && currentUser.phoneNumber === phoneNumber) {
        setCurrentUser(result)
      }
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Создать новую заявку
  const createApplication = async (applicationData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.createApplication(applicationData)
      setCurrentApplication(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Получить заявку по номеру телефона
  const getApplicationByPhone = async (phoneNumber) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.getApplicationByPhone(phoneNumber)
      setCurrentApplication(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Обновить статус заявки
  const updateApplicationStatus = async (phoneNumber, status, adminNotes = '') => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.updateApplicationStatus(phoneNumber, status, adminNotes)
      if (currentApplication && currentApplication.phoneNumber === phoneNumber) {
        setCurrentApplication(result)
      }
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Обновить статус после оплаты
  const updatePaymentStatus = async (phoneNumber, isPaid, walletAddress = null) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.updatePaymentStatus(phoneNumber, isPaid, walletAddress)
      if (currentUser && currentUser.phoneNumber === phoneNumber) {
        setCurrentUser(result)
      }
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Отправить на рассмотрение
  const submitForReview = async (phoneNumber) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await applicationService.submitForReview(phoneNumber)
      if (currentUser && currentUser.phoneNumber === phoneNumber) {
        setCurrentUser(result)
      }
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Очистить текущую заявку
  const clearApplication = () => {
    setCurrentApplication(null)
    setCurrentUser(null)
    setError(null)
  }

  const value = {
    currentApplication,
    currentUser,
    isLoading,
    error,
    registerUser,
    getUserByPhone,
    updateUserStatus,
    createApplication,
    getApplicationByPhone,
    updateApplicationStatus,
    updatePaymentStatus,
    submitForReview,
    clearApplication,
  }

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}
