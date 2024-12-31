import { auth } from "@/auth"
import { redirect } from "next/navigation";
import AddSpaceForm from "../components/spaces/AddSpaceForm";
import { SessionProvider, signOut } from "next-auth/react";
import SpaceList from "../components/spaces/SpaceList";
import BtnSignOut from "../components/signout";

async function Spaces() {
  const session = await auth()

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
