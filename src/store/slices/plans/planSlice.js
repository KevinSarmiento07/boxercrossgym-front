import { createSlice } from "@reduxjs/toolkit";

export const initialPlanForm = {
  id: 0,
  nombre: "",
  valor: 0,
  duracion: 0,
};

export const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
    planSelected: initialPlanForm,
  },
  reducers: {
    addPlan: (state, action) => {
      state.plans = [...state.plans, { ...action.payload }];
    },
    loadingPlans: (state, action) => {
      state.plans = action.payload;
    },
    deletePlanS: (state, action) => {
      state.plans = state.plans.filter((plan) => {
        if (plan.id !== action.payload) {
          return plan;
        }
      });
    },
  },
});

export const { addPlan, loadingPlans, deletePlanS } = planSlice.actions;
