/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { es } from "date-fns/locale";
import { format } from "date-fns";

export const AsistenciaTableRow = (props) => {
  const { row = {} } = props;
  console.log(row);
  const fecha = new Date(row.fecha);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {format(fecha, "EEE, d 'de' MMMM 'de' yyyy", { locale: es })}
        </TableCell>
        <TableCell align="right">{row.horario}</TableCell>
        <TableCell align="right">{row.cantidad}</TableCell>
      </TableRow>
      <TableRow hover>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Clientes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow hover>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.nombres.map((nombre, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {nombre}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
