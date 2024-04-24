import { useEffect, useState } from "react";
import { AsistenciaTable } from "../components/AsistenciaTable";
import { useClases } from "../../hooks/useClases";
import { Typography } from "@mui/material";

export const HorarioAsistenciaPage = () => {
  const { getBookingsData } = useClases();

  const [data, setData] = useState([]);
  useEffect(() => {
    getBookingsData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Typography variant="h2" textAlign={"center"} fontWeight={"bold"} marginY={"5"}>
        Asistencia
      </Typography>
      <AsistenciaTable data={data}></AsistenciaTable>
    </>
  );
};
