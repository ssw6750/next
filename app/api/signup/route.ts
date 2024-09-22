// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { validate } from 'class-validator'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const mapErrors = (errors: any[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1]
    return prev
  }, {})
}

// POST 메서드 처리
export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json()
  const hashedPassword = await bcrypt.hash(password, 6)

  // 입력값 검증
  if (!username || !email || !password) {
    return NextResponse.json({ message: '모든 필드를 입력해 주세요.' }, { status: 400 })
  }

  try {
    const errors: any = {}

    // 이메일과 사용자명 중복 체크
    const emailUser = await prisma.user.findUnique({
      where: { email },
    })
    const usernameUser = await prisma.user.findUnique({
      where: { username },
    })

    if (emailUser) errors.email = '이미 해당 이메일 주소가 사용되었습니다.'
    if (usernameUser) errors.username = '이미 이 사용자의 이름이 사용되었습니다.'

    // 에러가 있을 경우 클라이언트에 반환
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: errors }, { status: 400 })
    }

    const newUser = {
      email,
      username,
      password: hashedPassword,
    }

    // 유효성 검사 (Class-validator 라이브러리로 처리)
    const validationErrors = await validate(newUser)
    if (validationErrors.length > 0) {
      return NextResponse.json({ message: mapErrors(validationErrors) }, { status: 400 })
    }

    // 유저 테이블에 저장
    const user = await prisma.user.create({
      data: newUser,
    })

    return NextResponse.json({ message: '회원가입 성공!', user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: '회원가입 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
