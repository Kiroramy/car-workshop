"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";
export default function Logout() {
  const router = useRouter();
  const { signOut } = useContext(AuthContext);
  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false });
      router.push("/login");
    };
    handleLogout();
  }, [router]);

  return null;
}
