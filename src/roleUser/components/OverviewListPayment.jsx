import { Card, CardContent, CardHeader, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

/* eslint-disable react/prop-types */
export const OverviewListPayment = (props) => {
  const { sx, data } = props;
  console.log(sx);
  console.log(data);

  return (
    <Card sx={{ sx }} raised elevation={8}>
      <CardHeader title="Mis pagos recientes" sx={{ textAlign: "center" }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Fecha de Pago</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>Mensualidad</TableCell>
                <TableCell>180000</TableCell>
                <TableCell>2024-03-04</TableCell>
                <TableCell>2024-04-03</TableCell>
                <TableCell>
                  <Chip label={"Vigente"} color={"success"}></Chip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
