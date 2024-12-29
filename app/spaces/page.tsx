import { auth } from "@/auth"
import { redirect } from "next/navigation";

async function Spaces() {
  const session = await auth()

  if(!session) {
    <p>Usuario no autenticado</p>
  }

  return (
    <div>
      <h1>Spaces</h1>
      {
        session && <p>Bienvenido, { session.user?.name }</p>
      }
    </div>
  )
}

export default Spaces
