/* eslint-disable react/prop-types */
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useClases } from "../../hooks/useClases";

export const HorarioForm = ({ claseSelected }) => {
  const { initialClaseForm, handlerAddClase } = useClases();

  const [claseForm, setClaseForm] = useState(initialClaseForm);

  const { horario, dias } = claseForm;

  useEffect(() => {
    setClaseForm({
      ...claseSelected,
    });
  }, [claseSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setClaseForm({ ...claseForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(claseForm);
    handlerAddClase(claseForm);
    setClaseForm(initialClaseForm);
  };

  return (
    <>
      <Container>
        <Box component="form" onSubmit={onSubmit}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={2}
          >
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Horario"
                variant="outlined"
                name="horario"
                value={horario}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Dias"
                variant="outlined"
                name="dias"
                value={dias}
                onChange={onInputChange}
                required
              />
            </Grid>
          </Grid>
          <Grid marginTop={2} textAlign={"center"}>
            <Button
              variant="outlined"
              type="submit"
              color="secondary"
              size="large"
              sx={{ textTransform: "none" }}
            >
              Guardar
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
