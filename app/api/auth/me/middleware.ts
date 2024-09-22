// app/middleware/index.ts
import { NextRequest, NextResponse } from 'next/server'
import userMiddleware from '@/middleware/user'
import authMiddleware from '@/middleware/auth'

export function middleware(request: NextRequest, response: NextResponse) {
  console.log('middleware')
  // 각 미들웨어 호출
  userMiddleware(request, response)
  authMiddleware(request, response)

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/auth/me'],
}
