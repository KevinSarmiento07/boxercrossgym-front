/* eslint-disable react/prop-types */
import { Avatar, Box, Card, CardContent, LinearProgress, Stack, SvgIcon, Typography } from "@mui/material";
import CalendarDaysIcon from "@heroicons/react/24/solid/CalendarDaysIcon";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export const OverviewDateExpire = (props) => {
  const { sx, date, progress } = props;

  return (
    <Card sx={sx} elevation={4}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" fontWeight="bold">
              Fecha de vencimiento del plan
            </Typography>
            <Typography variant="h4" fontFamily={"monospace"}>
              {date}
            </Typography>
            <LinearProgressWithLabel value={progress} color="error" variant="determinate" />
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "secondary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CalendarDaysIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
