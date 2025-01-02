import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISpace } from "@/types/types";

let initialState : ISpace[] = []


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
