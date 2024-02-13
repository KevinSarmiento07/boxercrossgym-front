import { Alert, Divider, Grid } from "@mui/material";
import { BookingForm } from "../components/BookingForm";
import { BookingList } from "../components/BookingList";
import { useEffect } from "react";
import { useBooking } from "../../hooks/useBooking";

export const BookingPage = () => {
  const { bookings, getListBookingsByUser } = useBooking();

  useEffect(() => {
    getListBookingsByUser();
  }, []);
  return (
    <>
      <BookingForm />
      <Divider />
      {bookings.length === 0 ? (
        <Grid item xs={12} textAlign={"center"} marginTop={5}>
          <Alert
            variant="filled"
            severity="error"
            sx={{ justifyContent: "center" }}
          >
            No hay clases reservadas
          </Alert>
        </Grid>
      ) : (
        <>
          <BookingList />
        </>
      )}
    </>
  );
};
