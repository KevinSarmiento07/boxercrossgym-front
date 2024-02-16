import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "dayjs/locale/es";
import { useBooking } from "../../hooks/useBooking";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

export const BookingList = () => {
  dayjs.locale("es");
  const { bookings, handlerDeleteBookingById } = useBooking();
  console.log(bookings);
  return (
    <>
      <Box marginTop={5}>
        <Paper elevation={8}>
          <Typography
            align="center"
            variant="h3"
            fontWeight={"bold"}
            marginBottom={5}
          >
            Mis clases
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => {
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {dayjs(booking.fecha).format("dddd, D [de] MMMM YYYY")}
                    </TableCell>
                    <TableCell>{booking.clase.horario}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handlerDeleteBookingById(booking.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
};
