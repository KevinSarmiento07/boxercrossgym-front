import { Avatar, Chip, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useUsers } from "../../hooks/useUsers";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Person4Icon from "@mui/icons-material/Person4";
/* eslint-disable react/prop-types */
export const UsersList = ({ search }) => {
  const { users, isLoading } = useUsers();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (isLoading) {
    return (
      <div className="p-5 text-center">
        <CircularProgress color="error" />
      </div>
    );
  }
  return (
    <>
      {users.length > 0 ? (
        <Grid marginTop={3}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Foto</StyledTableCell>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Apellido</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Telefono</StyledTableCell>
                  <StyledTableCell align="right">Estado</StyledTableCell>
                  <StyledTableCell align="right">Modificar</StyledTableCell>
                  <StyledTableCell align="right">Rol</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((item) => {
                    return search.toLowerCase() === "" ? item : item.nombre.toLowerCase().includes(search.toLowerCase()) || item.apellido.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((user) => {
                    return (
                      <StyledTableRow hover key={user.id}>
                        <TableCell sx={{ padding: 1 }}>
                          {user.foto ? (
                            <Avatar alt={user.foto} src={`${import.meta.env.VITE_API_BASE_URL}/users/uploads/img/${user.foto}`} sx={{ width: 50, height: 50 }} />
                          ) : (
                            <Avatar alt="user" src="/images/user.png" sx={{ width: 50, height: 50 }} />
                          )}
                        </TableCell>
                        <TableCell align="right">{user.nombre}</TableCell>
                        <TableCell align="right">{user.apellido}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">{user.telefono}</TableCell>
                        <TableCell align="right">
                          <Chip label={user.enabled ? "Activo" : "Inactivo"} color={user.enabled ? "success" : "error"}></Chip>
                        </TableCell>
                        <TableCell align="right">
                          <NavLink to={`/users/edit/${user.id}`}>
                            <EditIcon />
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          {user.admin ? <Person4Icon /> : ""}
                          {user.entrenador ? <FitnessCenterIcon /> : ""}
                          {!user.admin && !user.entrenador ? <PersonIcon /> : ""}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ) : (
        <Alert variant="filled" severity="warning">
          No hay usuarios en el sistema
        </Alert>
      )}
    </>
  );
};
