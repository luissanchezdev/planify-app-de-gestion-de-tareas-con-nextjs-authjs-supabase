import Image from "next/image";
import SignIn from "@/components/signin";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 w-full">
      <div className="text-8xl">
      🚀
      </div>
      <h1 className="text-2xl text-bold text-gray-800 text-center">Planify</h1>
      <p className="text-xl text-gray-500">Simplifica tu productividad</p>
      <SignIn />
    </main>
  );
}
