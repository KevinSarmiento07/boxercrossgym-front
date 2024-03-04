import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
export const OverviewDaysToExpire = (props) => {
  const { value, sx } = props;
  return (
    <Card sx={sx} elevation={4}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" fontWeight="bold">
              DIAS RESTANTES PARA VENCER
            </Typography>
            <Typography variant="h4" fontFamily={"monospace"}>
              Te faltan {value} dias para que renueves tu plan.
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
