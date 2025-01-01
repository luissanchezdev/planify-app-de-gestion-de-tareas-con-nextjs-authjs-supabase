"use client"
import { useState, useEffect, useCallback } from "react"
import type { ISpace } from "@/types/types"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { updateInitialState } from "@/lib/redux/slices/spaceSlice"
import { Card } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"

function TaskList() {

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

  
  error && (
    <div className="bg-red-600 text-white">
      <p>Se ha presentado un problema recuperando los datos</p>
    </div>
  )

  if(spaces.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-2">
        <h3 className="text-lg text-gray-600">No hay espacios. Agrega un nuevo</h3>
        <p className="text-8xl text-gray-700">⊕</p>
      </div>
    )
  }


  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h3 className="text-gray-750 text-xl text-center">Listado de espacios</h3>
      <div className="flex flex-col justify-center items-center gap-2">
        { 
            spaces.map(space => {
              return (
                <Card key={ space.id } className="p-2 min-w-[100%]">
                  
                    <div className="grid grid-cols-5 justify-items-center content-center">
                      <div className="col-span-4 grid content-center justify-items-start w-full">
                        <Link href={`/spaces/${space.id}`}>
                          <p> <span className="text-luissdev-550">📁</span> { space.title }</p>
                          {/* <p className="">{ space.description }</p> */}
                        </Link>
                      </div>
                      <div className="col-span-1 my-auto">
                        <Button onClick={ () => console.log(`Eliminar space con id ${space.id}`) } variant={'outline'} >🗑️</Button>
                      </div>
                    </div>
                  
                  
                </Card>
              )
            })
            
        }
      </div>
    </div>
  )
}

export default TaskList
