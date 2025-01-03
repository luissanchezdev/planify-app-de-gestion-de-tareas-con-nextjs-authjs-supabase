import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

const defaultSpace = {spaceId : 'default', title : 'default'}

function SkeletonBreadCrumbs() {
  return (
      <div className='flex flex-col gap-1 text-xl text-gray-400 text-center justify-center items-center'>
        <div className="flex gap-1 text-xl text-gray-400 text-center">
            <Link href={'/'} className="inline-block ">
              <p>Inicio</p>
            </Link>
            /
            <Link href={'/spaces'} className={ 'inline-block text-gray-400'}>
              <h2> Espacios</h2>
            </Link>
            /
        </div>
        <div>
          <Skeleton className={ 'inline-block text-gray-700 h-5'}>
            <p className='h-5'> Titulo del espacio '🚀'</p>
          </Skeleton>
        </div>
      </div>
  )
}

export default SkeletonBreadCrumbs
