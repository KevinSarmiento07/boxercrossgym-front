import { Typography } from "@mui/material";
import { PagoForm } from "../components/PagoForm";

export const PagoRegisterPage = () => {
  return (
    <>
      <Typography align="center" variant="h2" marginY={10} fontWeight={"bold"}>
        Formulario de pago
      </Typography>

      <PagoForm></PagoForm>
    </>
  );
};
