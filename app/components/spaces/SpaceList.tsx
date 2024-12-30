"use client"
import { useState, useEffect, useCallback } from "react"
import type { ISpace } from "@/types/types"

import { supabase } from "@/lib/supabaseClient"

function SpaceList() {

  const [spaces, setSpaces] = useState<ISpace[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getSpaces()
  }, [])

  const getSpaces = async () => {
    const { data , error } = await supabase.from('spaces').select('*')

    if(error) {
      console.log(error)
      setError(error.message)
    }

    if(data){
      setSpaces(data)
    }
  }

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
