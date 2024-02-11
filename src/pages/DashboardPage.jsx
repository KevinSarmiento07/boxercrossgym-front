import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewBudget } from "../components/dashboard/OverviewBudget";
import { OverviewTotalCustomers } from "../components/dashboard/OverviewTotalCustomers";
import { OverviewUsersActive } from "../components/dashboard/OverviewUsersActive";
import { OverviewUsersInactive } from "../components/dashboard/OverviewUsersInactive";
import { OverviewSales } from "../components/dashboard/OverviewSales";
import { OverviewLNewUsers } from "../components/dashboard/OverviewLNewUsers";
import { OverviewNewPayments } from "../components/dashboard/OverviewNewPayments";
import { usePagos } from "../hooks/usePagos";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

const initialPropsViewBudget = {
  difference: 0,
  positive: false,
  value: "",
};

export const DashboardPage = () => {
  const {
    getOverviewBudget,
    getOverviewTotalCustomers,
    getOverviewSalesYearCurrent,
    getOverviewSalesYearBefore,
    getOverviewNewPayments,
  } = usePagos();
  const {
    getTotalUsersViewActive,
    getTotalUsersViewInactive,
    getViewNewUsers,
  } = useUsers();

  const [propsViewBudget, setPropsViewBudget] = useState(
    initialPropsViewBudget
  );

  const [propsViewTotalCustomers, setPropsViewTotalCustomers] = useState("");

  const [propsViewUsersActive, setPropsViewUsersActive] = useState(0);

  const [propsViewUsersInactive, setPropsViewUsersInactive] = useState(0);

  const [propsViewSales, setPropsViewSales] = useState([]);

  const [propsViewSalesBefore, setPropsViewSalesBefore] = useState([]);

  const [propsViewNewUsers, setPropsViewNewUsers] = useState([]);

  const [propsViewNewPayments, setPropsViewNewPayments] = useState([]);

  useEffect(() => {
    getOverviewBudget().then((res) => {
      setPropsViewBudget({ ...res });
    });
    getOverviewTotalCustomers().then((res) => {
      setPropsViewTotalCustomers(res);
    });
    getTotalUsersViewActive().then((res) => {
      setPropsViewUsersActive(res);
    });
    getTotalUsersViewInactive().then((res) => {
      setPropsViewUsersInactive(res);
    });

    getOverviewSalesYearCurrent().then((res) => {
      setPropsViewSales(res);
    });

    getOverviewSalesYearBefore().then((res) => {
      setPropsViewSalesBefore(res);
    });

    getViewNewUsers().then((res) => {
      setPropsViewNewUsers(res);
    });

    getOverviewNewPayments().then((res) => {
      setPropsViewNewPayments(res);
    });
  }, []);
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
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={propsViewBudget.porcentajeDiferencia}
                positive={
                  propsViewBudget.porcentajeDiferencia > 0 ? true : false
                }
                sx={{ height: "100%" }}
                value={`${propsViewBudget.totalActual}M`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                sx={{ height: "100%" }}
                value={`${propsViewTotalCustomers}M`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewUsersActive
                sx={{ height: "100%" }}
                value={propsViewUsersActive}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewUsersInactive
                sx={{ height: "100%" }}
                value={propsViewUsersInactive}
              />
            </Grid>
            <Grid xs={12}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: propsViewSales,
                  },
                  {
                    name: "Last year",
                    data: propsViewSalesBefore,
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <OverviewLNewUsers
                users={propsViewNewUsers}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewNewPayments
                sx={{ height: "100%" }}
                payments={propsViewNewPayments}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
