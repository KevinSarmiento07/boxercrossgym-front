import { useDispatch, useSelector } from "react-redux";
import { deleteBookingById, getAvailableDays, getQuantityClientByClass, listBookingByUser, saveBooking } from "../services/bookingService";
import { addBooking, deleteBooking, initialBookingsState, loadingBookings } from "../store/slices/booking/bookingSlice";
import { useAuth } from "./useAuth";
import Swal from "sweetalert2";

export const useBooking = () => {
  const dispatch = useDispatch();
  const { bookings, bookingSelected } = useSelector((state) => state.bookings);
  const { handlerLogout } = useAuth();

  const getListBookingsByUser = async () => {
    try {
      const res = await listBookingByUser();
      res;
      dispatch(loadingBookings(res.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerDeleteBookingById = async (id) => {
    try {
      Swal.fire({
        title: "¿Estás seguro que deseas eliminar la reserva?",
        text: "No podrás revertir los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteBookingById(id);
          dispatch(deleteBooking(id));
          Swal.fire({
            title: "Eliminado!",
            text: "La reserva ha sido eliminada con éxito.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getAvailableDaysByUser = async () => {
    try {
      return await getAvailableDays();
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddBooking = async (booking) => {
    try {
      const res = await saveBooking(booking);
      dispatch(addBooking(res.data));
      Swal.fire("Reserva añadida con éxito", "La reserva se agregó correctamente", "success");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getQuantityClientPerClass = async (data) => {
    try {
      return await getQuantityClientByClass(data);
    } catch (error) {
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
    handlerDeleteBookingById,
    getAvailableDaysByUser,
    handlerAddBooking,
    getQuantityClientPerClass,
  };
};
