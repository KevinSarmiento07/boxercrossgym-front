import { Divider, Typography } from "@mui/material";
import { HorarioList } from "../components/HorarioList";
import { HorarioForm } from "../components/HorarioForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClases } from "../../hooks/useClases";

export const HorarioPage = () => {
  const { clases = [], initialClaseForm } = useClases();
  const { id } = useParams();
  const [claseSelected, setClaseSelected] = useState(initialClaseForm);
  useEffect(() => {
    if (id) {
      const clase = clases.find((clase) => clase.id == id);
      setClaseSelected(clase);
    }
  }, [id]);
  return (
    <>
      <Typography variant="h2" textAlign={"center"} fontWeight={"bold"}>
        Horarios Disponibles
      </Typography>
      <HorarioList></HorarioList>
      <Divider sx={{ marginY: 5 }} />
      <Typography variant="h3" textAlign={"center"} fontWeight={"bold"}>
        Agregar Horario
      </Typography>
      <HorarioForm claseSelected={claseSelected}></HorarioForm>
    </>
  );
};
