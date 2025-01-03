import { ISession } from "@/types/types"
import { Session } from "next-auth"
import type { DefaultSession } from "next-auth"
import { IUserState } from "@/types/types"


export const getUserAuthenticated = async (session: DefaultSession): Promise<IUserState> => {
   const { user, ...data } = session
   if(user && data) {
    const newState: IUserState = {
      isAuthenticated: true,
      user: user,
      token: data.expires,
      expiresAt: data.expires
    }
    return newState
   }
   // Si no hay sesión, devolvemos un estado por defecto
   return {
     isAuthenticated: false,
     user: null,
     token: null,
     expiresAt: null
   }
}