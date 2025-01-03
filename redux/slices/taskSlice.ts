import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISpace, ITaskData } from "@/types/types";

let initialState : ITaskData[] = []

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    addTask: (state : ITaskData[], action : PayloadAction<ITaskData>) => {
      return [
        ...state,
        {
          ...action.payload
        }
      ]
    },
    updateInitialTaskState(state: ITaskData[], action: PayloadAction<ITaskData[]>){
      return [
        ...action.payload
      ]
    },
    deleteTask(state : ITaskData[], action : PayloadAction<string>){
      return state.filter(state => state.id !== action.payload)
    },
    resetTask(state : ITaskData[]){
      return initialState
    }
  }
})

export const { addTask, updateInitialTaskState, deleteTask, resetTask } = taskSlice.actions
export default taskSlice.reducer
