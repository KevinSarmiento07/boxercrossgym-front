import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEntrenamiento } from "../../hooks/useEntrenamiento";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
/* eslint-disable react/prop-types */

export const EntrenamientoForm = ({ dateSelected, entrenamientoSeleccionado }) => {
  const { isAdmin, isEntrenador } = useSelector((state) => state.auth);
  const initialEntreno = {
    id: 0,
    fechaEntreno: "",
    titulo: "",
  };
  const { handleLoadBloque, initialEntrenamientoForm, handleSaveEntrenamiento, handleDeleteBloqueById } = useEntrenamiento();

  const [entrenamiento, setEntrenamiento] = useState(initialEntreno);
  entrenamiento;
  const { bloques } = useSelector((state) => state.entrenamientos);

  const [entrenamientoForm, setEntrenamientoForm] = useState(initialEntrenamientoForm);
  const { fechaEntreno, titulo, nombre, descripcion, id } = entrenamientoForm;
  useEffect(() => {
    setEntrenamientoForm({
      ...entrenamientoForm,
      fechaEntreno: dateSelected,
    });
  }, [dateSelected]);

  useEffect(() => {
    if (entrenamientoSeleccionado) {
      setEntrenamientoForm({
        ...entrenamientoForm,
        id: entrenamientoSeleccionado.id,
        fechaEntreno: entrenamientoSeleccionado.fechaEntreno,
        titulo: entrenamientoSeleccionado.titulo,
      });
      setEntrenamiento({
        ...entrenamiento,
        id: entrenamientoSeleccionado.id,
      });
      entrenamientoSeleccionado.bloques?.map((bloque) => handleLoadBloque(bloque));
    }
  }, [entrenamientoSeleccionado]);

  useEffect(() => {
    setEntrenamiento({
      ...entrenamiento,
      fechaEntreno,
      titulo,
      id,
    });
  }, [fechaEntreno, titulo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (bloques.length === 0) {
      Swal.fire("Error", "Debe haber al menos un bloque en el entrenamiento.", "error");
      return;
    }
    handleSaveEntrenamiento({ entrenamiento, bloques });
    setEntrenamiento(initialEntreno);
    //setDateSelected(undefined);
    setEntrenamientoForm(initialEntrenamientoForm);
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setEntrenamientoForm({ ...entrenamientoForm, [name]: value });
  };

  const onClickAddBloque = (e, nombre, descripcion) => {
    if (!nombre || !descripcion) {
      Swal.fire("Error", "Los campos nombre y descripcion deben tener conntenido", "error");
      return; // Sale de la función si algún campo está vacío
    }
    setEntrenamientoForm({
      ...entrenamientoForm,
      nombre: "",
      descripcion: "",
    });
    handleLoadBloque({ nombre, descripcion });
  };

  const onDateChange = (value, context, name) => {
    const fecha = dayjs(value).format("YYYY-MM-DD");
    setEntrenamientoForm({
      ...entrenamientoForm,
      [name]: fecha,
    });
  };

  const onClickEditBloque = (index, nombre, descripcion) => {
    handleDeleteBloqueById(index);
    setEntrenamientoForm({
      ...entrenamientoForm,
      nombre,
      descripcion,
    });
  };

  const onClickDeleteBloque = (index) => {
    handleDeleteBloqueById(index);
  };

  return (
    <>
      {isAdmin || isEntrenador ? (
        <Container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="form" onSubmit={onSubmit}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={2}>
                <Grid item xs={12} sm={6} marginTop={0}>
                  <Grid item xs={10} marginBottom={3}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Fecha del entrenamiento"
                      fullWidth
                      name="fechaEntreno"
                      value={fechaEntreno == null ? null : dayjs(fechaEntreno)}
                      onChange={(value, context) => onDateChange(value, context, "fechaEntreno")}
                      format="YYYY-MM-DD"
                      required
                    />
                  </Grid>
                  <Grid item xs={10} marginBottom={5}>
                    <TextField fullWidth variant="outlined" label="Titulo" type="titulo" name="titulo" value={titulo} onChange={onInputChange} required />
                  </Grid>

                  <Grid item xs={10} marginBottom={3}>
                    <Typography textAlign={"center"} variant="h6">
                      BLOQUES
                    </Typography>
                    <TextField fullWidth variant="outlined" label="Nombre" type="Nombre" name="nombre" value={nombre} onChange={onInputChange} />
                  </Grid>
                  <Grid item xs={10} marginBottom={3}>
                    <TextField fullWidth multiline rows={5} variant="outlined" label="Descripcion" type="Descripcion" name="descripcion" value={descripcion} onChange={onInputChange} />
                  </Grid>
                  <Grid item xs={10} textAlign={"center"}>
                    <Button variant={"contained"} color="error" onClick={(e) => onClickAddBloque(e, nombre, descripcion)}>
                      Añadir Bloque
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} rowSpacing={4} marginTop={0}>
                  {bloques.length > 0 ? (
                    bloques.map((bloque, index) => {
                      return (
                        <Grid item xs={10} textAlign={"center"} marginBottom={3} key={index}>
                          <Card
                            sx={{
                              backgroundColor: "#F2F2F2",
                            }}
                            raised
                            elevation={12}
                          >
                            <CardHeader
                              title={bloque.nombre}
                              action={
                                <IconButton aria-label="settings">
                                  <MoreVertIcon />
                                </IconButton>
                              }
                            />
                            <Divider />
                            <CardContent>
                              <Typography component={"pre"}>{bloque.descripcion}</Typography>
                            </CardContent>
                            <Divider />
                            <CardActions disableSpacing>
                              <IconButton aria-label="add to favorites" onClick={() => onClickEditBloque(index, bloque.nombre, bloque.descripcion)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => onClickDeleteBloque(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })
                  ) : (
                    <Alert variant="filled" severity="error" sx={{ marginBottom: 5 }}>
                      No hay bloques en la lista
                    </Alert>
                  )}
                  <Grid item xs={10} textAlign={"center"}>
                    <Button variant={"outlined"} type="submit" color="error">
                      submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </LocalizationProvider>
        </Container>
      ) : (
        <Alert variant="filled" severity="error" sx={{ marginBottom: 5, marginTop: 5 }}>
          No hay entrenamientos para este día
        </Alert>
      )}
    </>
  );
};
