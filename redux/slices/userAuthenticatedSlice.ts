import { IUserState } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';


const initialUserAuthenticatedState : IUserState = {
  isAuthenticated: true,
  user: null,
  token: null,
  expiresAt: null
}

export const userAuthenticatedSlice = createSlice({
  name : 'user',
  initialState: initialUserAuthenticatedState,
  reducers : {
    updateUserState : (state : IUserState, action : PayloadAction<IUserState>) => {
      return {
        ...action.payload
      }
    },
    clearState : (state) => {
      return {
        ...initialUserAuthenticatedState
      }
    }
  }
})

export const { updateUserState } = userAuthenticatedSlice.actions

export default userAuthenticatedSlice.reducer