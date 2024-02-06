import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewBudget } from "../components/dashboard/OverviewBudget";
import { OverviewTotalCustomers } from "../components/dashboard/OverviewTotalCustomers";
import { OverviewUsersActive } from "../components/dashboard/OverviewUsersActive";
import { OverviewUsersInactive } from "../components/dashboard/OverviewUsersInactive";
import { OverviewSales } from "../components/dashboard/OverviewSales";
import { OverviewTraffic } from "../components/dashboard/OverviewTraffic";
import { OverviewLatestProducts } from "../components/dashboard/OverviewLatestProducts";
import { OverviewLatestOrders } from "../components/dashboard/OverviewLatestOrders";
import { usePagos } from "../hooks/usePagos";
import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
const now = new Date();

const initialPropsViewBudget = {
  difference: 0,
  positive: false,
  value: "",
};

export const DashboardPage = () => {
  const { getOverviewBudget, getOverviewTotalCustomers } = usePagos();
  const { getTotalUsersViewActive, getTotalUsersViewInactive } = useUsers();

  const [propsViewBudget, setPropsViewBudget] = useState(
    initialPropsViewBudget
  );

  const [propsViewTotalCustomers, setPropsViewTotalCustomers] = useState("");

  const [propsViewUsersActive, setPropsViewUsersActive] = useState(0);

  const [propsViewUsersInactive, setPropsViewUsersInactive] = useState(0);
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
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: "f69f88012978187a6c12897f",
                    ref: "DEV1049",
                    amount: 30.5,
                    customer: {
                      name: "Ekaterina Tankova",
                    },
                    createdAt: 1555016400000,
                    status: "pending",
                  },
                  {
                    id: "9eaa1c7dd4433f413c308ce2",
                    ref: "DEV1048",
                    amount: 25.1,
                    customer: {
                      name: "Cao Yu",
                    },
                    createdAt: 1555016400000,
                    status: "delivered",
                  },
                  {
                    id: "01a5230c811bd04996ce7c13",
                    ref: "DEV1047",
                    amount: 10.99,
                    customer: {
                      name: "Alexa Richardson",
                    },
                    createdAt: 1554930000000,
                    status: "refunded",
                  },
                  {
                    id: "1f4e1bd0a87cea23cdb83d18",
                    ref: "DEV1046",
                    amount: 96.43,
                    customer: {
                      name: "Anje Keizer",
                    },
                    createdAt: 1554757200000,
                    status: "pending",
                  },
                  {
                    id: "9f974f239d29ede969367103",
                    ref: "DEV1045",
                    amount: 32.54,
                    customer: {
                      name: "Clarke Gillebert",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                  {
                    id: "ffc83c1560ec2f66a1c05596",
                    ref: "DEV1044",
                    amount: 16.76,
                    customer: {
                      name: "Adam Denisov",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
