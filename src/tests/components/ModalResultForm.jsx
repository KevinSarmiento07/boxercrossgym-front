/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useTests } from "../../hooks/useTests";

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

const initialResultForm = {
  id: 0,
  fecha: "",
  valor: "",
  test: {
    id: 0,
  },
};
export const ModalResultForm = ({ open, handleClose, idTest, setIdTest }) => {
  const { handlerSaveUserTest, usertests } = useTests();
  useEffect(() => {
    setResultForm({
      ...resultForm,
      test: { id: idTest },
    });
  }, [idTest]);
  const [resultForm, setResultForm] = useState(initialResultForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setResultForm({ ...resultForm, [name]: value });
  };

  const onDateChange = (value, context, name) => {
    const fecha = dayjs(value).format("YYYY-MM-DD");
    setResultForm({
      ...resultForm,
      [name]: fecha,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (resultForm.fecha === "" && resultForm.valor === "") {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    handlerSaveUserTest(resultForm);
    setResultForm(initialResultForm);
    setIdTest(0);
    handleClose();
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} component="form" onSubmit={onSubmit}>
            <Typography textAlign="center" variant="h6">
              Resultado
            </Typography>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Digite su resultado" fullWidth name="valor" value={resultForm.valor} onChange={onInputChange} required />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Fecha"
                  name="fecha"
                  value={resultForm.fecha === "" ? null : dayjs(resultForm.fecha)}
                  format="YYYY-MM-DD"
                  required
                  onChange={(value, context) => onDateChange(value, context, "fecha")}
                />
              </Grid>
              <Grid item xs={12} textAlign={"center"}>
                <Button variant={"outlined"} type="submit" color="error">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </LocalizationProvider>
    </div>
  );
};
