// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/userService'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SignJWT } from 'jose'
import cookie from 'cookie'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // 입력값 검증
  if (!email || !password) {
    return NextResponse.json({ message: '모든 필드를 입력해 주세요.' }, { status: 400 })
  }

  try {
    const errors: any = {}

    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 })
    }

    const response = NextResponse.json({
      message: '로그인 성공',
      user: { email: user.email, username: user.username },
    })

    // 비밀번호가 맞다면 토큰 생성
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' }) // 알고리즘 설정
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!)) // 비밀 키로 서명

    // 쿠키 저장
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: '로그인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
