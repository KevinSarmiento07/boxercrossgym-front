import { Box, Container, Grid } from "@mui/material";
import { OverviewDaysToExpire } from "../components/OverviewDaysToExpire";
import { OverviewDateExpire } from "../components/OverviewDateExpire";
import { OverviewTrainingDay } from "../components/OverviewTrainingDay";
import { OverviewListPayment } from "../components/OverviewListPayment";
import { useEffect, useState } from "react";
import { useEntrenamiento } from "../../hooks/useEntrenamiento";
import dayjs from "dayjs";
import { usePagos } from "../../hooks/usePagos";

export const DashboardUserPage = () => {
  const { getEntrenamientosByDate } = useEntrenamiento();
  const { getLastPaymentUserAuth } = usePagos();
  const [arrTraining, setArrTraining] = useState([]);
  const [arrPayments, setArrPayments] = useState([]);
  const [daysToFinish, setDaysToFinish] = useState(0);
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getEntrenamientosByDate(dayjs(new Date()).format("YYYY-MM-DD")).then((res) => {
      setArrTraining(res);
    });
    getLastPaymentUserAuth().then((res) => {
      setArrPayments(res.data);
      if (res.data.length > 0) {
        setProgress(getProgress(dayjs(res.data[0].fechaPago), dayjs(res.data[0].fechaVencimiento)));
      }
      setDate(res.data[0].fechaVencimiento);
    });
  }, []);

  const getProgress = (fechaPago = null, fechaVencimiento = null) => {
    if (fechaPago !== null && fechaVencimiento !== null) {
      const diasTotales = fechaVencimiento.diff(fechaPago, "day");
      const hoy = dayjs();
      const diasTranscurridos = hoy.diff(fechaPago, "day");
      setDaysToFinish(diasTotales - diasTranscurridos);
      return (diasTranscurridos / diasTotales) * 100;
    }
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <OverviewDaysToExpire value={daysToFinish} sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <OverviewDateExpire date={date} sx={{ height: "100%" }} progress={progress} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewTrainingDay sx={{ height: "100%" }} training={arrTraining} />
            </Grid>
            <Grid item xs={12} md={8}>
              <OverviewListPayment sx={{ height: "100%" }} data={arrPayments} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
