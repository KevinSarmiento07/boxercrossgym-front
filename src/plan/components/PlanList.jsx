import { usePlan } from "../../hooks/usePlan";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
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
export const PlanList = () => {
  const { plans, handlerDeletePlan } = usePlan();
  return (
    <>
      {plans.length > 0 ? (
        <Grid marginTop={3}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Nombre</StyledTableCell>
                  <StyledTableCell align="right">Valor</StyledTableCell>
                  <StyledTableCell align="right">Duración</StyledTableCell>
                  <StyledTableCell align="right">Días para congelar</StyledTableCell>
                  <StyledTableCell align="right">Editar</StyledTableCell>
                  <StyledTableCell align="right">Eliminar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.map((plan) => {
                  return (
                    <StyledTableRow hover key={plan.id}>
                      <TableCell align="right">{plan.nombre}</TableCell>
                      <TableCell align="right">{plan.valor}</TableCell>
                      <TableCell align="right">{plan.duracion}</TableCell>
                      <TableCell align="right">{plan.diasCongelar}</TableCell>
                      <TableCell align="right">
                        <NavLink to={`/planes/edit/${plan.id}`}>
                          <EditIcon />
                        </NavLink>
                      </TableCell>
                      <TableCell align="right">
                        <Button color="error" onClick={() => handlerDeletePlan(plan.id)}>
                          <DeleteIcon />
                        </Button>
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
