import { createSlice } from "@reduxjs/toolkit";

export const initialTestForm = {
  id: 0,
  descripcion: "",
  medicion: "",
};
export const testSlice = createSlice({
  name: "tests",
  initialState: {
    tests: [],
    visibleForm: false,
    testSelected: initialTestForm,
  },
  reducers: {
    addTest: (state, action) => {
      state.tests = [
        ...state.tests,
        {
          ...action.payload,
        },
      ];
      state.testSelected = initialTestForm;
      state.visibleForm = false;
    },
    removeTest: (state, action) => {
      state.tests = state.tests.filter((test) => {
        if (test.id !== action.payload) {
          return test;
        }
      });
    },
    loadingTests: (state, action) => {
      state.tests = action.payload;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
    },
  },
});

export const { addTest, removeTest, loadingTests, onOpenForm, onCloseForm } =
  testSlice.actions;
