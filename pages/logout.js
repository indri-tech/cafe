import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/login"); // Arahkan ke halaman login setelah logout
    };

    logoutUser();
  }, [router]);

  return (
    <div className="h-screen flex justify-center items-center">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
}