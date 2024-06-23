import { createSlice } from "@reduxjs/toolkit";

export const exerciseEntrenamiento = {
    id: 0,
    nombre: "",
  };
  
  export const exercisesSlice = createSlice({
    name: "exercises",
    initialState: {
      exercises: [],
      exerciseSelected: exerciseEntrenamiento,
      isLoading: true,
    },  
    reducers: {
        loadingExercises: (state, action) => {
          state.exercises = action.payload;
          state.isLoading = false;
        },
        loadingError: (state, { payload }) => {
          state.errors = payload;
        },
      },  
  });
  
  export const {loadingExercises, loadingError } = exercisesSlice.actions;
  
