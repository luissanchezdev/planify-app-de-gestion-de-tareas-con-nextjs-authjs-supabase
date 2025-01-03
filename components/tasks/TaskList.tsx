"use client"
import { ETypeNotification, type ISpace, type ITaskData } from "@/types/types"
import { Card } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { deleteTask } from '@/redux/slices/taskSlice'
import { notify } from "@/lib/utils"
import { AppError, handleApiError } from '@/lib/errorHandling';

function TaskList({tasks} : { tasks : ITaskData[]}) {

  const dispatch = useDispatch()

  if(tasks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-2 border-luissdev-250 shadow-md shadow-luissdev-250 py-4 px-2 rounded-md bg-luissdev-250">
        <h3 className="text-lg text-gray-600">No hay espacios. Agrega un nuevo</h3>
        <p className="text-8xl text-gray-700">⊕</p>
      </div>
    )
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const { data, error } = await supabase.from('tasks').delete().eq('id', id);
      
      if (error) {
        throw new AppError(
          'No se pudo eliminar la tarea',
          500,
          'TASK_DELETE_ERROR'
        );
      }

      dispatch(deleteTask(id));
      notify(`La tarea se ha eliminado correctamente`, ETypeNotification.warning);
    } catch (error) {
      const handledError = handleApiError(error);
      notify(handledError.message, ETypeNotification.error);
      console.error('Error al eliminar la tarea:', handledError);
    }
  }


  return (
    <div className="flex flex-col justify-center items-center gap-4 border-luissdev-250 shadow-md shadow-luissdev-250 py-4 px-2 rounded-md bg-luissdev-250">
      <h3 className="text-gray-750 text-xl text-center">Listado de tareas</h3>
      <div className="flex flex-col justify-center items-center gap-2 min-w-[100%] md:min-w-[80%]">
        { 
            tasks.map(task => {
              return (
                <Card key={ task.id } className="p-2 w-full">
                  
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
  )
}

export default TaskList
