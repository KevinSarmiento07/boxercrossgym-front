import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

export const RegisterPage = () => {
  const { users = [], initialUserForm } = useUsers();

  const [userSelected, setUserSelected] = useState(initialUserForm);

  const { id } = useParams();

  useEffect(() => {
    const user = users.find((user) => user.id == id) || initialUserForm;
    setUserSelected(user);
  }, [id]);

  return (
    <>
      <Typography align="center" variant="h3">
        {id > 0 ? "Editar Usuario" : "Registrar nuevo usuario"}
      </Typography>
      <UserForm userSelected={userSelected}></UserForm>
    </>
  );
};
