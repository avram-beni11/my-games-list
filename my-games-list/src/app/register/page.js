"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../firebase/firebase"; // Import your Firebase config
import { collection, addDoc } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const svgBack = () => {
    if (step >= 2) {
      setStep(1);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const Reg = async () => {
    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }
  };

  // async function getUsers(db) {
  //     const usersCol = collection(db, 'users');
  //     const usersDoc = await getDocs(usersCol);
  //     const userList = usersDoc.docs.map(doc => doc.data());
  //     console.log(userList[0]);
  //     return userList;
  // }
  //getUsers(db);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#343434]">
      <div
        className="h-[500px] w-[350px] bg-[#F7FFF7] m-auto flex flex-col justify-center items-center rounded-md shadow-lg relative"
        id=""
      >
        <p className="text-[#F39C6B] text-2xl mb-10 font-bold">MyGamesList</p>

        {step === 1 ? ( //if step = 1, display this content
          <>
            <input
              id="email"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Email"
              type="text"
              name="search"
            />
            <input
              id="pass1"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Password"
              type="password"
              name="search"
            />
            <input
              id="pass2"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Confirm Password"
              type="password"
              name="search"
            />
            {error && <p className="text-red-500">{error}</p>}
          </>
        ) : (
          //anything othe than 1, display something else
          <>
            <button
              onClick={svgBack}
              className="absolute top-3 left-3 focus:text-[#F39C6B]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-[#343434] hover:text-[#F39C6B]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>

            <input
              id="username"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Username"
              type="text"
              name="search"
            />
            <div
              class="relative w-36 h-36 rounded-full bg-gray-200 cursor-pointer shadow-md flex items-center justify-center"
              onClick={() => document.getElementById('profile-pic-input').click()}
            >
              <img
                id="profile-pic"
                class="w-full h-full object-cover rounded-full hidden"
              ></img>
              <span id="placeholder" class="text-gray-400 text-4xl">
                +
              </span>
            </div>
            <input type="file" id="img" name="img" accept="image/*" class="hidden" onchange="loadFile(event)"></input>
          </>//end of useState
        )}

        <button
          className="rounded-full bg-[#F39C6B] w-1/2 h-10 mt-6 hover:bg-[#d68a5e]"
          onClick={handleNext}
        >
          Next
        </button>
        <p className="text-black mt-6 text-sm">
          Already have an account? Sign in{" "}
          <span
            className="text-base underline text-sm hover:text-[#d68a5e] cursor-pointer"
            onClick={() => router.push("/login")}
          >
            here!
          </span>
        </p>
      </div>
    </main>
  );
}
