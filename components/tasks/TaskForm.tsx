"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaAddTaskForm } from "@/schemas/SchemaAddTask"
import { useDispatch, useSelector } from "react-redux"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IAddTaskFormInputs, ITaskData, ITaskProps } from "@/types/types"
import { addTask } from "@/redux/slices/taskSlice"
import { useParams } from "next/navigation"
import { RootState } from "@/redux/store"

function AddTaskForm() {
  const params = useParams<{idSpace : string}>()
  const { idSpace } = params
  
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.id;

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAddTaskFormInputs>({
    resolver: zodResolver(schemaAddTaskForm)
  })

  const onSubmit: SubmitHandler<IAddTaskFormInputs> = async (data) => {

    console.log({ data })

    if (!userId) {
      console.error("Error: userId is undefined");
      return;
    }

    const dataTask : ITaskData = {
        space_id: idSpace,
        user_id: userId,
        title: data.title,
        description: data.description,
        tag: data.tag,
        completed: true
    }

    const { data : dataSupabase , error } = await supabase
    .from('tasks')
    .insert([
      dataTask
    ])
    .select()

    if(data) {
      dispatch(addTask(dataTask))
    }

    // Va el dispatch de la nueva tarea, usando la tarea devuelta por supabase después del INSERT
    // dispatch(AddTask(data))

    if (error) {
      console.error("Error al crear la tarea:", error);
      return;
    }
  
      dispatch(addTask(dataTask))
      console.log("Tarea creada:", dataTask);
      reset()

  }
  
  return (
    <Card className="flex flex-col justify-center items-center gap-4 p-6">
      <h3 className="text-lg text-gray-700 text-center">Agregar tarea</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 flex flex-col justify-center items-center gap-2 w-full">
        <div className="w-full">
          <label htmlFor="title">Título</label>
          <Input className="dark:text-black" id="title" type="text" placeholder="Es necesario hacer..." {...register("title")} />
          { errors.title && <p>{ errors.title.message }</p> }
        </div>
        <div className="w-full">
          <label htmlFor="description">Descripción</label>
          <Input className="dark:text-black" id="description" type="text" placeholder="Lo voy ha realizar así..." {...register("description")} />
          { errors.description && <p>{ errors.description.message }</p> }
        </div>
        <div className="w-full">
          <label htmlFor="tag">Etiqueta</label>
          <Input className="dark:text-black" id="tag" type="text" placeholder="Categoría..." {...register("tag")} />
          { errors.tag && <p>{ errors.tag.message }</p> }
        </div>
        <Button type="submit" className="bg-luissdev-650 mt-2">Crear tarea</Button>
      </form>
    </Card>
  )
}

export default AddTaskForm
