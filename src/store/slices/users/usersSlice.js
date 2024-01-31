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
    },
    loadingUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, loadingUsers, updateUser } = usersSlice.actions;
