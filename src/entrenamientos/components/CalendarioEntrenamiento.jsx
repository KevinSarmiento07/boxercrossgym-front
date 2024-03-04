/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Alert, Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useEntrenamiento } from "../../hooks/useEntrenamiento";
import { useNavigate, useParams } from "react-router-dom";
import { EntrenamientoForm } from "./EntrenamientoForm";
import { EntrenamientoView } from "./EntrenamientoView";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge key={props.day.toString()} overlap="circular" badgeContent={isSelected ? "🔥" : undefined}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: 10,
};
export const CalendarioEntrenamiento = () => {
  const { getDaysForDate, getEntrenamientosByDate, handleCleanBloques, initialEntrenamiento } = useEntrenamiento();
  const { entrenamientosByDay } = useSelector((state) => state.entrenamientos);
  entrenamientosByDay;
  const { login } = useAuth();
  const [entrenoOpen, setEntrenoOpen] = useState(false);
  const [entrenoFormOpen, setEntrenoFormOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(undefined);
  const [entrenoSelected, setEntrenoSelected] = useState(initialEntrenamiento);

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleOpen = () => {
    setOpen(true);
    setEntrenoFormOpen(false);
    setEntrenoOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = (date) => {
    const fechaFormat = dayjs(date).format("YYYY-MM-DD");
    getDaysForDate(fechaFormat).then((res) => {
      setHighlightedDays(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
  }, [open]);

  const handleMonthChange = (date) => {
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleOnChange = (value, props) => {
    const date = dayjs(value).format("YYYY-MM-DD");
    getEntrenamientosByDate(date).then((res) => {
      if (res.length == 0) {
        handleCleanBloques();
        setDateSelected(date);
        setEntrenoFormOpen(true);
      } else {
        setEntrenoOpen(true);
      }

      handleClose();
    });
  };

  return (
    <>
      {!open ? (
        <Grid display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Button size="large" onClick={handleOpen} variant="outlined" color="error">
            Buscar fecha
          </Button>
        </Grid>
      ) : (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  },
                }}
                onChange={(value, props) => handleOnChange(value, props)}
              />
            </LocalizationProvider>
          </Box>
        </Modal>
      )}
      {entrenoFormOpen ? <EntrenamientoForm dateSelected={dateSelected} setDateSelected={setDateSelected}></EntrenamientoForm> : ""}
      {!entrenoOpen || <EntrenamientoView></EntrenamientoView>}
    </>
  );
};
