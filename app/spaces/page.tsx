import { auth } from "@/auth"
import { redirect } from "next/navigation";
import AddSpaceForm from "../components/spaces/AddSpaceForm";
import { SessionProvider } from "next-auth/react";
import SpaceList from "../components/spaces/SpaceList";

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
            <main>
              <AddSpaceForm />
              <section>
                <SpaceList />
              </section>
            </main>
          </SessionProvider>
      }
    </div>
  )
}

export default Spaces
