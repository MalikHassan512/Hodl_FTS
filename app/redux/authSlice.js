import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId:"",
  token:  null,
  userType:  null,
  isLoggedIn: false,
  user:""
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  
    login: (state, {payload}) => {
      state.userId = payload.id;
      state.token = payload.token;
      state.userType=payload.userType
      state.isLoggedIn=true

    },
    profileData: (state, {payload}) => {
      console.log(payload,"aaaaaa")
      state.user= payload
    },
    logout: (state) => {
        state.token = null;
        state.isLoggedIn=false
      },

  }
});

// Action creators are generated for each case reducer function
export const {
login,
logout,
profileData
} = counterSlice.actions;

export default counterSlice.reducer;
