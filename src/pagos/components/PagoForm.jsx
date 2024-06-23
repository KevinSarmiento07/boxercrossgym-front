/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import { useUsers } from "../../hooks/useUsers";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { usePagos } from "../../hooks/usePagos";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Download } from "@mui/icons-material";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export const PagoForm = ({ pagoSelected }) => {
  const { users, getUsers } = useUsers();
  const { initialPayForm, getPlanes, handlerAddPago, handlerUploadPaymentPhoto } = usePagos();
  const [fotoSelected, setFotoSelected] = useState({});
  const [payForm, setPayForm] = useState(initialPayForm);
  const [planes, setPlanes] = useState([{ id: 0 }]);
  const [seletedUser, setSelectedUser] = useState(null);

  const { id, fechaPago, plan, tipoPago, valorPagado, fechaVencimiento } = payForm;

  useEffect(() => {
    getUsers();
    getPlanes().then(async (res) => {
      setPlanes(res.data);
    });
  }, []);

  useEffect(() => {
    if (pagoSelected.id === 0) {
      setPayForm({
        ...payForm,
        valorPagado: plan.valor,
      });
    }
  }, [plan]);

  useEffect(() => {
    setPayForm({
      ...pagoSelected,
    });
  }, [pagoSelected]);

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

  const selectedPhoto = (e) => {
    const { target } = e;
    const selectedFile = target.files[0];

    if (!selectedFile) {
      return;
    }
    if (selectedFile.type.indexOf("image") < 0) {
      Swal.fire("Error upload: ", "Debe seleccionar una foto", "error");
      return;
    }
    setFotoSelected(selectedFile);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (payForm.fechaPago == null) {
      Swal.fire("Error", "La fecha de pago no puede estar vacia.", "error");
      return;
    }
    handlerAddPago(payForm, fotoSelected);
    setPayForm(initialPayForm);
    setSelectedUser(null);
    setFotoSelected({});
  };
  return (
    <>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component={"form"} onSubmit={onSubmit} alignItems={"center"}>
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {payForm.id > 0 ? (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Usuario"
                    defaultValue={`${payForm.usuario.nombre} ${payForm.usuario.apellido}`}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              ) : (
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
              )}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="plan">Plan a escoger</InputLabel>
                  <Select
                    required
                    labelId="plan"
                    id="plan-select"
                    label="Plan a escoger"
                    value={plan.id > 0 ? plan.id : ""}
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
                <FormControl fullWidth required>
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
                  sx={{ width: "100%" }}
                  label="Fecha de pago"
                  selectedSections={"day" | "month" | "year"}
                  name="fechaPago"
                  value={fechaPago == null ? null : dayjs(fechaPago)}
                  onChange={(value, context) => onDateChange(value, context, "fechaPago")}
                  format="YYYY-MM-DD"
                />
              </Grid>
              {payForm.id <= 0 || (
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    required
                    sx={{ width: "100%" }}
                    label="Fecha de vencimiento"
                    selectedSections={"day" | "month" | "year"}
                    name="fechaVencimiento"
                    value={fechaVencimiento == null ? null : dayjs(fechaVencimiento)}
                    onChange={(value, context) => onDateChange(value, context, "fechaVencimiento")}
                    format="YYYY-MM-DD"
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="tipo-pago">Tipo de pago</InputLabel>
                  <Select labelId="tipo-pago" id="tipo-pago-select" label="Tipo de pago" name="tipoPago" value={tipoPago} onChange={onInputChange} required>
                    <MenuItem value="">Selecciona una opción</MenuItem>
                    <MenuItem value={"NEQUI"}>Nequi</MenuItem>
                    <MenuItem value={"EFECTIVO"}>Efectivo</MenuItem>
                    <MenuItem value={"DAVIVIENDA"}>Davivienda</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={payForm.id > 0}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                color="error"
                size="small"
                sx={{ marginY: 3 }}
                onChange={selectedPhoto}
                startIcon={<CloudUploadIcon />}
              >
                Cargar comprobante pago
                <VisuallyHiddenInput type="file" />
              </Button>
              <Typography>{fotoSelected.name}</Typography>
              {!payForm.id > 0 || (
                <Button color="error" variant="outlined">
                  <a href={`${import.meta.env.VITE_API_BASE_URL}/pago/uploads/img/${payForm.fotoEvidencia}`} download>
                    Descargar Compronte
                  </a>
                </Button>
              )}
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
