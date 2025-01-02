'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useCallback, useEffect } from "react"
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from "react-redux";
import { updateUserState } from "@/redux/slices/userAuthenticatedSlice";
import { getUserAuthenticated } from "@/services/authService";
import { Session } from "next-auth";
import { IUserState } from "@/types/types";
import { RootState } from "@/redux/store";

function AvatarCustom() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  
  const setNewUserState = useCallback(async (session: Session) => {
    try {
      const response = await getUserAuthenticated(session)
      if (response && response.user.id) {
        dispatch(updateUserState(response as IUserState))
      }
    } catch (error) {
      console.error(error)
    }
  }, [dispatch])

  useEffect(() => {
    if (session && status === 'authenticated') {
      setNewUserState(session)
    }
  }, [session, status, setNewUserState])

  const { user } = useSelector((state: RootState) => state.user)

  if (!user) {
    return (
      <Avatar className="">
        <AvatarFallback>Loading...</AvatarFallback>
      </Avatar>
    )
  }

  console.log(user.image)

  return (
    <Avatar className="">
      <AvatarImage 
        src={user.image || 'https://avatars.githubusercontent.com/u/50006980?v=4'} 
        alt={`${user.name}'s avatar`}  
        className="rounded-full w-[48px] h-[48px] md:w-[64px] md:h-[64px]"
      />
    </Avatar>
  )
}

export default AvatarCustom
