import { Typography } from "@mui/material";
import { TestListResult } from "../components/TestListResult";

export const TestResultPage = () => {
  return (
    <>
      <Typography variant="h3" fontWeight="bold" textAlign="center">
        Mis Avances
      </Typography>
      <TestListResult />
    </>
  );
};
