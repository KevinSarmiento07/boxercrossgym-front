import { createSlice } from "@reduxjs/toolkit";

export const initialEntrenamiento = {
  entrenamiento: {
    id: 0,
    titulo: "",
    fechaEntreno: null,
  },
  bloques: [],
};

export const initialEntrenamientoForm = {
  id: 0,
  fechaEntreno: null,
  titulo: "",
  nombre: "",
  descripcion: "",
};

export const entrenamientoSlice = createSlice({
  name: "entrenamientos",
  initialState: {
    days: [],
    entrenamientoSelected: initialEntrenamiento,
    bloques: [],
    entrenamientos: [initialEntrenamiento],
  },
  reducers: {
    loadingDays(state, action) {
      state.days = action.payload;
    },
    loadBloques(state, action) {
      state.bloques = [...state.bloques, { ...action.payload }];
    },
    addEntrenamiento(state, action) {
      state.entrenamientos = [...state.entrenamientos, { ...action.payload }];
      state.entrenamientoSelected = initialEntrenamientoForm;
      state.bloques = [];
    },
  },
});

export const { loadingDays, loadBloques, addEntrenamiento } =
  entrenamientoSlice.actions;
