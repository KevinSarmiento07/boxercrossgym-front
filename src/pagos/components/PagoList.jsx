import { Alert } from "@mui/material";
import { usePagos } from "../../hooks/usePagos";
import { styled } from "@mui/material/styles";
import {
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
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const PagoList = () => {
  const { pagos } = usePagos();

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
      {pagos.length > 0 ? (
        <Grid marginTop={3}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Usuario</StyledTableCell>
                  <StyledTableCell align="right">Plan</StyledTableCell>
                  <StyledTableCell align="right">Tipo de Pago</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                  <StyledTableCell align="right">
                    Fecha de Pago{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Fecha de Vencimiento
                  </StyledTableCell>
                  <StyledTableCell align="right">Editar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagos.map((pago) => {
                  return (
                    <StyledTableRow hover key={pago.id}>
                      <TableCell sx={{ padding: 1 }}>
                        {pago.usuario.nombre}
                      </TableCell>
                      <TableCell align="right">{pago.nombre}</TableCell>
                      <TableCell align="right">{pago.plan.nombre}</TableCell>
                      <TableCell align="right">
                        {pago.tipoPago.descripcion}
                      </TableCell>
                      <TableCell align="right">{pago.fechaPago}</TableCell>
                      <TableCell align="right">
                        {pago.fechaVencimiento}
                      </TableCell>
                      <TableCell align="right">
                        <NavLink to={`/payments/edit/${pago.id}`}>
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
          No hay pagos en el sistema
        </Alert>
      )}
    </>
  );
};
