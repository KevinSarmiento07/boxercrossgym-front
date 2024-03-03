import { Box, Container, Grid } from "@mui/material";
import { OverviewDaysToExpire } from "../components/OverviewDaysToExpire";
import { OverviewDateExpire } from "../components/OverviewDateExpire";
import { OverviewTrainingDay } from "../components/OverviewTrainingDay";
import { OverviewListPayment } from "../components/OverviewListPayment";

export const DashboardUserPage = () => {
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
              <OverviewDaysToExpire value={0} sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <OverviewDateExpire date={"2024-03-03"} sx={{ height: "100%" }} progress={10} />
            </Grid>
            <Grid item xs={12} md={4}>
              <OverviewTrainingDay sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} md={8}>
              <OverviewListPayment sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
