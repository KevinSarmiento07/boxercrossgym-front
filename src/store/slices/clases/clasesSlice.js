import { createSlice } from "@reduxjs/toolkit";

export const initialClaseForm = {
  id: 0,
  horario: "",
  enabled: true,
  dias: "",
};

export const clasesSlice = createSlice({
  name: "clases",
  initialState: {
    clases: [],
    claseSelect: initialClaseForm,
  },
  reducers: {
    addClase: (state, action) => {
      state.clases = [
        ...state.clases,
        {
          ...action.payload,
        },
      ];
    },
    loadingClases: (state, action) => {
      state.clases = action.payload;
    },
    updateClaseSlice: (state, action) => {
      state.clases = state.clases.map((clase) => {
        if (clase.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return clase;
      });
    },
    deleteClase: (state, action) => {
      state.clases = state.clases.filter(
        (clase) => clase.id !== action.payload
      );
    },
  },
});

export const { loadingClases, addClase, updateClaseSlice, deleteClase } =
  clasesSlice.actions;
