import { auth } from "@/auth"
import { redirect } from "next/navigation";
import AddSpaceForm from "../components/spaces/AddSpaceForm";
import { SessionProvider } from "next-auth/react";

async function Spaces() {
  const session = await auth()

  if(!session) {
    <p>Usuario no autenticado</p>
  }

  return (
    <div>
      <h1>Spaces</h1>
      {
        session && 
          <SessionProvider>
            <AddSpaceForm />
          </SessionProvider>
      }
    </div>
  )
}

export default Spaces
