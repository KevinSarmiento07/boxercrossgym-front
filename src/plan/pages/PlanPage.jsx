import { Typography } from "@mui/material";
import { PlanList } from "../components/PlanList";
import { useEffect } from "react";
import { usePlan } from "../../hooks/usePlan";

export const PlanPage = () => {
  const { getPlans } = usePlan();
  useEffect(() => {
    getPlans();
  }, []);
  return (
    <div>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Planes
      </Typography>
      <PlanList></PlanList>
    </div>
  );
};
