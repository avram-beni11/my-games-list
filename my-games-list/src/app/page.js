'use client'
import Image from "next/image";

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#343434]">
      <button type="button" onClick={() => router.push('/register')}>
        Register
      </button>
      <button type="button" onClick={() => router.push('/login')}>
        Login
      </button>
    </main>
  )
}
