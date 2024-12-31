"use client"
import { useState, useEffect, useCallback } from "react"
import type { ISpace } from "@/types/types"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { updateInitialState } from "@/lib/redux/slices/spaceSlice"

function SpaceList() {

  const spaces = useSelector((state : RootState)  => state.spaces)
  const [error, setError] = useState<string | null>(null)

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

  
  error && <p>Se ha presentado un problema recuperando los datos</p>

  if(spaces.length === 0) {
    return (
      <div>
        <p>No hay espacios. Agrega un nuevo</p>
        <p className="text-4xl">🚀</p>
      </div>
    )
  }


  return (
    <div>
      <h1>Listado de espacios</h1>
      { 
          spaces.map(space => {
            return (
              <div key={ space.id }>
                <p>{ space.title }</p>
                <p>{ space.description }</p>
                
              </div>
            )
          })
          
      }
    </div>
  )
}

export default SpaceList
