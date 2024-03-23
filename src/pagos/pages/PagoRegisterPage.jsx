import { Typography } from "@mui/material";
import { PagoForm } from "../components/PagoForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePagos } from "../../hooks/usePagos";

export const PagoRegisterPage = () => {
  const { pagos, initialPayForm } = usePagos();
  const { id } = useParams();
  const [pagoSelected, setPagoSelected] = useState(initialPayForm);
  useEffect(() => {
    const pago = pagos.find((pago) => pago.id == id) || initialPayForm;
    setPagoSelected(pago);
  }, [id]);
  return (
    <>
      <Typography align="center" variant="h2" marginY={10} fontWeight={"bold"}>
        Formulario de pago
      </Typography>

      <PagoForm pagoSelected={pagoSelected}></PagoForm>
    </>
  );
};
