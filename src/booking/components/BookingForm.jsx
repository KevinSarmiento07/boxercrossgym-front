/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useBooking } from "../../hooks/useBooking";
import { useClases } from "../../hooks/useClases";
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import "dayjs/locale/es";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const initialBookingForm = {
  id: 0,
  fecha: "",
  clase: {
    id: "",
  },
};

export const BookingForm = () => {
  dayjs.locale("es");
  const { getAvailableDaysByUser, handlerAddBooking, getQuantityClientPerClass } = useBooking();
  const { getClassEnabled } = useClases();
  const [clases, setClases] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [bookingForm, setBookingForm] = useState(initialBookingForm);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    getAvailableDaysByUser().then((res) => {
      setAvailableDays(res.data);
    });
    getClassEnabled().then((res) => {
      setClases(res.data);
    });
  }, []);
  useEffect(() => {
    if (bookingForm.fecha != "" && bookingForm.clase.id > 0) {
      const data = {
        fecha: bookingForm.fecha,
        id: bookingForm.clase.id,
      };
      getQuantityClientPerClass(data).then((res) => {
        setQuantity(res.data);
      });
    }
  }, [bookingForm.fecha, bookingForm.clase.id]);

  const onChangeForm = ({ target }) => {
    const { name, value } = target;
    if (name === "clase") {
      ("entro");
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
    if (quantity == 16) {
      Swal.fire("Error", "La clase está llena, agenda en otro horario", "error");
      return;
    }
    const dateNow = dayjs();
    const { id } = bookingForm.clase;
    const { fecha } = bookingForm;
    const clase = clases.find((item) => item.id === id);
    console.log(clase);
    const horario = clase.horario;
    const dateTimeValid = dayjs(`${fecha} ${horario}`);

    if (dateNow.isAfter(dateTimeValid)) {
      Swal.fire("ERROR", "La fecha y hora seleccionada ya pasarón, seleccionada una clase disponible", "error");
      return;
    }

    handlerAddBooking(bookingForm);
    setBookingForm(initialBookingForm);
    setQuantity(0);
  };
  return (
    <>
      <Paper elevation={10}>
        <Box component="form" margin={3} onSubmit={onSubmit}>
          <Typography align="center" variant="h3" fontWeight={"bold"} marginBottom={5}>
            Agendar Clase
          </Typography>
          <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="fecha">Fecha</InputLabel>
                <Select label="Fecha" labelId="fecha" id="fechaForm" value={bookingForm.fecha} name="fecha" onChange={onChangeForm}>
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
              <FormControl fullWidth disabled={!bookingForm.fecha} error={!bookingForm.fecha}>
                <InputLabel id="clase">Clase</InputLabel>
                <Select label="Clase" labelId="clase" id="claseForm" name="clase" value={bookingForm.clase.id} onChange={onChangeForm}>
                  {clases.map((clase) => {
                    let dayNumber = dayjs(bookingForm.fecha);
                    dayNumber = (dayNumber + 6) % 7;
                    if (clase.diasSemana.includes(dayNumber)) {
                      return (
                        <MenuItem key={clase.id} value={clase.id}>
                          {`${clase.horario}, Entrenador: ${clase.usuario.nombre} ${clase.usuario.apellido}`}
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
                {bookingForm.fecha ? "" : <FormHelperText>Debe seleccionar una fecha primero</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center" alignSelf="center">
              <Typography variant="subtitle1">Cantidad de personas registradas: {quantity}/16</Typography>
            </Grid>
            <Grid item xs={12} justifyContent="center" textAlign="center" marginTop={2} marginBottom={2}>
              <Button variant="outlined" color="error" type="submit">
                Agendar Clase
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};
