import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import SpaceService from "@/services/spaceService";
import { ISpace } from "@/types/types";

let initialState : ISpace[] = []

/* // El estado inicial será [], no se usará esta función para obtener el estado inicial, pero sí se usar en una acción asincrona con createAsyncThunk
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

getServices() */


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
    },
    updateInitialState(state: ISpace[], action: PayloadAction<ISpace[]>){
      return [
        ...action.payload
      ]
    }
  }
})

export const { addSpace, updateInitialState } = spaceSlice.actions
export default spaceSlice.reducer
