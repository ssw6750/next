import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    console.log('response >>> ', response)
    // 가정: res.locals.user에 로그인된 사용자 정보가 저장되어 있다.
    return NextResponse.json({ message: (response as any).locals?.user })
  } catch (error) {
    return NextResponse.json({ message: '사용자 정보를 불러오지 못했습니다.' }, { status: 500 })
  }
}
