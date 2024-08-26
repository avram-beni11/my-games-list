"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore/lite"; // Import from firestore/lite

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Authenticated user UID:", uid);

        try {
         
          const q = query(collection(db, "users"), where("uid", "==", uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              console.log("User data fetched:", userData);
              setUsername(userData.username || "User");
            });
          } else {
            console.log("No user found with that UID!");
            setUsername("User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }

        setLoading(false);
      } else {
        router.push("/"); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#343434]">
      <h1 className="text-2xl text-white">Hello, {username}</h1>
      <button
        className="rounded-full bg-[#F39C6B] w-1/2 h-10 mt-6 hover:bg-[#d68a5e]"
        onClick={handleLogout}
      >
        Sign out
      </button>
    </main>
  );
}
