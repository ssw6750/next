// pages/signup.tsx

'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useAlert } from '@/context/alert'
import { useRouter } from 'next/navigation'

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { openAlert } = useAlert()
  const router = useRouter()

  const validateForm = () => {
    if (form.username.length < 2) {
      return '사용자 이름은 2글자 이상이어야 합니다.'
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email)) {
      return '유효한 이메일 형식이 아닙니다.'
    }
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordPattern.test(form.password)) {
      return '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.'
    }
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setSuccess(null)
      return
    }

    try {
      await axios.post('/api/signup', form)
      await openAlert('회원가입에 성공하였습니다.')
      await router.push('/')
    } catch (err) {
      await openAlert('회원가입에 실패하였습니다.')
      setSuccess(null)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg min-w-80 min-h-40 flex flex-col items-center justify-center p-4">
        <p className="text-lg font-semibold mb-2 text-center">모달 예시</p>
        <button
          type="button"
          onClick={() => {}}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none transition duration-150 ease-in-out"
        >
          Close
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        {success && <p className="text-green-500 text-center">{success}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              사용자 이름
              <input
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
