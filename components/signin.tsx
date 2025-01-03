import { signIn } from "@/auth"
 
function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit" className="bg-black hover:bg-gray-800 text-white border rounded-md py-2 px-4 my-2">Inicio de sesión con Google</button>
    </form>
  )
} 

export default SignIn