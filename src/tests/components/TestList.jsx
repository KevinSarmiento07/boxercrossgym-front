import { Alert, Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTests } from "../../hooks/useTests";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export const TestList = () => {
  const { handlerOpenForm, visibleForm, tests, getTests } = useTests();
  console.log(visibleForm);
  const { login } = useAuth();
  console.log(tests);

  useEffect(() => {
    getTests();
  }, []);
  return (
    <>
      {!login.isAdmin || (
        <Button variant="contained" color="error" sx={{ marginY: 3 }} onClick={handlerOpenForm}>
          Agregar Test
        </Button>
      )}
      <Box>
        <Grid container rowSpacing={3} columnSpacing={8}>
          {tests.length > 0 ? (
            tests.map((test) => {
              return (
                <Grid item xs={12} sm={6} marginBottom={2} key={test.id} minWidth={200}>
                  <Paper elevation={8} sx={{ height: "100%" }}>
                    {!login.isAdmin || (
                      <IconButton aria-label="delete" sx={{ marginBottom: 0 }} color="error">
                        <DeleteIcon />
                      </IconButton>
                    )}
                    <IconButton aria-label="delete">
                      <AppRegistrationIcon />
                    </IconButton>
                    <Typography component={"pre"} variant="h6" textAlign={"center"} sx={{ whiteSpace: "pre-wrap" }} fontFamily={"monospace"}>
                      {test.descripcion}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <Alert variant="filled" severity="error" sx={{ justifyContent: "center" }}>
              No hay bloques en este entrenamiento
            </Alert>
          )}
        </Grid>
      </Box>
    </>
  );
};
