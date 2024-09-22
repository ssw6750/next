// components/Modal.tsx

import React from 'react'

interface ModalProps {
  message: string
  onClose: () => void
}

const Modal: React.FC<ModalProps> = function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
          닫기
        </button>
      </div>
    </div>
  )
}

export default Modal
