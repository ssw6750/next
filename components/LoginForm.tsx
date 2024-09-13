'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error)
        } else {
            // 로그인 성공 처리 (예: 홈페이지로 리다이렉트)
            router.push('/')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">이메일:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">비밀번호:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">로그인</button>
        </form>
    )
}