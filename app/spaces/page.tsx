"use client"

import { auth } from "@/auth"
import { redirect } from "next/navigation";
import AddSpaceForm from "@/components/spaces/AddSpaceForm";
import { SessionProvider, signOut } from "next-auth/react";
import SpaceList from "@/components/spaces/SpaceList";
import BtnSignOut from "@/components/signout";
import Link from "next/link";
import { getUserAuthenticated } from "../../services/authService";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { updateInitialState } from '@/redux/slices/spaceSlice';


function Spaces() {
  const [error, setError] = useState<string>()
  const dispatch = useDispatch()
  const user = useSelector((state : RootState) => {
    return state.user
  })
  const spaces = useSelector((state : RootState) => {
    return state.spaces
  })

  const getSpaces = useCallback((async () => {
    const { data , error } = await supabase.from('spaces').select('*').gte('user_id', `${user.user?.id}` )

    if(error) {
      console.log(error)
      setError(error.message)
    }

    if(data){
      dispatch(updateInitialState(data)) 
    }

    if(data?.length === 0) {
      return (
        <>No hay espacios</>
      )
    }
  }),[dispatch, user.user?.id]
)

  useEffect(() => {
    getSpaces()
  }, [getSpaces])
  


  return (
    <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex gap-1 text-xl text-gray-400 text-center">
          <Link href={'/'} className="inline-block ">
            <p>Inicio</p>
          </Link>
          /
          <Link href={'/spaces'} className="inline-block text-gray-700">
            <h2> Espacios 🚀</h2>
          </Link>
      </div>
      <main>
        {
            <SessionProvider>
              <div className="flex flex-col gap-4 p-4">
                <header>
                  <AddSpaceForm />
                </header>
                <section className="border-luissdev-250 shadow-md shadow-luissdev-250 py-4 px-2 rounded-md bg-luissdev-250">
                  <SpaceList 
                    spaces={ spaces }
                  />
                </section>
              </div>
            </SessionProvider>
        }
      </main>
    </div>
  )
}

export default Spaces
