"use client"
import type { RootState } from "@/redux/store"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Card } from "../../../components/ui/card"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateInitialState } from "@/redux/slices/spaceSlice"
import AddTaskForm from "@/components/tasks/AddTaskForm"
import { getAllSpaces } from "@/services/spaceService"
import TaskList from "@/components/tasks/TaskList"
import { getUserAuthenticated } from "@/services/authService"
import { useSession } from "next-auth/react"
import { updateUserState } from "@/redux/slices/userAuthenticatedSlice"
import { getTasks } from "@/services/taskService"
import { updateInitialTaskState } from "@/redux/slices/taskSlice"

function SpaceDetailPage() {
  const [error, setError] = useState<string>('')
  const params = useParams<{ idSpace: string }>()
  const { idSpace } = params
  const dispatch = useDispatch()
  const { data: session, status } = useSession()

  const initializeUserAndSpaces = useCallback(async () => {
    if (session && status === "authenticated") {
      try {
        const userResponse = await getUserAuthenticated(session)
        dispatch(updateUserState(userResponse))
        
        if(userResponse.user?.id){
          const spacesResponse = await getAllSpaces(userResponse.user?.id)
          dispatch(updateInitialState(spacesResponse))
          
          const taskResponse = await getTasks(idSpace, userResponse.user.id)
          dispatch(updateInitialTaskState(taskResponse))
        }
      } catch (error) {
        setError('Error al cargar los datos')
        console.error(error)
      }
    }
  }, [session, status, dispatch, idSpace])

  useEffect(() => {
    initializeUserAndSpaces()
  }, [initializeUserAndSpaces])

  const { user } = useSelector((state: RootState) => state.user)
  const spaces = useSelector((state: RootState) => state.spaces)
  const tasks = useSelector((state : RootState) => state.tasks)

  const userId = user?.id
  
  if (status === "loading") {
    return <Card className="w-h-[200px] bg-white">
    <input />
  </Card>
  }

  if (status === "unauthenticated") {
    return <div>Por favor, inicia sesión para ver este contenido</div>
  }

  const space = spaces.find(space => space.id === idSpace)

  if (!space) {
    return <p>Espacio no encontrado</p>
  }

  return (
    <>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-xl text-gray-400 text-center">
        <div className="flex gap-1 text-xl text-gray-400 justify-center">
          <Link href={'/'} className="inline-block ">
            <p>Inicio</p>
          </Link>
          /
          <Link href={'/spaces'} className="inline-block text-gray-400">
            <h2> Espacios</h2>
          </Link>
          /
        </div>
        <Link href={`/spaces/${idSpace}`} className="inline-block text-gray-700">
          <h2> { space.title} 🚀</h2>
        </Link>
      </div>
      <Card className="m-4 p-4">
        <p>{ space.description }</p>
        <p>🔖 { space.tag }</p>
      </Card>
    </div>
    <div className="flex flex-col gap-4 p-4">
      {
        userId && 
        <>
          <AddTaskForm 
            spaceId={idSpace} 
            userId={userId} 
          />
          <TaskList 
            tasks= { tasks }
          />
        </>
      }
    </div>
    </>
    
  )
}

export default SpaceDetailPage
