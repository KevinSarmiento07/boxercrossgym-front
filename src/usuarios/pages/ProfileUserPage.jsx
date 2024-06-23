/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

export const ProfileUserPage = () => {
  //const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { initialUserForm, users } = useUsers();
  const [infoUser, setInfoUser] = useState(initialUserForm);

  useEffect(() => {
    const user = users.find((item) => item.id == id);
    setInfoUser({
      ...user,
    });
  }, [id]);

  return (
    <>
      <Typography variant="h2" fontWeight="bold" textAlign="center">
        Perfil del Usuario
      </Typography>
      {infoUser.id > 0 ? (
        <Grid container columnSpacing={1} rowSpacing={2} marginTop={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={8} sx={{ marginBottom: 2, paddingY: 5 }}>
              <Stack spacing={2} justifyContent={"center"} textAlign="center" alignItems="center">
                <Avatar
                  src={infoUser.foto === "" || infoUser.foto == null ? "/images/user.png" : `${import.meta.env.VITE_API_BASE_URL}/users/uploads/img/${infoUser.foto}`}
                  alt={infoUser.foto === "" || infoUser.foto == null ? "user" : infoUser.foto}
                  sx={{ width: 170, height: 170, marginY: 5 }}
                />
                <Typography variant="h6" fontWeight="bold" marginY={15}>{`${infoUser.nombre} ${infoUser.apellido}`}</Typography>
                <Typography variant="subtitle2" fontWeight="bold" marginY={15}>{`Fecha de nacimiento: ${infoUser.fechaNacimiento}`}</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={8}>
              <Typography variant="h6" paddingY={4} paddingX={3} fontWeight="bold">
                Información General{" "}
              </Typography>

              <Grid container marginX={3} rowSpacing={3} columnSpacing={1} width="auto">
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.nombre}
                    label="Nombres"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.apellido}
                    label="Apellidos"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.email}
                    label="Email"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.cedula}
                    label="Cedula"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.fechaNacimiento}
                    label="Fecha de nacimiento"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.fechaInscripcion}
                    label="Fecha de inscripción"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    value={infoUser.telefono}
                    label="Télefono"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} marginBottom={4}>
                  <TextField
                    fullWidth
                    value={infoUser.antecedente}
                    label="Información Adicional"
                    minRows={4}
                    rows={4}
                    InputProps={{
                      readOnly: false,
                    }}
                    variant="filled"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
};
