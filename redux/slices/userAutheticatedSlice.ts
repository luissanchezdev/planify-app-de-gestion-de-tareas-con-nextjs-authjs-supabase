import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialUserState = {
  isAuthenticated: false,
  user: null,
  token: null,
  expiresAt: null
}

