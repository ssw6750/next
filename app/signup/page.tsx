// pages/signup.tsx
'use client'

import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/api/signup', form);
            setSuccess('회원가입 성공!');
            setError(null);
        } catch (err) {
            setError('회원가입 실패!');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    사용자 이름:
                    <input type="text" name="username" value={form.username} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    이메일:
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
