"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schemAddSpaceForm } from "@/schemas/SchemaAddSpacForm"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { addSpace } from "@/lib/redux/slices/spaceSlice"

interface IAddSpaceFormInputs {
  title: string,
  description: string,
  tag: string
}

function AddSpaceForm() {

  // En componentes de cliente no se usa el adaptador de auth ni de supabase ?, se usa el hook useSession. Pero para esto debo usar el provider SessionProvider en el componente padre. En este caso en /spaces/page.tsx que es el componente padre.
  const { data: session } = useSession()
  console.log(session)

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
        ...data,
        user_id: session?.user?.id
      }
  
      await dispatch(addSpace(dataSpace))
      console.log("Espacio creado:", dataSpace);
      reset()
    }


    /* console.log({
      dataForVerify: data,
      session: session
    })
    const { data: dataSpace, error } = await supabase
      .from('spaces')
      .insert([
        {
          user_id: session?.user?.id,
          title: data.title,
          description: data.description,
          tag: data.tag
        },
      ])
      .select()
    
    if (error) {
      console.error("Error al crear el espacio:", error);
      return;
    } */
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Título</label>
          <input className="dark:text-black" id="title" type="text" placeholder="Planeando..." {...register("title")} />
          { errors.title && <p>{ errors.title.message }</p> }
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <input className="dark:text-black" id="description" type="text" placeholder="Planeando..." {...register("description")} />
          { errors.description && <p>{ errors.description.message }</p> }
        </div>
        <div>
          <label htmlFor="tag">Etiqueta</label>
          <input className="dark:text-black" id="tag" type="text" placeholder="Planeando..." {...register("tag")} />
          { errors.tag && <p>{ errors.tag.message }</p> }
        </div>
        <button type="submit">Crear espacio</button>
      </form>
    </div>
  )
}

export default AddSpaceForm
