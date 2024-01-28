import {
  Avatar,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUsers } from "../../hooks/useUsers";

/* eslint-disable react/prop-types */
export const UsersList = () => {
  const { users } = useUsers();

  return (
    <>
      <Container>
        <Grid marginTop={3}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Foto</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellido</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Telefono</TableCell>
                  <TableCell align="right">Update</TableCell>
                  <TableCell align="right">Temove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  return (
                    <TableRow key={user.email}>
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
                      <TableCell align="right">Update</TableCell>
                      <TableCell align="right">Temove</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </>
  );
};
