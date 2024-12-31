import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

function BtnSignOut() {
  return (
    <form action={async () => {
      "use server"
      await signOut()
      redirect('/')
    }}>
      <Button type="submit" variant={'link'}>➡️</Button>
    </form>
  )
}

export default BtnSignOut
