import Link from 'next/link'

function BreadCrumbs() {
  return (
      <div className="flex gap-1 text-xl text-gray-400 text-center">
          <Link href={'/'} className="inline-block ">
            <p>Inicio</p>
          </Link>
          /
          <Link href={'/spaces'} className="inline-block text-gray-700">
            <h2> Espacios 🚀</h2>
          </Link>
      </div>
  )
}

export default BreadCrumbs
