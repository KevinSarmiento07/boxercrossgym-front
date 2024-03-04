import { useEffect } from "react";
import { useTests } from "../../hooks/useTests";
import { useSelector } from "react-redux";
import { Alert, Container, Grid, Paper, Table, Typography, TableContainer, TableHead, TableRow, tableCellClasses, TableCell, TableBody } from "@mui/material";
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

export const TestListResult = () => {
  const { getUserTest } = useTests();
  const { usertests } = useSelector((state) => state.usertests);
  useEffect(() => {
    getUserTest();
  }, []);
  return (
    <Container>
      {usertests.length > 0 ? (
        usertests.map((resultado, item) => {
          return (
            <div key={item}>
              <Paper elevation={8} sx={{ padding: 1, marginY: 2 }}>
                <Grid container rowSpacing={1} columnSpacing={1} marginBottom={1}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography component={"pre"} variant="h6" textAlign={"center"} sx={{ whiteSpace: "pre-wrap" }} fontFamily={"monospace"}>
                      {resultado.test?.descripcion}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} elevation={3}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Count</StyledTableCell>
                            <StyledTableCell>Fecha</StyledTableCell>
                            <StyledTableCell>Resultado</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {resultado.resultados?.map((result, index) => {
                            return (
                              <StyledTableRow hover key={result.id}>
                                <TableCell>{++index}</TableCell>
                                <TableCell>{result.fecha}</TableCell>
                                <TableCell>{result.valor}</TableCell>
                              </StyledTableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })
      ) : (
        <Alert severity="info" sx={{ marginY: 5 }}>
          No has registrado ningun resultado a un test
        </Alert>
      )}
    </Container>
  );
};
