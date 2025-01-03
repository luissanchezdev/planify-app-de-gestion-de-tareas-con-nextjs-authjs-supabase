"use client"
import { useState, useEffect, useCallback } from "react"
import { ETypeNotification, type ISpace } from "@/types/types"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { updateInitialState, deleteSpace } from "@/redux/slices/spaceSlice"
import { Card } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { notify } from "@/lib/utils"

function SpaceList({ spaces } : { spaces : ISpace[]}) {
  
  const user = useSelector((state : RootState)  => state.user)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()

  const handleDeleteSpace = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      dispatch(deleteSpace(id))
      notify(`Espacio con ID ${id} eliminado`, ETypeNotification.warning)
      
    } catch (error) {
      throw new Error('Falló la eliminación del espacio')
    }
  }

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
      <div className="flex flex-col justify-center items-center gap-2 min-w-[100%] md:min-w-[80%]">
        { 
            spaces.map(space => {
              return (
                <Card key={ space.id } className="p-2 w-full">
                  
                    <div className="grid grid-cols-5 justify-items-center content-center">
                      <div className="col-span-4 grid content-center justify-items-start w-full">
                        <Link href={`/spaces/${space.id}`}>
                          <p> <span className="text-luissdev-550">📁</span> { space.title }</p>
                          {/* <p className="">{ space.description }</p> */}
                        </Link>
                      </div>
                      <div className="col-span-1 my-auto">
                        <Button 
                          onClick={() => space.id && handleDeleteSpace(space.id)} 
                          variant={'outline'}
                        >
                          🗑️
                        </Button>
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

export default SpaceList
