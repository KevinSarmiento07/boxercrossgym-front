/* eslint-disable react/prop-types */
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useClases } from "../../hooks/useClases";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
  const [claseForm, setClaseForm] = useState(initialClaseForm);
  const { horario, dias } = claseForm;

  useEffect(() => {
    setClaseForm({
      ...claseSelected,
    });
  }, [claseSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setClaseForm({ ...claseForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handlerAddClase(claseForm);
    setClaseForm(initialClaseForm);
  };

  const [dayName, setDayName] = useState([]);

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

  return (
    <>
      <Container>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth id="outlined-basic" label="Horario" variant="outlined" name="horario" value={horario} onChange={onInputChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth id="outlined-basic" label="Dias" variant="outlined" name="dias" value={dias} onChange={onInputChange} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">Dias</InputLabel>
                  <Select
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
            <Grid item xs={12} md={6}>
              <TextField fullWidth id="outlined-basic" label="Dias" variant="outlined" name="dias" value={dias} onChange={onInputChange} required />
            </Grid>
          </Grid>
          <Grid marginTop={2} textAlign={"center"}>
            <Button variant="outlined" type="submit" color="error" size="large" sx={{ textTransform: "none" }}>
              Guardar
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
