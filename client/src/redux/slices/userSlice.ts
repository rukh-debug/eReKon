import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { User } from "@/ts/interfaces/user_interfaces"

import { RootState } from "../store"


const initialState: User = {
  isAuthenticated: false,
  email: "",
  token: "",
  username: "",
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.username = action.payload.username;
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user
      }
    }
  }

})
export const { setUser } = userSlice.actions
export const selectUserState = (state: RootState) => state.user
export default userSlice.reducer;