import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useTests } from "../../hooks/useTests";
import { useSelector } from "react-redux";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "max-content", md: 800 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export const TestForm = () => {
  const { handlerCloseForm, handlerAddTest, initialTestForm } = useTests();
  const [testForm, setTestForm] = useState(initialTestForm);
  const { visibleForm } = useSelector((state) => state.tests);

  const onChangeForm = ({ target }) => {
    const { name, value } = target;

    setTestForm({
      ...testForm,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handlerAddTest(testForm);
    setTestForm(initialTestForm);
  };
  return (
    <>
      <Modal open={visibleForm} onClose={handlerCloseForm} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            New Tests
          </Typography>
          <Container>
            <Box component="form" marginTop={4} onSubmit={onSubmit}>
              <Grid container width="auto" marginTop={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={12}>
                  <TextField fullWidth multiline rows={5} variant="outlined" label="Descripción" type="Descripcion" name="descripcion" value={testForm.descripcion} onChange={onChangeForm} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="medicion">Tipo de medición</InputLabel>
                    <Select labelId="medicion" id="medicion-select" label="Tipo de medición" name="medicion" value={testForm.medicion} onChange={onChangeForm}>
                      <MenuItem value={"REPETICIONES"}>Repeticiones</MenuItem>
                      <MenuItem value={"INTERVALOS"}>Intervalos</MenuItem>
                      <MenuItem value={"TIEMPO"}>Tiempo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                  <Button variant={"contained"} color="error" type="submit" size="large">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
