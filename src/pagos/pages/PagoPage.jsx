import { Typography } from "@mui/material";
import { PagoList } from "../components/PagoList";
import { usePagos } from "../../hooks/usePagos";
import { useEffect } from "react";

export const PagoPage = () => {
  const { getPagos } = usePagos();
  useEffect(() => {
    getPagos();
  }, []);
  return (
    <>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Lista de pagos
      </Typography>
      <PagoList></PagoList>
    </>
  );
};
