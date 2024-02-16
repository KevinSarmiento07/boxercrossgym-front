/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useBooking } from "../../hooks/useBooking";
import { useClases } from "../../hooks/useClases";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "dayjs/locale/es";
import dayjs from "dayjs";

const initialBookingForm = {
  id: 0,
  fecha: "",
  clase: {
    id: "",
  },
};

export const BookingForm = () => {
  dayjs.locale("es");
  const { getAvailableDaysByUser, handlerAddBooking } = useBooking();
  const { clases, getClases } = useClases();
  const [availableDays, setAvailableDays] = useState([]);
  const [bookingForm, setBookingForm] = useState(initialBookingForm);
  console.log(bookingForm);
  console.log(availableDays);
  console.log(clases);
  useEffect(() => {
    getAvailableDaysByUser().then((res) => {
      setAvailableDays(res.data);
    });
    getClases();
  }, []);

  const onChangeForm = ({ target }) => {
    const { name, value } = target;
    console.log(name);
    console.log(value);
    if (name === "clase") {
      console.log("entro");
      setBookingForm({
        ...bookingForm,
        clase: {
          id: value,
        },
      });
    } else if (name === "fecha") {
      setBookingForm({
        ...bookingForm,
        fecha: value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handlerAddBooking(bookingForm);
    setBookingForm(initialBookingForm);
  };
  return (
    <>
      <Box component="form" marginY={3} onSubmit={onSubmit}>
        <Typography
          align="center"
          variant="h3"
          fontWeight={"bold"}
          marginBottom={5}
        >
          Agendar Clase
        </Typography>
        <Grid container columnSpacing={1} rowSpacing={1}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="fecha">Fecha</InputLabel>
              <Select
                label="Fecha"
                labelId="fecha"
                id="fechaForm"
                value={bookingForm.fecha}
                name="fecha"
                onChange={onChangeForm}
              >
                {availableDays.map((value, index) => {
                  return (
                    <MenuItem key={index} value={value}>
                      {dayjs(value).format("dddd, D [de] MMMM YYYY")}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="clase">Clase</InputLabel>
              <Select
                label="Clase"
                labelId="clase"
                id="claseForm"
                name="clase"
                value={bookingForm.clase.id}
                onChange={onChangeForm}
              >
                {clases.map((clase) => {
                  return (
                    <MenuItem key={clase.id} value={clase.id}>
                      {`${clase.horario} ${clase.dias}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center" alignSelf="center">
            <Typography variant="subtitle1">
              Cantidad de personas registradas: 0/16
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            justifyContent="center"
            textAlign="center"
            marginTop={2}
          >
            <Button variant="outlined" color="error" type="submit">
              Agendar Clase
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
