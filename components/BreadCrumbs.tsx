import Link from 'next/link'

const defaultSpace = {spaceId : 'default', title : 'default'}

function BreadCrumbs({size = 2, space = defaultSpace } : {size : number, space : {spaceId : string, title : string} } ) {
  return (
      <div className='flex flex-col gap-1 text-xl text-gray-400 text-center justify-center items-center'>
        <div className="flex gap-1 text-xl text-gray-400 text-center">
            <Link href={'/'} className="inline-block ">
              <p>Inicio</p>
            </Link>
            /
            <Link href={'/spaces'} className={ size === 2 ? 'inline-block text-gray-700' :  'inline-block'}>
              <h2> Espacios { size === 2 && '🚀' }</h2>
            </Link>
            /
        </div>
        <div>
          <Link href={`/spaces/${space.spaceId}`} className={ size === 3 ? 'inline-block text-gray-700' : 'hidden'}>
            <h2> { space.title} { size === 3 && '🚀' }</h2>
          </Link>
        </div>
      </div>
  )
}

export default BreadCrumbs
