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
          ...action.payload
        }
      ]
    },
    updateInitialState(state: ISpace[], action: PayloadAction<ISpace[]>){
      return [
        ...action.payload
      ]
    },
    deleteSpace: (state, action: PayloadAction<string>) => {
      return state.filter(space => space.id !== action.payload)
    }
  }
})

export const { addSpace, updateInitialState, deleteSpace } = spaceSlice.actions
export default spaceSlice.reducer
