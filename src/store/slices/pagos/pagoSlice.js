import { createSlice } from "@reduxjs/toolkit";

export const initialPayForm = {
  id: 0,
  valorPagado: 0,
  fechaPago: null,
  fechaVencimiento: null,
  usuario: { id: 0 },
  plan: { id: 0, nombre: "", valor: 0 },
  tipoPago: "",
};

export const pagoSlice = createSlice({
  name: "pagos",
  initialState: {
    pagos: [],
    pagoSelected: initialPayForm,
  },
  reducers: {
    addPago(state, action) {
      state.pagos = [...state.pagos, { ...action.payload }];
      state.pagoSelected = initialPayForm;
    },
    updatePago: (state, action) => {
      state.pagos = state.pagos.map((pago) => {
        if (pago.id == action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return pago;
      });
      state.pagoSelected = initialPayForm;
    },
    loadingPagos(state, action) {
      state.pagos = action.payload;
    },
  },
});

export const { addPago, updatePago, loadingPagos } = pagoSlice.actions;
