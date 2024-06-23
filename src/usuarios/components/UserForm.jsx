/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

export const UserForm = ({ userSelected }) => {
  const { initialUserForm, handlerAddUser, errors } = useUsers();
  const [userForm, setUserForm] = useState(initialUserForm);
  const { login } = useAuth();
  const { nombre, apellido, email, telefono, password, fechaNacimiento, fechaInscripcion, cedula, sexo, antecedente, admin, entrenador, id } = userForm;
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
    if (name === "fechaNacimiento") {
      if (value !== null) {
        const selectedDate = value;
        const today = dayjs();

        const eightYearsAgo = today.subtract(8, "year");

        if (selectedDate.isAfter(eightYearsAgo)) {
          Swal.fire("Error", "La fecha de nacimiento debe ser al menos 8 años antes de la fecha actual.", "error");
          return;
        }
      }
    }
    const fecha = dayjs(value).format("YYYY-MM-DD");
    setUserForm({
      ...userForm,
      [name]: fecha,
    });
  };

  const onRoleChange = ({ target }) => {
    const { name, checked } = target;
    setUserForm({ ...userForm, [name]: checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (fechaInscripcion == null || fechaInscripcion == undefined) {
      Swal.fire("Error", "La fecha de nacimiento no puede estar vacia.", "error");
      return;
    }

    if (id <= 0) {
      const fecha = dayjs().format("YYYY-MM-DD");
      setUserForm({
        ...userForm,
        fechaInscripcion: fecha,
      });
    }

    handlerAddUser(userForm);
    //setUserForm(initialUserForm);
  };
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={onSubmit}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="nombre"
                label="Nombre"
                variant="outlined"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                required
                error={errors?.nombre != undefined && errors?.nombre?.length > 0}
                helperText={errors?.nombre && errors.nombre.length > 0 ? errors?.nombre : "Obligatorio"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="apellido"
                label="Apellido"
                variant="outlined"
                helperText={errors.apellido && errors.apellido.length > 0 ? errors.apellido : "Obligatorio"}
                name="apellido"
                value={apellido}
                onChange={onInputChange}
                required
                error={errors.apellido != undefined && errors.apellido.length > 0}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                helperText={errors?.email && errors?.email?.length > 0 ? errors?.email : "Obligatorio"}
                name="email"
                value={email}
                onChange={onInputChange}
                disabled={login.isAdmin ? false : true}
                required
                error={errors?.email != undefined && errors?.email?.length > 0}
              />
            </Grid>
            {userForm.id > 0 ? (
              ""
            ) : (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  error={errors?.password != undefined && errors?.password.length > 0}
                  helperText={errors.password && errors.password.length > 0 ? errors.password : ""}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <DatePicker
                sx={{ width: "100%" }}
                disableFuture={true}
                label="Fecha de nacimiento"
                fullWidth
                name="fechaNacimiento"
                value={fechaNacimiento == null ? null : dayjs(fechaNacimiento)}
                onChange={(value, context) => onDateChange(value, context, "fechaNacimiento")}
                format="YYYY-MM-DD"
              />
            </Grid>
            {id > 0 ? (
              <Grid item xs={12} md={6}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Fecha de Inscripción"
                  defaultValue={dayjs(new Date())}
                  selectedSections={"day" | "month" | "year"}
                  name="fechaInscripcion"
                  value={fechaInscripcion == null ? null : dayjs(fechaInscripcion)}
                  onChange={(value, context) => onDateChange(value, context, "fechaInscripcion")}
                  format="YYYY-MM-DD"
                  disabled={userForm.id > 0 ? true : false}
                  InputProps={{
                    readOnly: userForm.id > 0 ? true : false,
                  }}
                />
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={errors?.sexo != undefined && errors?.sexo.length > 0}>
                <InputLabel error={errors?.sexo != undefined && errors?.sexo.length > 0} id="sexo">
                  Sexo
                </InputLabel>
                <Select labelId="sexo" id="sexo-select" label="Sexo" name="sexo" value={sexo} onChange={onInputChange}>
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Femenino</MenuItem>
                </Select>
                <FormHelperText>{errors?.sexo}</FormHelperText>
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
                error={errors?.telefono != undefined && errors?.telefono.length > 0}
                helperText={errors?.telefono && errors?.telefono.length > 0 ? errors?.telefono : "Obligatorio"}
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
                disabled={login.isAdmin ? false : true}
                InputProps={{
                  readOnly: userForm.id > 0 ? true : false,
                }}
                error={errors?.cedula != undefined && errors?.cedula.length > 0}
                helperText={errors?.cedula && errors?.cedula.length > 0 ? errors?.cedula : "Obligatorio"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth variant="outlined" label="Información personal adicional" type="text" name="antecedente" value={antecedente} onChange={onInputChange} multiline />
            </Grid>
            {!login.isAdmin || (
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox name="admin" checked={admin} onChange={onRoleChange} />} label="Admin" />
                  <FormControlLabel control={<Checkbox name="entrenador" checked={entrenador} onChange={onRoleChange} />} label="Entrenador" />
                </FormGroup>
              </Grid>
            )}
          </Grid>

          <Grid marginTop={2} textAlign={"center"}>
            <Button variant="outlined" type="submit" color="error" size="large" sx={{ textTransform: "none" }}>
              Guardar
            </Button>
          </Grid>
        </Box>
      </LocalizationProvider>
    </Container>
  );
};
