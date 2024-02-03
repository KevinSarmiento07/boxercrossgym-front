import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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
/* eslint-disable react/prop-types */

export const EntrenamientoForm = ({ dateSelected, setDateSelected }) => {
  const initialEntreno = {
    id: 0,
    fechaEntreno: "",
    titulo: "",
  };
  const {
    initialEntrenamiento,
    handleLoadBloque,
    initialEntrenamientoForm,
    handleSaveEntrenamiento,
  } = useEntrenamiento();

  const [entrenamiento, setEntrenamiento] = useState(initialEntreno);
  const { bloques } = useSelector((state) => state.entrenamientos);
  const [entrenamientoForm, setEntrenamientoForm] = useState(
    initialEntrenamientoForm
  );
  const { fechaEntreno, titulo, nombre, descripcion } = entrenamientoForm;
  useEffect(() => {
    setEntrenamientoForm({
      ...entrenamientoForm,
      fechaEntreno: dateSelected,
    });
  }, [dateSelected]);

  useEffect(() => {
    setEntrenamiento({
      fechaEntreno,
      titulo,
    });
  }, [fechaEntreno, titulo]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("entro al submit");
    console.log(entrenamiento);
    console.log(bloques);
    handleSaveEntrenamiento({ entrenamiento, bloques });
    setEntrenamiento(initialEntreno);
    setDateSelected(undefined);
    setEntrenamientoForm(initialEntrenamientoForm);
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setEntrenamientoForm({ ...entrenamientoForm, [name]: value });
  };

  const onClickAddBloque = (e, nombre, descripcion) => {
    if (!nombre || !descripcion) {
      Swal.fire(
        "Error",
        "Los campos nombre y descripcion deben tener conntenido",
        "error"
      );
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
  return (
    <>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component="form" onSubmit={onSubmit}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              marginTop={2}
            >
              <Grid item xs={12} sm={6} marginTop={0}>
                <Grid item xs={10} marginBottom={3}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Fecha del entrenamiento"
                    fullWidth
                    name="fechaEntreno"
                    value={fechaEntreno == null ? null : dayjs(fechaEntreno)}
                    onChange={(value, context) =>
                      onDateChange(value, context, "fechaEntreno")
                    }
                    format="YYYY-MM-DD"
                    required
                  />
                </Grid>
                <Grid item xs={10} marginBottom={5}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Titulo"
                    type="titulo"
                    name="titulo"
                    value={titulo}
                    onChange={onInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={10} marginBottom={3}>
                  <Typography textAlign={"center"} variant="h6">
                    BLOQUES
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Nombre"
                    type="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={10} marginBottom={3}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    label="Descripcion"
                    type="Descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={10} textAlign={"center"}>
                  <Button
                    variant={"outlined"}
                    onClick={(e) => onClickAddBloque(e, nombre, descripcion)}
                  >
                    Añadir Bloque
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} rowSpacing={4} marginTop={0}>
                {bloques.length > 0 ? (
                  bloques.map((bloque, index) => {
                    return (
                      <Grid
                        item
                        xs={10}
                        textAlign={"center"}
                        marginBottom={3}
                        key={index}
                      >
                        <Card>
                          <CardHeader
                            title={bloque.nombre}
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                          />
                          <CardContent>
                            <Typography component={"pre"}>
                              {bloque.descripcion}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                              <EditIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })
                ) : (
                  <Alert
                    variant="filled"
                    severity="warning"
                    sx={{ marginBottom: 5 }}
                  >
                    No hay bloques en la lista
                  </Alert>
                )}
                <Grid item xs={10} textAlign={"center"}>
                  <Button variant={"outlined"} type="submit">
                    submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </Container>
    </>
  );
};
