import { Alert, Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

/* eslint-disable react/prop-types */
export const OverviewTrainingDay = (props) => {
  const { training = [], sx } = props;
  const fecha = dayjs(training[0]?.fechaEntreno).format("dddd, D [de] MMMM YYYY");
  console.log(fecha);
  console.log(training[0]);
  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <Card
        sx={{
          sx,
        }}
        raised
        elevation={24}
      >
        <CardHeader title="Entrenamiento del dia" sx={{ fontWeight: "bold", fontFamily: "" }} />
        {training.length > 0 ? (
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom textAlign={"center"}>
              BoxerCrossGym
            </Typography>
            <Divider />
            <Typography variant="h3" component="div" textAlign={"center"} fontWeight={"bold"}>
              {training[0].titulo}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="black" fontWeight={"bold"} textAlign={"center"} variant="h5">
              {fecha}
            </Typography>
            <Divider />
            <Box component={"div"} marginTop={5} justifyContent={"center"}>
              <Grid container>
                {training[0]?.bloques?.length > 0 ? (
                  training[0]?.bloques?.map((bloque, index) => {
                    return (
                      <Grid item xs={12} marginBottom={2} key={index}>
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
              </Grid>
            </Box>
          </CardContent>
        ) : (
          <Alert variant="filled" severity="error" sx={{ justifyContent: "center", margin: 1 }}>
            No hay entrenamientos agendados para hoy.
          </Alert>
        )}
      </Card>
    </div>
  );
};
