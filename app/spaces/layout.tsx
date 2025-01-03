import Link from "next/link"
import BtnSignOut from "@/components/signout"
import Providers from "../Providers"
import AvatarCustom from "@/components/ui/customs/AvatarCustom"
import { ToastContainer } from "react-toastify"
import BreadCrumbs from "@/components/BreadCrumbs"

async function LayoutSpaces({ children } : { children : React.ReactNode}) {

  return (

      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <div className="flex flex-col flex-md justify-between items-center p-4">
            <header className="flex flex-row flex-md justify-between items-center p-4 w-full">
              <h1 className="text-2xl text-gray-800 text-center">
                <Link href={'/'}>
                  Planify
                </Link>
              </h1>
              <div className="flex flex-row">
                <AvatarCustom />
                <BtnSignOut />
              </div>
            </header>
            <BreadCrumbs />
          </div>
          { children}
          <ToastContainer />        
        </div>
        <footer className="flex flex-col justify-center items-center md:row md:justify-center">
          <p className="text-gray-500">Desarrollado por <a href='#'>Luis Sanchez</a> @{ new Date().getFullYear() }</p>
        </footer>
      </div>

  )
}

export default LayoutSpaces