"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemAddSpaceForm } from "@/schemas/SchemaAddSpacForm"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { addSpace } from "@/redux/slices/spaceSlice"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Form } from "../ui/form"
import { Button } from "../ui/button"
import { notify } from "@/lib/utils"
import { ETypeNotification } from "@/types/types"


interface IAddSpaceFormInputs {
  title: string,
  description: string,
  tag: string
}

interface ISpaceData {
  user_id : string,
  title: string,
  description: string,
  tag: string
}

function AddSpaceForm() {
  

  // En componentes de cliente no se usa el adaptador de auth ni de supabase ?, se usa el hook useSession. Pero para esto debo usar el provider SessionProvider en el componente padre. En este caso en /spaces/page.tsx que es el componente padre.
  const { data: session } = useSession()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAddSpaceFormInputs>({
    resolver: zodResolver(schemAddSpaceForm)
  })

  const onSubmit: SubmitHandler<IAddSpaceFormInputs> = async (data) => {

    if(session?.user?.id) {

    const dataSpace = {
        id : crypto.randomUUID(),
        user_id: session?.user?.id,
        title: data.title,
        description: data.description,
        tag: data.tag
    }

    const { data : dataSupabase , error } = await supabase
    .from('spaces')
    .insert([
      dataSpace
    ])
    .select()

    if (error) {
      console.error("Error al crear el espacio:", error);
      return;
    }
  
      dispatch(addSpace(dataSpace))
      notify(`Espacio "${dataSpace.title}" creado`, ETypeNotification.success)
      console.log("Espacio creado:", dataSpace);
      reset()
    }
  }
  
  return (
    <>
      <Card className="flex flex-col justify-center items-center gap-4 p-6">
      <h3 className="text-lg text-gray-700 text-center">Agregar espacio</h3>
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
        <Button type="submit" className="bg-luissdev-650 mt-2">Crear espacio</Button>
      </form>
      </Card>
    </>
  )
}

export default AddSpaceForm
