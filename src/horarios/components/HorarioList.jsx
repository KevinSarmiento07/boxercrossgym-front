import { Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useClases } from "../../hooks/useClases";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/base";

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

const arrSemanas = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"];

export const HorarioList = () => {
  const { clases = [], getClases, handlerUpdateEnabled, handlerDeleteClase } = useClases();

  useEffect(() => {
    getClases();
  }, []);

  return (
    <>
      {clases.length > 0 ? (
        <Grid marginTop={3} sx={{ textAlign: "-webkit-center" }}>
          <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 1200 }}>
            <Table padding="normal" size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Horario</StyledTableCell>
                  <StyledTableCell>dias</StyledTableCell>
                  <StyledTableCell>dias</StyledTableCell>
                  <StyledTableCell>Entrenador</StyledTableCell>
                  <StyledTableCell align="right">Editar</StyledTableCell>
                  <StyledTableCell align="right">Eliminar</StyledTableCell>
                  <StyledTableCell align="right">Habilitado</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clases?.map((clase) => {
                  let dias = clase?.diasSemana?.map((numero) => arrSemanas[numero]);
                  return (
                    <StyledTableRow hover key={clase.id}>
                      <TableCell>{clase.horario}</TableCell>
                      <TableCell>{clase.dias}</TableCell>
                      <TableCell>
                        {dias != undefined && dias.length > 0
                          ? dias?.map((value) => {
                              return value + " ";
                            })
                          : "No hay dias asignados."}
                      </TableCell>
                      <TableCell>{clase.usuario ? `${clase?.usuario?.nombre} ${clase?.usuario?.apellido}` : "No hay un entrenador asignado."}</TableCell>
                      <TableCell align="right">
                        <NavLink to={`/class/schedule/${clase.id}`}>
                          <EditIcon />
                        </NavLink>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handlerDeleteClase(clase.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Switch color="error" checked={clase.enabled} value={clase.id} onChange={({ target }) => handlerUpdateEnabled(target.value)} />
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
          ¡No hay horarios registrados en el sistema!
        </Alert>
      )}
    </>
  );
};
