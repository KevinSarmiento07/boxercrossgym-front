/* eslint-disable react/prop-types */
import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useClases } from "../../hooks/useClases";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useUsers } from "../../hooks/useUsers";
import Swal from "sweetalert2";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const mapDays = {
  LUNES: 0,
  MARTES: 1,
  MIERCOLES: 2,
  JUEVES: 3,
  VIERNES: 4,
  SABADO: 5,
  DOMINGO: 6,
};

const names = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
export const HorarioForm = ({ claseSelected }) => {
  const { initialClaseForm, handlerAddClase } = useClases();
  const { getUsersByRole } = useUsers();
  const [claseForm, setClaseForm] = useState(initialClaseForm);
  const [coaches, setCoaches] = useState([]);
  const [dayName, setDayName] = useState([]);
  const [coach, setCoach] = useState("");
  const [hour, setHour] = useState(null);

  const handleChangeCoach = (event) => {
    setCoach(event.target.value);
    setClaseForm({
      ...claseForm,
      usuario: event.target.value,
    });
  };
  useEffect(() => {
    getUsersByRole("ROLE_ENTRENADOR").then((res) => {
      if (res.data != undefined && res.data.length > 0) {
        setCoaches(res.data);
      }
    });
  }, []);
  useEffect(() => {
    setClaseForm({
      ...claseSelected,
    });
  }, [claseSelected]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (coach.id <= 0 || coach.id == undefined) {
      Swal.fire("Error", "Debe Seleccionar un entrenador", "error");
    } else {
      setClaseForm({
        ...claseForm,
        usuario: coach,
      });
    }

    setHour(null);
    handlerAddClase(claseForm);
    setClaseForm(initialClaseForm);
    setCoach("");
    setDayName([]);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const numbersDays = value.map((value) => mapDays[value]);
    setClaseForm({
      ...claseForm,
      diasSemana: numbersDays,
    });
    setDayName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onChangeHour = (e) => {
    setClaseForm({
      ...claseForm,
      horario: dayjs(e).format("HH:mm"),
    });
    setHour(e);
  };

  return (
    <>
      <Container>
        <Box component="form" onSubmit={onSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={2}>
              <Grid item xs={12}>
                <DateTimeField required fullWidth label="Escribe la hora en horas y minutos (24H)" value={hour} defaultValue={null} format="HH:mm" onChange={onChangeHour} />
              </Grid>

              <Grid item xs={12}>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Dias</InputLabel>
                    <Select
                      required
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={dayName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={dayName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Entrenador</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={coach} label="Entrenador" onChange={handleChangeCoach} required>
                    {coaches.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value}>
                          {`${value.nombre} ${value.apellido}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid marginTop={2} textAlign={"center"}>
              <Button variant="outlined" type="submit" color="error" size="large" sx={{ textTransform: "none" }}>
                Guardar
              </Button>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Container>
    </>
  );
};
