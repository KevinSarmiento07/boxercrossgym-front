import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useUsers } from "../../hooks/useUsers";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

/* eslint-disable react/prop-types */
export const UsersList = () => {
  const { users } = useUsers();
  console.log(users);
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
                  <StyledTableCell align="right">Update</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  return (
                    <StyledTableRow hover key={user.id}>
                      <TableCell sx={{ padding: 1 }}>
                        {user.foto ? (
                          <Avatar
                            alt={user.foto}
                            src={`http://localhost:8080/users/uploads/img/${user.foto}`}
                            sx={{ width: 50, height: 50 }}
                          />
                        ) : (
                          <Avatar
                            alt="user"
                            src="/images/user.png"
                            sx={{ width: 50, height: 50 }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">{user.nombre}</TableCell>
                      <TableCell align="right">{user.apellido}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.telefono}</TableCell>
                      <TableCell align="right">
                        <NavLink to={`/users/edit/${user.id}`}>
                          <EditIcon />
                        </NavLink>
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
