import { ISession } from "@/types/types"
import { Session } from "next-auth"
import type { DefaultSession } from "next-auth"


export const getUserAuthenticated = async (session : DefaultSession) => {
   const { user, ...data } = session
   if(user && data) {

    const newState = {
      isAuthenticated: true,
      user: user,
      token: data.expires,
      expiresAt: data.expires
    }

    return newState
   }
}
