import { useDispatch, useSelector } from "react-redux";
import { listBookingByUser } from "../services/bookingService";
import {
  initialBookingsState,
  loadingBookings,
} from "../store/slices/booking/bookingSlice";
import { useAuth } from "./useAuth";

export const useBooking = () => {
  const dispatch = useDispatch();
  const { bookings, bookingSelected } = useSelector((state) => state.bookings);
  const { handlerLogout } = useAuth();

  const getListBookingsByUser = async () => {
    try {
      const res = await listBookingByUser();
      console.log(res);
      dispatch(loadingBookings(res.data));
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };
  return {
    getListBookingsByUser,
    initialBookingsState,
    bookings,
    bookingSelected,
  };
};
