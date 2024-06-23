/* eslint-disable react/prop-types */
import { Alert, Button, Chip, FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { usePagos } from "../../hooks/usePagos";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Download } from "@mui/icons-material";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { congelarPlan } from "../../services/pagoService";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const PagoList = ({ search }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState(0);
  const { pagos, getPagos } = usePagos();
  const { handlerLogout } = useAuth();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  console.log(pagos);
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const onClickCongelar = (e, id) => {
    console.log(e);
    setId(id);
    handleOpen();
    console.log(id);
  };

  const onSubmitCongelar = (e) => {
    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.target);
    console.log(formData);

    const dias = Number(formData.get("diasCongelar"));

    const body = {
      id,
      dias,
    };

    congelarPlan(body)
      .then(() => {
        getPagos();
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          handlerLogout();
        }
        if (error.response?.status === 409) {
          Swal.fire("ERROR", "Los dias que mandaste superan los dias permitidos por el plan.", "error");
        }
        if (error.response?.status === 404) {
          Swal.fire("ERROR", "No se encontró el pago, recarga la pagína e intentalo de nuevo.", "error");
        }
        if (error.response?.status === 500) {
          Swal.fire("ERROR", "Ocurrio un error al intentar congelar el plan, intentalo de nuevo.", "error");
        }
      })
      .finally(() => {
        handleClose();
        setId(0);
      });
    console.log(body);
  };
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
                  <StyledTableCell align="right">Congelar</StyledTableCell>
                  <StyledTableCell align="center">Comprobante de Pago</StyledTableCell>
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
                          <Button disabled={!pago.estado} variant="contained" size="small" onClick={(e) => onClickCongelar(e, pago.id)}>
                            Congelar
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {pago?.fotoEvidencia !== undefined && pago?.fotoEvidencia?.length > 0 ? (
                            <a href={`${import.meta.env.VITE_API_BASE_URL}/pago/uploads/img/${pago.fotoEvidencia}`} download>
                              <Download />
                            </a>
                          ) : (
                            <HourglassDisabledIcon />
                          )}
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
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box component="form" sx={style} onSubmit={onSubmitCongelar}>
              <div className="my-4 col-span-2">
                <FormControl fullWidth>
                  <InputLabel htmlFor="duracion">Digite los dias que desea congelar. </InputLabel>
                  <OutlinedInput id="diasCongelar" label="Digite los dias que desea congelar. " name="diasCongelar" defaultValue={0} required type="number" />
                  <FormHelperText id="component-helper-text">(Debe ser menor a los días permitidos por el plan.)</FormHelperText>
                </FormControl>
              </div>
              <div className="col-span-2 text-center">
                <Button variant="outlined" type="submit">
                  Congelar
                </Button>
              </div>
            </Box>
          </Modal>
        </Grid>
      ) : (
        <Alert variant="filled" severity="warning">
          No hay pagos en el sistema
        </Alert>
      )}
    </>
  );
};
