// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {findUserByEmail} from "@/lib/userService";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// POST 메서드 처리
export async function POST(request: NextRequest) {

    const { username, email, password } = await request.json();

    // 입력값 검증
    if (!username || !email || !password) {
        return NextResponse.json({ message: '모든 필드를 입력해 주세요.' }, { status: 400 });
    }

    // 데이터베이스에 회원가입 정보 저장 로직 (예시로 콘솔에 출력)
    console.log('회원가입 정보:', { username, email, password });

    try {
        // 유저 생성
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });

        return NextResponse.json({ message: '회원가입 성공!', user: newUser }, { status: 201 });
    } catch (error) {
        console.error('회원가입 오류:', error);
        return NextResponse.json({ message: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
    }

    // 회원가입 성공 응답
    return NextResponse.json({ message: '회원가입 성공!' });
}

