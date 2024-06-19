import { Typography } from "@mui/material";
import { PlanForm } from "../components/planForm";
import { useParams } from "react-router-dom";
import { usePlan } from "../../hooks/usePlan";
import { useEffect, useState } from "react";

export const PlanRegisterPage = () => {
  const { initialPlanForm, plans } = usePlan();

  const [planSelected, setPlanSelected] = useState(initialPlanForm);

  const { id } = useParams();

  useEffect(() => {
    console.log(plans);
    const plan = plans.find((item) => {
      if (item.id == id) {
        return item;
      }
    });
    setPlanSelected(plan);
  }, [id]);

  return (
    <div>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Agregar Plan
      </Typography>
      <PlanForm planSelected={planSelected}></PlanForm>
    </div>
  );
};
