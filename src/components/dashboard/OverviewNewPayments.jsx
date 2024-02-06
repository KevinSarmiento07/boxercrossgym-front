/* eslint-disable react/prop-types */
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Chip,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const OverviewNewPayments = (props) => {
  const { sx, payments = [] } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Ultimos pagos" />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Fecha de Pago</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((pay) => {
              return (
                <TableRow hover key={pay.id}>
                  <TableCell>{`${pay.usuario.nombre} ${pay.usuario.apellido}`}</TableCell>
                  <TableCell>{pay.valorPagado}</TableCell>
                  <TableCell>{pay.fechaPago}</TableCell>
                  <TableCell>{pay.fechaVencimiento}</TableCell>
                  <TableCell>
                    <Chip
                      label={pay.estado ? "Vigente" : "Vencido"}
                      color={pay.estado ? "success" : "error"}
                    ></Chip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <NavLink to={"/payments"}>
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
          >
            View all
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
};
