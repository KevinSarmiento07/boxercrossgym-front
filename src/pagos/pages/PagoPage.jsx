import { Typography } from "@mui/material";
import { PagoList } from "../components/PagoList";
import { usePagos } from "../../hooks/usePagos";
import { useEffect } from "react";
import { Search } from "../../components/Search";
import { useState } from "react";

export const PagoPage = () => {
  const { getPagos } = usePagos();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPagos();
  }, []);
  return (
    <>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Pagos
      </Typography>

      <div className="mt-4">
        <Search search={search} setSearch={setSearch} />
      </div>
      <PagoList search={search}></PagoList>
    </>
  );
};
