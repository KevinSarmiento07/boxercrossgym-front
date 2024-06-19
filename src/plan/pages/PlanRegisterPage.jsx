import { Typography } from "@mui/material";
import { PlanForm } from "../components/planForm";

export const PlanRegisterPage = () => {
  return (
    <div>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Agregar Plan
      </Typography>
      <PlanForm></PlanForm>
    </div>
  );
};
