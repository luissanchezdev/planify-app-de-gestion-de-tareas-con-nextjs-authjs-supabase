"use client"
import { useState, useEffect, useCallback } from "react"
import type { ISpace } from "@/types/types"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { updateInitialState } from "@/redux/slices/spaceSlice"
import { Card } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { updateInitialTaskState } from "@/redux/slices/taskSlice"

function TaskList({spaceId, userId} : { spaceId : string, userId : string}) {

  // Cambiar por tasks para traer siempre que no renderice los datos desde el state global
  const tasks = useSelector((state : RootState)  => state.tasks)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()

  console.log({
    spaceId,
    userId
  })

  const getTasks = useCallback(async (spaceId : string, userId : string) => {
    try {
      const { data, status } = await supabase.from('tasks').select('*').gte('user_id', `${userId}`).gte('space_id', `${spaceId}`)
      if(!data) {
        throw new Error('No hay ningún espacio disponible')
      }

      console.log({
        taskdata: data
      })

      dispatch(updateInitialTaskState(data))

    } catch(error){
      throw new Error('Falló al obtener tareas para este espacio')
    }
  },[dispatch])

  useEffect(() => {
    getTasks(spaceId, userId)
  },[spaceId, userId, getTasks])

  
  error && (
    <div className="bg-red-600 text-white">
      <p>Se ha presentado un problema recuperando los datos</p>
    </div>
  )

  if(tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-2">
        <h3 className="text-lg text-gray-600">No hay espacios. Agrega un nuevo</h3>
        <p className="text-8xl text-gray-700">⊕</p>
      </div>
    )
  }


  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h3 className="text-gray-750 text-xl text-center">Listado de tareas</h3>
      <div className="flex flex-col justify-center items-center gap-2">
        { 
            tasks.map(task => {
              return (
                <Card key={ task.id } className="p-2 min-w-[100%]">
                  
                    <div className="grid grid-cols-5 justify-items-center content-center">
                      <div className="col-span-4 grid content-center justify-items-start w-full">
                        <Link href={`/spaces/${task.id}`}>
                          <p> <span className="text-luissdev-550">📁</span> { task.title }</p>
                          {/* <p className="">{ space.description }</p> */}
                        </Link>
                      </div>
                      <div className="col-span-1 my-auto">
                        <Button onClick={ () => console.log(`Eliminar space con id ${task.id}`) } variant={'outline'} >🗑️</Button>
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
