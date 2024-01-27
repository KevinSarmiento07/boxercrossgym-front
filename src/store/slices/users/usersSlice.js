import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
  foto: "",
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  fechaNacimiento: null,
  fechaInscripcion: null,
  sexo: "",
  telefono: "",
  documento: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userSelected: initialUserForm,
  },
  reducers: {
    addUser: (state, action) => {
      state.users = [...state.users, { ...action.payload }];
      state.userSelected = initialUserForm;
    },
    loadingUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, loadingUsers } = usersSlice.actions;
