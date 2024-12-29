function layoutSpaces({ children } : { children : React.ReactNode}) {
  return (
    <div>
      <header>Planify</header>
      { children}
      <footer>Desarrollado por <a href='#'>Luis Sanchez</a> - { new Date().getFullYear() }</footer>
    </div>
  )
}

export default layoutSpaces