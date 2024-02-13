import { createSlice } from "@reduxjs/toolkit";
export const initialBookingsState = {
  id: 0,
  fecha: "",
  clase: {
    id: 0,
    horario: "",
    enabled: true,
    dias: "",
  },
};
export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    bookingSelected: initialBookingsState,
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings = [
        ...state.bookings,
        {
          ...action.payload,
        },
      ];
      state.bookingSelected = initialBookingsState;
    },
    loadingBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { addBooking, loadingBookings } = bookingSlice.actions;
