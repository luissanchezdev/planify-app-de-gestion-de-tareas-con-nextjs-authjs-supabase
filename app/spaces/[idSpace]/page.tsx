"use client"
import type { RootState } from "@/redux/store"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Card } from "../../../components/ui/card"
import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useDispatch } from "react-redux"
import { updateInitialState } from "@/redux/slices/spaceSlice"
import AddTaskForm from "@/components/tasks/AddTaskForm"
import { SubmitHandler, useForm } from "react-hook-form"
import { getAllSpaces } from "@/services/spaceService"
import TaskList from "@/components/tasks/TaskList"

interface ITestFormInputs {
  title : string
}

function SpaceDetailPage() {
  const [ error, setError ] = useState<string>('')
  const params = useParams<{ idSpace : string }>()
  const { idSpace } = params
  console.log({ idSpace })
  
  const { user } = useSelector((state : RootState) => {
    return state.user
  })

  const userId = user?.id


  const dispatch = useDispatch()

  const getSpaces = useCallback(async (userId : string) => {
    try {
      const response = await getAllSpaces(userId)
      console.log(response)
      dispatch(updateInitialState(response))
      
    } catch (error) {
      throw new Error('Fallo al obtener los espacios')
    }
  },[dispatch])

  useEffect(() => {
    if(user && user.id){
      getSpaces(user.id)
    }
  },[getSpaces, user])


  const spaces = useSelector((state : RootState) => {
    return state.spaces
  })
  
  const space = (spaces.filter(space => space.id === idSpace))[0]

  if(!space){
    return  <p>Espacio no encontrado</p>
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
            spaceId={ idSpace }
            userId={ userId }
          />
        </>
      }
      {

      }
    </div>
    </>
    
  )
}

export default SpaceDetailPage
