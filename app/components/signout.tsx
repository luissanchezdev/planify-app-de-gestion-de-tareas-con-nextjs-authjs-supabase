import { signOut } from "@/auth"
import { redirect } from "next/navigation"

function BtnSignOut() {
  return (
    <form action={async () => {
      "use server"
      await signOut()
      redirect('/')
    }}>
      <button type="submit">Cerrar sesión</button>
    </form>
  )
}

export default BtnSignOut
