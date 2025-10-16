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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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

  // Очистить текущую заявку
  const clearApplication = () => {
    setCurrentApplication(null)
    setError(null)
  }

  const value = {
    currentApplication,
    isLoading,
    error,
    createApplication,
    getApplicationByPhone,
    updateApplicationStatus,
    clearApplication,
  }

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}
