/* eslint-disable no-unused-vars */
import { Box, Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import { useUsers } from "../../hooks/useUsers";
import { useEffect, useState } from "react";
import { usePagos } from "../../hooks/usePagos";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const PagoForm = () => {
  const { users, getUsers } = useUsers();
  const { initialPayForm, getPlanes, handlerAddPago } = usePagos();

  const [payForm, setPayForm] = useState(initialPayForm);
  const [planes, setPlanes] = useState([{ id: 0 }]);
  const [seletedUser, setSelectedUser] = useState(null);

  const { id, fechaPago, plan, tipoPago, valorPagado } = payForm;

  useEffect(() => {
    getUsers();
    getPlanes().then(async (res) => {
      setPlanes(res.data);
    });
  }, []);

  useEffect(() => {
    setPayForm({
      ...payForm,
      valorPagado: plan.valor,
    });
  }, [plan]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setPayForm({
      ...payForm,
      [name]: value,
    });
  };
  const onDateChange = (value, context, name) => {
    const fecha = dayjs(value).format("YYYY-MM-DD");
    setPayForm({
      ...payForm,
      [name]: fecha,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handlerAddPago(payForm);
    setPayForm(initialPayForm);
    setSelectedUser(null);
  };
  return (
    <>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component={"form"} onSubmit={onSubmit} alignItems={"center"}>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <Autocomplete
                  noOptionsText={"No existe ningun usuario con ese nombre"}
                  id="free-solo-2-demo"
                  getOptionLabel={(users) => `${users.nombre} ${users.apellido}`}
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }}
                  options={users}
                  renderOption={(props, users) => (
                    <Box component="li" {...props} key={users.id}>
                      {users.nombre} {users.apellido}
                    </Box>
                  )}
                  value={seletedUser}
                  onChange={(event, newValue) => {
                    setSelectedUser(newValue);
                    setPayForm(
                      newValue?.id != null
                        ? {
                            ...payForm,
                            usuario: { id: newValue.id },
                          }
                        : {
                            ...payForm,
                            usuario: { id: 0 },
                          }
                    );
                  }}
                  renderInput={(params) => <TextField {...params} label="Cliente" name="cliente" required />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="plan">Plan a escoger</InputLabel>
                  <Select
                    required
                    labelId="plan"
                    id="plan-select"
                    label="Plan a escoger"
                    value={plan.id}
                    name="plan"
                    onChange={({ target }) => {
                      const { name, value } = target;
                      const planEscogido = planes.find((p) => p.id === value);
                      setPayForm({
                        ...payForm,
                        [name]: {
                          ...payForm.plan,
                          id: planEscogido.id,
                          valor: planEscogido.valor,
                          nombre: planEscogido.nombre,
                        },
                      });
                    }}
                  >
                    <MenuItem value={0} key={0}>
                      Escoger una opción
                    </MenuItem>
                    {planes.map((p) => {
                      return (
                        <MenuItem value={p.id} key={p.id}>
                          {p.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">Valor a pagar</InputLabel>
                  <OutlinedInput
                    required
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    value={valorPagado}
                    label="Valor a pagar"
                    name="valorPagado"
                    type="number"
                    onChange={({ target }) => {
                      setPayForm({
                        ...payForm,
                        valorPagado: target.value,
                      });
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  required
                  sx={{ width: "100%" }}
                  label="Fecha de pago"
                  selectedSections={"day" | "month" | "year"}
                  name="fechaPago"
                  value={fechaPago == null ? null : dayjs(fechaPago)}
                  onChange={(value, context) => onDateChange(value, context, "fechaPago")}
                  format="YYYY-MM-DD"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="tipo-pago">Tipo de pago</InputLabel>
                  <Select labelId="tipo-pago" id="tipo-pago-select" label="Tipo de pago" name="tipoPago" value={tipoPago} onChange={onInputChange} required>
                    <MenuItem value="" hidden></MenuItem>
                    <MenuItem value={"NEQUI"}>Nequi</MenuItem>
                    <MenuItem value={"BANCOLOMBIA"}>Bancolombia</MenuItem>
                    <MenuItem value={"DAVIVIENDA"}>Davivienda</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid marginTop={2} textAlign={"center"}>
              <Button variant="outlined" type="submit" color="secondary" size="large" sx={{ textTransform: "none" }}>
                Guardar
              </Button>
            </Grid>
          </Box>
        </LocalizationProvider>
      </Container>
    </>
  );
};
