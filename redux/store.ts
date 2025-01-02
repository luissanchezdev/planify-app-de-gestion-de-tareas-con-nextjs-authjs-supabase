import { configureStore } from "@reduxjs/toolkit";
import  spaceReducer from "./slices/spaceSlice"
import  taskReducer from "./slices/taskSlice"

export const store = configureStore({
  reducer: {
    'spaces' : spaceReducer,
    'tasks' : taskReducer,
  }
})

// Se genera un tipo del estado global
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ReturnType<typeof store.dispatch>