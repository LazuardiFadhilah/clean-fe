const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function LoginUser(payload){
    const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include', // kalau kamu pakai cookie (opsional)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
console.log("token", localStorage.getItem("token"))
  return data;
}

export async function RegisterUser(payload){
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include', // kalau kamu pakai cookie (opsional)
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  localStorage.setItem("token", data.token) // Simpan token ke localStorage
  return data
};