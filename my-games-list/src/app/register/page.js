'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/firebase';
import {  collection, getDocs } from 'firebase/firestore/lite';


export default function Register() {
    const router = useRouter()

    const Reg = () => {
        console.log("Registered")
    }
 
      async function getUsers(db) {
          const usersCol = collection(db, 'users');
          const usersDoc = await getDocs(usersCol);
          const userList = usersDoc.docs.map(doc => doc.data());
          console.log(userList[0]);
          return userList;
        }
      
        getUsers(db);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#343434]">
            <div className="h-[500px] w-[350px] bg-[#F7FFF7] m-auto flex flex-col justify-center items-center rounded-md shadow-lg">
                <p className="text-[#F39C6B] text-2xl mb-10">MyGamesList</p>
                <input className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none" required placeholder="Email" type="text" name="search" />
                <input className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none" required placeholder="Password" type="password" name="search" />
                <input className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none" required placeholder="Confirm Password" type="password" name="search" />
                <button className="rounded-full bg-[#F39C6B] w-1/2 h-10 mt-6 hover:bg-[#d68a5e]" onClick={Reg}>Next</button>
                <p className="text-black mt-6 text-sm">Already have an account? Sign in <span className="text-base underline text-sm hover:text-[#d68a5e] cursor-pointer" onClick={() => router.push('/login')}>here!</span></p>
            </div>
        </main>
    );
}
