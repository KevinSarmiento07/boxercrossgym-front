import { Typography } from "@mui/material";
import { PagoList } from "../components/PagoList";
import { usePagos } from "../../hooks/usePagos";
import { useEffect } from "react";

export const PagoPage = () => {
  const { pagos, getPagos } = usePagos();
  useEffect(() => {
    getPagos();
  }, []);
  console.log(pagos);
  return (
    <>
      <Typography align="center" variant="h3">
        Lista de pagos
      </Typography>
      <PagoList></PagoList>
    </>
  );
};
