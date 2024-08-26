"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../firebase/firebase"; // Import your Firebase config
import { collection, addDoc } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; 
  };

  useEffect(() => {
    if (
      validateEmail(email) &&
      validatePassword(pass1) &&
      pass1 === pass2 &&
      email !== "" &&
      pass1 !== "" &&
      pass2 !== ""
    ) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [email, pass1, pass2]);

  const handleNext = () => {
    if (step === 1) {
      if (isNextEnabled) {
        setStep(2);
      } else {
        setError("Please fill in all fields correctly.");
      }
    } else {
      handleRegistration();
    }
  };

  const handleRegistration = async () => {
    if (username === "") {
      setError("Username cannot be empty");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass1
      );

      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      });
      
      router.push("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const svgBack = () => {
    if (step >= 2) {
      setStep(1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#343434]">
      <div
        className="h-[500px] w-[350px] bg-[#F7FFF7] m-auto flex flex-col justify-center items-center rounded-md shadow-lg relative"
        id=""
      >
        <p className="text-[#F39C6B] text-2xl mb-10 font-bold">MyGamesList</p>

        {step === 1 ? (
          <>
            <input
              id="email"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="pass1"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Password"
              type="password"
              name="pass1"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
            />
            <input
              id="pass2"
              className="h-10 w-auto text-black bg-[#F7FFF7] border-solid border-b-2 border-[#343434] focus:border-[#F39C6B] mb-4 outline-none"
              required
              placeholder="Confirm Password"
              type="password"
              name="pass2"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
          </>
        ) : (
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
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}

        <button
          className={`rounded-full w-1/2 h-10 mt-6 ${
            isNextEnabled || step === 2
              ? "bg-[#F39C6B] hover:bg-[#d68a5e]"
              : "bg-gray-400"
          }`}
          onClick={handleNext}
          disabled={!isNextEnabled && step === 1}
        >
          {step === 1 ? "Next" : "Register"}
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
