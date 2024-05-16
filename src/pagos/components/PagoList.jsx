/* eslint-disable react/prop-types */
import { Alert, Chip } from "@mui/material";
import { usePagos } from "../../hooks/usePagos";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const PagoList = ({ search }) => {
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
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Usuario</StyledTableCell>
                  <StyledTableCell align="right">Plan</StyledTableCell>
                  <StyledTableCell align="right">Tipo de Pago</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                  <StyledTableCell align="right">Fecha de Pago </StyledTableCell>
                  <StyledTableCell align="right">Fecha de Vencimiento</StyledTableCell>
                  <StyledTableCell align="right">Estado del pago</StyledTableCell>
                  <StyledTableCell align="right">Editar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagos
                  .filter((item) => {
                    return search.toLowerCase() === "" ? item : item.usuario.nombre.toLowerCase().includes(search.toLowerCase()) || item.usuario.apellido.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((pago) => {
                    return (
                      <StyledTableRow hover key={pago.id}>
                        <TableCell sx={{ padding: 1 }}>
                          {pago.usuario.nombre} {pago.usuario.apellido}
                        </TableCell>
                        <TableCell align="right">{pago.plan.nombre}</TableCell>
                        <TableCell align="right">{pago.tipoPago}</TableCell>
                        <TableCell align="right">{pago.valorPagado}</TableCell>
                        <TableCell align="right">{pago.fechaPago}</TableCell>
                        <TableCell align="right">{pago.fechaVencimiento}</TableCell>
                        <TableCell align="right">
                          <Chip label={pago.estado ? "Vigente" : "Vencido"} color={pago.estado ? "success" : "error"}></Chip>
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
