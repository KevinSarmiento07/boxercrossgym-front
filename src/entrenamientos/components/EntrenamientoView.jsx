/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Divider, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useEntrenamiento } from "../../hooks/useEntrenamiento";

export const EntrenamientoView = ({ handleOpen }) => {
  const { entrenamientosByDay } = useSelector((state) => state.entrenamientos);
  const { handlerDeleteEntrenamiento } = useEntrenamiento();
  const navigate = useNavigate();
  return (
    <>
      {entrenamientosByDay.map((item, index) => {
        dayjs.locale("es");
        const dateIng = item.fechaEntreno;
        const fecha = dayjs(dateIng).format("dddd, D [de] MMMM YYYY");
        return (
          <div key={index} style={{ textAlign: "-webkit-center" }}>
            <Card
              sx={{
                minWidth: 275,
                marginTop: 5,
                backgroundColor: "#F2F2F2",
                maxWidth: 800,
              }}
              raised
              elevation={24}
            >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom textAlign={"center"}>
                  BoxerCrossGym
                </Typography>
                <Divider />
                <Typography variant="h3" component="div" textAlign={"center"} fontWeight={"bold"}>
                  {item.titulo}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="black" fontWeight={"bold"} textAlign={"center"} variant="h5">
                  {fecha}
                </Typography>
                <Divider />
                <Box component={"div"} marginTop={5} justifyContent={"center"}>
                  <Grid container>
                    {item.bloques.length > 0 ? (
                      item.bloques.map((bloque, indexB) => {
                        return (
                          <Grid item xs={12} marginBottom={2} key={indexB}>
                            <Typography variant="h6" textAlign={"center"} fontWeight={"600"}>
                              {bloque.nombre}
                            </Typography>
                            <Typography component={"pre"} textAlign={"center"}>
                              {bloque.descripcion}
                            </Typography>
                          </Grid>
                        );
                      })
                    ) : (
                      <Grid item xs={12} textAlign={"center"}>
                        <Alert variant="filled" severity="error" sx={{ justifyContent: "center" }}>
                          No hay bloques en este entrenamiento
                        </Alert>
                      </Grid>
                    )}
                    {}
                  </Grid>
                </Box>
              </CardContent>
              <CardActions>
                <NavLink to={`/training/edit/${item.id}`}>
                  <Button>
                    <EditIcon size="small" sx={{ color: "black" }}></EditIcon>
                  </Button>
                </NavLink>
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "¿Estás seguro que desea eliminar el entrenamiento?",
                      text: "No podrá revertir los cambios",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Cancelar",
                      confirmButtonText: "Si, eliminar.",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handlerDeleteEntrenamiento(item.id).then(() => {
                          Swal.fire({
                            title: "Eliminado",
                            text: "Entrenamiento eliminado.",
                            icon: "success",
                          }).then(() => {
                            handleOpen();
                          });
                        });
                        //navigate("/training/register");
                      }
                    });
                  }}
                >
                  <DeleteIcon size="small" sx={{ color: "black" }}></DeleteIcon>
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </>
  );
};
