import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { pagoSlice } from "./slices/pagos/pagoSlice";
import { authSlice } from "./slices/auth/authSlice";
import { entrenamientoSlice } from "./slices/entrenamiento/entrenamentoSlice";
import { clasesSlice } from "./slices/clases/clasesSlice";
import { bookingSlice } from "./slices/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    pagos: pagoSlice.reducer,
    auth: authSlice.reducer,
    entrenamientos: entrenamientoSlice.reducer,
    clases: clasesSlice.reducer,
    bookings: bookingSlice.reducer,
  },
});
