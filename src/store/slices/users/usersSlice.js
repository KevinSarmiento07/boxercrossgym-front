import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
  id: 0,
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  fechaNacimiento: null,
  fechaInscripcion: null,
  sexo: "",
  telefono: "",
  cedula: "",
  foto: "",
  antecedente: "",
  admin: false,
  entrenador: false,
};

const initialErrors = {
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  fechaInscripcion: "",
  sexo: "",
  telefono: "",
  email: "",
  cedula: "",
  password: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userSelected: initialUserForm,
    errors: initialErrors,
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, { ...action.payload }];
      state.userSelected = initialUserForm;
      state.errors = initialErrors;
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.id == action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return user;
      });
      state.userSelected = initialUserForm;
      state.errors = initialErrors;
    },
    loadingUsers: (state, action) => {
      state.users = action.payload;
    },
    loadingError: (state, { payload }) => {
      state.errors = payload;
    },
  },
});

export const { addUser, loadingUsers, updateUser, loadingError } = usersSlice.actions;
