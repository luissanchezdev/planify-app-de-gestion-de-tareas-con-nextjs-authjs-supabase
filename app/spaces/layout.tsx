import BtnSignOut from "../components/signout"

function layoutSpaces({ children } : { children : React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <header className="flex flex-md justify-between items-center p-4">
          <h1 className="text-2xl text-gray-800 text-center">Planify</h1>
          <BtnSignOut />
        </header>
        { children}        
      </div>
      <footer className="flex flex-col justify-center items-center md:row md:justify-center">
        <p className="text-gray-500">Desarrollado por <a href='#'>Luis Sanchez</a> @{ new Date().getFullYear() }</p>
      </footer>
    </div>
  )
}

export default layoutSpaces