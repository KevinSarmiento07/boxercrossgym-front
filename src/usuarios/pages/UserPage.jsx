import { useEffect, useState } from "react";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../../hooks/useUsers";
import { Search } from "../../components/Search";
import { Typography } from "@mui/material";
export const UserPage = () => {
  const { getUsers } = useUsers();

  const [search, setSearch] = useState("");
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Typography align="center" variant="h3" fontWeight={"bold"}>
        Usuarios
      </Typography>
      <div className="mt-4">
        <Search setSearch={setSearch} search={search} />
      </div>
      <UsersList search={search}></UsersList>
    </div>
  );
};
