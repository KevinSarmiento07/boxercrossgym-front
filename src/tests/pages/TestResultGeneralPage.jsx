import { useEffect, useState } from "react";
import { Alert, TableBody } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTests } from "../../hooks/useTests";
import { Box, Grid, Paper, Table, TableContainer, TableHead, TableRow, Typography, tableCellClasses, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const TestResultGeneralPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { getResultTestById } = useTests();

  useEffect(() => {
    getResultTestById(id).then((res) => {
      setData(res.data);
    });
  }, [id]);
  return (
    <Box>
      <Grid container rowSpacing={3} columnSpacing={4}>
        <Grid item xs={12}>
          {data.test?.descripcion !== undefined ? (
            <Paper elevation={8} sx={{ height: "100%", minHeight: 100 }}>
              <Typography component={"pre"} variant="h6" textAlign={"center"} sx={{ whiteSpace: "pre-wrap" }} fontFamily={"monospace"}>
                {data.test.descripcion}
              </Typography>
            </Paper>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          {data.results?.length > 0 ? (
            <TableContainer component={Paper} elevation={3}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Count</StyledTableCell>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell>Apellido</StyledTableCell>
                    <StyledTableCell align="right">Fecha</StyledTableCell>
                    <StyledTableCell align="right">Resultado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.results.map((result, index) => {
                    return (
                      <StyledTableRow hover key={result.id}>
                        <TableCell>{++index}</TableCell>
                        <TableCell sx={{ padding: 1 }}>{result.usuario.nombre}</TableCell>
                        <TableCell>{result.usuario.apellido}</TableCell>
                        <TableCell align="right">{result.fecha}</TableCell>
                        <TableCell align="right">{result.valor}</TableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert variant="filled" severity="warning">
              No hay resultaods inscritos en este test
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
