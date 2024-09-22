// context/RootProvider.tsx

import React, { ReactNode } from 'react'
import { ModalProvider } from './alert'
// 다른 프로바이더를 여기에 추가

const RootProvider: React.FC<{ children: ReactNode }> = function RootProvider({ children }) {
  return (
    <ModalProvider>
      {/* 다른 프로바이더들도 여기에서 감싸줌 */}
      {children}
    </ModalProvider>
  )
}
export default RootProvider
