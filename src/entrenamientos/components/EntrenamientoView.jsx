/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import "dayjs/locale/es";

export const EntrenamientoView = ({ entrenoArray = [] }) => {
  console.log(entrenoArray);

  return (
    <>
      {entrenoArray.map((item, index) => {
        dayjs.locale("es");
        const dateIng = item.fechaEntreno;
        const fecha = dayjs(dateIng).format("dddd, D [de] MMMM YYYY");
        console.log(fecha);
        return (
          <Card
            key={index}
            sx={{ minWidth: 275, marginTop: 5, backgroundColor: "#F2F2F2" }}
            raised
            elevation={24}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                textAlign={"center"}
              >
                BoxerCrossGym
              </Typography>
              <Typography
                variant="h3"
                component="div"
                textAlign={"center"}
                fontWeight={"bold"}
              >
                {item.titulo}
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="black"
                fontWeight={"bold"}
                textAlign={"center"}
                variant="h5"
              >
                {fecha}
              </Typography>
              <Box component={"div"} marginTop={5} justifyContent={"center"}>
                <Grid container>
                  {item.bloques.length > 0 ? (
                    item.bloques.map((bloque, indexB) => {
                      return (
                        <Grid item xs={12} marginBottom={2} key={indexB}>
                          <Typography
                            variant="h6"
                            textAlign={"center"}
                            fontWeight={"600"}
                          >
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
                      <Alert
                        variant="filled"
                        severity="warning"
                        sx={{ justifyContent: "center" }}
                      >
                        No hay bloques en este entrenamiento
                      </Alert>
                    </Grid>
                  )}
                  {}
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Button>
                <EditIcon size="small" sx={{ color: "black" }}></EditIcon>
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};
