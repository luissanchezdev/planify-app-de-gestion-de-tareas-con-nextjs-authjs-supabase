"use client"
import type { RootState } from "@/redux/store"
import { redirect, useParams } from "next/navigation"
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
import { Skeleton } from "@/components/ui/skeleton"
import SkeletonAddTaskForm from "@/components/tasks/SkeletonAddTaskForm"
import SkeletonTaskList from "@/components/tasks/SkeletonTaskList"
import BreadCrumbs from "@/components/BreadCrumbs"
import SkeletonBreadCrumbs from "@/components/SkeletonBreadCrumbs"

function SpaceDetailPage() {
  const [error, setError] = useState<string>('')
  const params = useParams<{ idSpace: string }>()
  const { idSpace } = params
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const [isLoadingSpaces, setIsLoadingSpaces] = useState<boolean>(true)

  const initializeUserAndSpaces = useCallback(async () => {

    if (session && status === "authenticated") {
      try {
        const userResponse = await getUserAuthenticated(session)
        dispatch(updateUserState(userResponse))
        
        if(userResponse.user?.id){
          const spacesResponse = await getAllSpaces(userResponse.user?.id)
          dispatch(updateInitialState(spacesResponse))
          setIsLoadingSpaces(false)
          
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
  
  if (status === "loading" || isLoadingSpaces) {
    return (
      <>
        <div className="max-w-screen-md mx-auto">
          <SkeletonBreadCrumbs />
          <div className="flex flex-col gap-6">
            <Card className="m-4 p-4 flex flex-col ">
              <h3 className=""> Descripción </h3>
              <Skeleton className="h-">🔖 Etiqueta</Skeleton>
            </Card>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <SkeletonAddTaskForm />
            <SkeletonTaskList />
          </div>
        </div>
      </>
    )
  }

  if (status === "unauthenticated") {
    redirect('/')
  }

  const space = !isLoadingSpaces && spaces.find(space => space.id === idSpace)

  if (!space) {
    return <p>Espacio no encontrado</p>
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <BreadCrumbs 
        size={3}
        space={
        {spaceId : space.id ? space.id : '', title : space.title}
        }
      />
    <div className="flex flex-col gap-6">
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
    </div>
    
  )
}

export default SpaceDetailPage
