import Image from "next/image";
import SignIn from "./components/signin";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Planify</h1>
      <p>Simplifica tu productividad</p>
      <SignIn />
    </main>
  );
}
