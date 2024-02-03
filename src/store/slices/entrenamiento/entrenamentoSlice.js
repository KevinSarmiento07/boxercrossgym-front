import { createSlice } from "@reduxjs/toolkit";

export const entrenamientoSlice = createSlice({
  name: "entrenamientos",
  initialState: {
    days: [],
  },
  reducers: {
    loadingDays(state, action) {
      state.days = action.payload;
    },
  },
});

export const { loadingDays } = entrenamientoSlice.actions;
