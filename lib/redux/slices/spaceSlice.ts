import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import SpaceService from "@/app/services/spaceService";
import { ISpace } from "@/types/types";

let initialState : ISpace[] = []

const getServices = async () => {
  try {
    const data = await SpaceService.getAllSpaces()
    if(data){
      initialState: data
    }
    return data
  } catch(error) {
    throw new Error('Fallo al traer los Espacios guardados en la base de datos')
  }
}

getServices()


export const spaceSlice = createSlice({
  name: 'space',
  initialState: initialState,
  reducers: {
    addSpace: (state : ISpace[], action : PayloadAction<{ user_id: string, title: string, description : string, tag : string }>) => {
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          ...action.payload
        }
      ]
    }
  }
})

export const { addSpace } = spaceSlice.actions
export default spaceSlice.reducer
