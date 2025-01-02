import { signIn } from "@/auth"
 
function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Inicio de sesión con Google</button>
    </form>
  )
} 

export default SignIn