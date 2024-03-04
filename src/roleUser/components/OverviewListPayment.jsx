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
                <TableCell>Fecha de vencimiento</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((pay, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>{pay.plan.nombre}</TableCell>
                    <TableCell>{pay.valorPagado}</TableCell>
                    <TableCell>{pay.fechaPago}</TableCell>
                    <TableCell>{pay.fechaVencimiento}</TableCell>
                    <TableCell>
                      <Chip label={pay.estado ? "Vigente" : "Vencido"} color={pay.estado ? "success" : "error"}></Chip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
