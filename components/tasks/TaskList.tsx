"use client"
import type { ISpace, ITaskData } from "@/types/types"
import { Card } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { deleteTask } from '@/redux/slices/taskSlice'

function TaskList({tasks} : { tasks : ITaskData[]}) {

  const dispatch = useDispatch()

  if(tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-2">
        <h3 className="text-lg text-gray-600">No hay espacios. Agrega un nuevo</h3>
        <p className="text-8xl text-gray-700">⊕</p>
      </div>
    )
  }

  const handleDeleteTask = async (id : string) => {
    try{
      const { data, status } = await supabase.from('tasks').delete().gte('id', id)
      // implementar action redux
      console.log(data)
      dispatch(deleteTask(id))
    } catch(error){
      throw new Error('Falló la eliminación de la tarea')
    }
  }


  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h3 className="text-gray-750 text-xl text-center">Listado de tareas</h3>
      <div className="flex flex-col justify-center items-center gap-2">
      <div>
        { 
            tasks.map(task => {
              return (
                <Card key={ task.id } className="p-2 min-w-[100%]">
                  
                    {
                      task.id && (
                        <div className="grid grid-cols-5 justify-items-center content-center">
                      <div className="col-span-4 grid content-center justify-items-start w-full">
                        <Link href={`/spaces/${task.id}`}>
                          <p> <span className="text-luissdev-550">📁</span> { task.title }</p>
                          {/* <p className="">{ space.description }</p> */}
                        </Link>
                      </div>
                      <div className="col-span-1 my-auto">
                        <Button 
                          onClick={ () => task.id && handleDeleteTask(task.id) } 
                          variant={'outline'}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                      )
                    }
                </Card>
              )
            })
            
        }
      </div>
      </div>
    </div>
  )
}

export default TaskList
