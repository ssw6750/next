// app/api/login/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { findUserByEmail } from '@/lib/userService'

export async function POST(request: Request) {
    const { email, password } = await request.json()

    const user = await findUserByEmail(email)
    if (!user) {
        return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 })
    }

    // 여기서 세션을 생성하거나 JWT 토큰을 발급할 수 있습니다
    return NextResponse.json({ message: '로그인 성공', user: { email: user.email, username: user.username } })
}