"use client"

import { RootState } from "@/store"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Card } from "../../components/ui/card"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { updateInitialState } from "@/lib/redux/slices/spaceSlice"

function SpaceDetailPage() {
  const [ error, setError ] = useState<string>('')
  const { idSpace } = useParams()
  console.log({ idSpace })
  
  const dispatch = useDispatch()

  const getSpaces = useCallback((async () => {
    const { data , error } = await supabase.from('spaces').select('*')

    if(error) {
      console.log(error)
      setError(error.message)
    }

    if(data){
      console.log({ data })
      dispatch(updateInitialState(data))
      
    }
  }),[dispatch]
)

  useEffect(() => {
    getSpaces()
  }, [getSpaces])

  const spaces = useSelector((state : RootState) => {
    return state.spaces
  })

  console.log({ spaces })

  const space = (spaces.filter(space => space.id === idSpace))[0]
  console.log({ space })
  if(!space){
    return  <p>Espacio no encontrado</p>
  }
  

  return (
    <>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-xl text-gray-400 text-center">
        <div className="flex gap-1 text-xl text-gray-400 justify-center">
          <Link href={'/'} className="inline-block ">
            <p>Inicio</p>
          </Link>
          /
          <Link href={'/spaces'} className="inline-block text-gray-400">
            <h2> Espacios</h2>
          </Link>
          /
        </div>
        <Link href={`/spaces/${idSpace}`} className="inline-block text-gray-700">
          <h2> { space.title} 🚀</h2>
        </Link>
      </div>
      <Card className="m-4 p-4">
        <p>{ space.description }</p>
        <p>🔖 { space.tag }</p>
      </Card>
      <h1>Detalle de espacio</h1>
      <h2>{ space.title }</h2>
    </div>
    
    </>
    
  )
}

export default SpaceDetailPage
