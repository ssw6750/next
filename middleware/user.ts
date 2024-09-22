import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { jwtVerify } from 'jose'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function userMiddleware(request: NextRequest, response: NextResponse) {
  try {
    console.log('cookie', request.cookies)
    const tokenCookie = request.cookies.get('token')
    const token = tokenCookie?.value // Next.js에서는 req.cookies를 사용

    console.log('token =', token)
    if (!token) return NextResponse.next() // 토큰이 없으면 미들웨어 통과

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
    console.log('payload >>> ', payload)
    const email = payload.email as string // 타입 단언

    console.log('email >>> ', email)

    const user = await prisma.user.findUnique({ where: { email } })
    console.log('user >>> ', user)

    if (!user)
      throw new Error('Unauthenticated')

      // 유저 정보를 res에 추가
    ;(response as any).locals = { user }

    console.log('넘어감')
    return NextResponse.next() // 다음 미들웨어로 넘어가기
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: '오류가 발생했습니다.' }, { status: 400 })
  }
}
