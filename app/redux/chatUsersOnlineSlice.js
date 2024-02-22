import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const slice = createSlice({
  name: "chatUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const userIdToAdd = action.payload;
      if (!state.users.includes(userIdToAdd)) {
        state.users.push(userIdToAdd);
      }
    },
    addUsers: (state, action) => {
      const newIds = action.payload.filter(userId =>
        !state.users.includes(userId)
      );
      state.users.push(...newIds);
      console.log(state.users,"users");
    },
    removeUser: (state, action) => {
      const userIdToRemove = action.payload;
      state.users = state.users.filter(id => id !== userIdToRemove);
    },
    removeUsers: (state, action) => {
      const userIdsToRemove = action.payload;
      state.users = state.users.filter(id => !userIdsToRemove.includes(id));
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser, addUsers, removeUser, removeUsers } = slice.actions;

export default slice.reducer;
