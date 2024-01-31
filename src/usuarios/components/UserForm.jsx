/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";

export const UserForm = ({ userSelected }) => {
  const { initialUserForm, handlerAddUser } = useUsers();
  const [userForm, setUserForm] = useState(initialUserForm);
  const {
    nombre,
    apellido,
    email,
    telefono,
    password,
    fechaNacimiento,
    fechaInscripcion,
    cedula,
    sexo,
    antecedente,
  } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({ ...userForm, [name]: value });
  };

  const onDateChange = (value, context, name) => {
    const fecha = dayjs(value).format("YYYY-MM-DD");
    setUserForm({
      ...userForm,
      [name]: fecha,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userForm);
    handlerAddUser(userForm);
    setUserForm(initialUserForm);
  };
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={onSubmit}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={2}
          >
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                helperText={"Obligatorio"}
                name="apellido"
                value={apellido}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                helperText={"Obligatorio"}
                name="email"
                value={email}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                sx={{ width: "100%" }}
                disableFuture={true}
                label="Fecha de nacimiento"
                fullWidth
                name="fechaNacimiento"
                value={fechaNacimiento == null ? null : dayjs(fechaNacimiento)}
                onChange={(value, context) =>
                  onDateChange(value, context, "fechaNacimiento")
                }
                format="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Fecha de Inscripción"
                defaultValue={dayjs(new Date())}
                selectedSections={"day" | "month" | "year"}
                name="fechaInscripcion"
                value={
                  fechaInscripcion == null ? null : dayjs(fechaInscripcion)
                }
                onChange={(value, context) =>
                  onDateChange(value, context, "fechaInscripcion")
                }
                format="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="sexo">Sexo</InputLabel>
                <Select
                  labelId="sexo"
                  id="sexo-select"
                  label="Sexo"
                  name="sexo"
                  value={sexo}
                  onChange={onInputChange}
                >
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Teléfono"
                type="text"
                name="telefono"
                value={telefono}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Numero de documento"
                type="text"
                name="cedula"
                value={cedula}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Información personal adicional"
                type="text"
                name="antecedente"
                value={antecedente}
                onChange={onInputChange}
                multiline
              />
            </Grid>
          </Grid>

          <Grid marginTop={2} textAlign={"center"}>
            <Button
              variant="outlined"
              type="submit"
              color="secondary"
              size="large"
              sx={{ textTransform: "none" }}
            >
              Guardar
            </Button>
          </Grid>
        </Box>
      </LocalizationProvider>
    </Container>
  );
};
