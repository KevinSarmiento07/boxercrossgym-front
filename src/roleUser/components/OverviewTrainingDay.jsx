import { Alert, Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
export const OverviewTrainingDay = (props) => {
  const { training, sx } = props;

  console.log(training);
  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <Card
        sx={{
          sx,
        }}
        raised
        elevation={24}
      >
        <CardHeader title="Entrenamiento del dia" />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom textAlign={"center"}>
            BoxerCrossGym
          </Typography>
          <Divider />
          <Typography variant="h3" component="div" textAlign={"center"} fontWeight={"bold"}>
            {"test"}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="black" fontWeight={"bold"} textAlign={"center"} variant="h5">
            {"test"}
          </Typography>
          <Divider />
          <Box component={"div"} marginTop={5} justifyContent={"center"}>
            <Grid container>
              <Grid item xs={12} marginBottom={2}>
                <Typography variant="h6" textAlign={"center"} fontWeight={"600"}>
                  {"test"}
                </Typography>
                <Typography component={"pre"} textAlign={"center"}>
                  {"test"}
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <Alert variant="filled" severity="error" sx={{ justifyContent: "center" }}>
                  No hay bloques en este entrenamiento
                </Alert>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
