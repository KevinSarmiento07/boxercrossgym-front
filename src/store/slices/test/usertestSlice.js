import { createSlice } from "@reduxjs/toolkit";

export const usertestSlice = createSlice({
  name: "usertests",
  initialState: {
    usertests: [],
  },
  reducers: {
    addUserTest: (state, action) => {
      state.usertests = [
        ...state.usertests,
        {
          ...action.payload,
        },
      ];
    },
    loadingUserTest: (state, action) => {
      state.usertests = action.payload;
    },
  },
});

export const { addUserTest, loadingUserTest } = usertestSlice.actions;
