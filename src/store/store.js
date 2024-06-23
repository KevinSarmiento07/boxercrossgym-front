import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice";
import { pagoSlice } from "./slices/pagos/pagoSlice";
import { authSlice } from "./slices/auth/authSlice";
import { entrenamientoSlice } from "./slices/entrenamiento/entrenamentoSlice";
import { clasesSlice } from "./slices/clases/clasesSlice";
import { bookingSlice } from "./slices/booking/bookingSlice";
import { testSlice } from "./slices/test/testSlice";
import { usertestSlice } from "./slices/test/usertestSlice";
import { exercisesSlice } from "./slices/exercises/exerciseSlice";


export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    pagos: pagoSlice.reducer,
    auth: authSlice.reducer,
    entrenamientos: entrenamientoSlice.reducer,
    clases: clasesSlice.reducer,
    bookings: bookingSlice.reducer,
    tests: testSlice.reducer,
    usertests: usertestSlice.reducer,
    exercises: exercisesSlice.reducer,
  },
});
