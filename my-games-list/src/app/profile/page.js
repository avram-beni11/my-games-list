'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation'
export default function Profile() {
  const router = useRouter()

  const Log = () => {
    console.log("Logged In")
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#343434]">
     
    </main>
  );
}
