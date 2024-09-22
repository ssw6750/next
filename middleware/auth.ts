import { NextRequest, NextResponse } from 'next/server'

export default async function authMiddleware(request: NextRequest, response: NextResponse) {
  try {
    // res.locals를 사용할 수 없으므로 res에서 유저 정보를 추출하는 방식이 필요합니다.
    const user = (response as any).locals?.user // 이전 미들웨어에서 유저 정보를 저장한 경우

    if (!user) throw new Error('Unauthenticated')

    return NextResponse.next() // 다음 미들웨어 또는 라우트로 넘어감
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 })
  }
}
