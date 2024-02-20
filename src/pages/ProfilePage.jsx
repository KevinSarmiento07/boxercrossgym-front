/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ProfilePage = () => {
  //const { user } = useSelector((state) => state.auth);
  const [fotoSelected, setFotoSelected] = useState({});
  console.log(fotoSelected);
  console.log(fotoSelected.name);
  const { initialUserForm, getInfoUser, handlerUploadUserPhoto } = useUsers();
  const [infoUser, setInfoUser] = useState(initialUserForm);
  console.log(infoUser);
  useEffect(() => {
    getInfoUser().then((res) => {
      console.log(res);
      const data = res.data;
      console.log(data);
      setInfoUser({
        ...data,
      });
    });
  }, []);

  const selectedPhoto = (e) => {
    const { target } = e;
    const selectedFile = target.files[0];

    if (!selectedFile) {
      return;
    }
    if (selectedFile.type.indexOf("image") < 0) {
      Swal.fire("Error upload: ", "Debe seleccionar una foto", "error");
      return;
    }
    setFotoSelected(selectedFile);
  };
  const uploadPhoto = () => {
    handlerUploadUserPhoto(fotoSelected, infoUser.id).then((user) => {
      setInfoUser(user);
    });
    setFotoSelected({});
  };
  return (
    <>
      <Typography variant="h2" fontWeight="bold" textAlign="center">
        Perfil Personal
      </Typography>
      {infoUser.id > 0 ? (
        <Grid container columnSpacing={1} rowSpacing={2} marginTop={3}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={8} sx={{ marginBottom: 2, paddingY: 5 }}>
              <Stack
                spacing={2}
                justifyContent={"center"}
                textAlign="center"
                alignItems="center"
              >
                <Avatar
                  src={
                    infoUser.foto === "" || infoUser.foto == null
                      ? "/images/user.png"
                      : `http://localhost:8080/users/uploads/img/${infoUser.foto}`
                  }
                  alt={
                    infoUser.foto === "" || infoUser.foto == null
                      ? "user"
                      : infoUser.foto
                  }
                  sx={{ width: 170, height: 170, marginY: 5 }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  marginY={15}
                >{`${infoUser.nombre} ${infoUser.apellido}`}</Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  marginY={15}
                >{`Fecha de nacimiento: ${infoUser.fechaNacimiento}`}</Typography>
              </Stack>
            </Paper>
            <Paper elevation={8}>
              <Grid container margin={1} textAlign="center" width="auto">
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Selecciona una foto de perfil:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "-webkit-center" }}>
                  <img
                    src="/images/user.png"
                    style={{
                      border: 0,
                      objectFit: "scale-down",
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8} alignSelf="center">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    color="error"
                    size="small"
                    sx={{ marginBottom: 2 }}
                    onChange={selectedPhoto}
                    startIcon={<CloudUploadIcon />}
                  >
                    Cargar Imagen
                    <VisuallyHiddenInput type="file" />
                  </Button>
                  <Typography>{fotoSelected.name}</Typography>
                </Grid>
                <Grid item xs={12} alignSelf="center" textAlign="center">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ marginBottom: 2 }}
                    onClick={uploadPhoto}
                    disabled={fotoSelected.name == undefined ? true : false}
                  >
                    Subir
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={8}>
              <Typography
                variant="h6"
                paddingY={4}
                paddingX={3}
                fontWeight="bold"
              >
                Información General
              </Typography>

              <Grid
                container
                marginX={3}
                rowSpacing={3}
                columnSpacing={1}
                width="auto"
              >
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
                      readOnly: true,
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
