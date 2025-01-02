import { auth } from "@/auth"
import { redirect } from "next/navigation";
import AddSpaceForm from "@/components/spaces/AddSpaceForm";
import { SessionProvider, signOut } from "next-auth/react";
import SpaceList from "@/components/spaces/SpaceList";
import BtnSignOut from "@/components/signout";
import Link from "next/link";
import { getUserAuthenticated } from "../../services/authService";

async function Spaces() {
  const session = await auth()
  


  return (
    <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex gap-1 text-xl text-gray-400 text-center">
          <Link href={'/'} className="inline-block ">
            <p>Inicio</p>
          </Link>
          /
          <Link href={'/spaces'} className="inline-block text-gray-700">
            <h2> Espacios 🚀</h2>
          </Link>
      </div>
      <main>
        {
          session &&
            <SessionProvider>
              <div className="flex flex-col gap-4 p-4">
                <header>
                  <AddSpaceForm />
                </header>
                <section className="border-luissdev-250 shadow-md shadow-luissdev-250 py-4 px-2 rounded-md bg-luissdev-250">
                  <SpaceList />
                </section>
              </div>
            </SessionProvider>
        }
      </main>
    </div>
  )
}

export default Spaces
