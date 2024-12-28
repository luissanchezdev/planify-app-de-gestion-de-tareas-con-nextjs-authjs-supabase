import { auth, signOut, signIn } from "@/auth"
import SignIn from "../components/signin"

async function Dashboard() {
  const session = await auth()

  if(!session) <p>Usuario no autenticado</p>

  return (
    <div>
      <h1>Dashboard</h1>
      {
        !session
        ? <>
            <p>Usuario no autenticado</p>
            <SignIn />
          </>
        : <>
          <p>Bienvenido, { session?.user?.name }</p>
          <form action={async() => {
            "use server"
            await signOut()
          }
          }>
            <button type="submit">Cerrar sesión</button>
          </form>
        </>
      }
    </div>
  )
}

export default Dashboard
