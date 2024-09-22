'use client'

import React, { createContext, useContext, useState, useMemo, ReactNode, useRef } from 'react'

interface AlertContextType {
  openAlert: (message: string) => void
  closeAlert: () => void
}

const Alert = createContext<AlertContextType | undefined>(undefined)

interface AlertProviderProps {
  children: ReactNode
}

export const AlertProvider: React.FC<AlertProviderProps> = function AlertProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [AlertMessage, setAlertMessage] = useState<string | null>(null)
  const closeAlertRef = useRef<(() => void) | null>(null)

  const openAlert = (message: string): Promise<void> => {
    return new Promise((resolve) => {
      setAlertMessage(message)
      setIsOpen(true)

      // closeAlert을 참조하여 Promise를 해결
      closeAlertRef.current = () => {
        setIsOpen(false)
        setAlertMessage(null)
        resolve() // Promise 해결
      }
    })
  }

  const closeAlert = () => {
    if (closeAlertRef.current) {
      closeAlertRef.current() // Promise 해결
    }
  }

  // value를 useMemo로 메모이제이션하여 리렌더링 최적화
  const value = useMemo(() => ({ openAlert, closeAlert }), [])

  return (
    <Alert.Provider value={value}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg min-w-80 min-h-40 flex  flex-col items-center justify-center p-4">
            <p className="text-lg font-semibold mb-2 text-center">{AlertMessage}</p>
            <button
              type="button"
              onClick={closeAlert}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Alert.Provider>
  )
}

export const useAlert = (): AlertContextType => {
  console.log('useAlert')
  const context = useContext(Alert)
  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider')
  }
  return context
}
