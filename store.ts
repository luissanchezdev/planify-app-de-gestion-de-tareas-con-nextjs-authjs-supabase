import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "./lib/redux/slices/spaceSlice";

export const store = configureStore({
  reducer: {
    'spaces' : spaceReducer
  }
})

// Se genera un tipo del estado global
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ReturnType<typeof store.dispatch>