/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const { user } = useSelector((state) => state.auth);
  const { initialUserForm, getInfoUser } = useUsers();
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
  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={2} marginTop={3}>
        <Grid item xs={12} sm={5}>
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
            <Grid container margin={1} textAlign="center">
              <Grid item xs={12}>
                <Typography variant="h6">
                  Selecciona una foto de perfil:
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "-webkit-center" }}>
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
              <Grid item xs={6} alignSelf="center">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  color="error"
                  size="small"
                  startIcon={<CloudUploadIcon />}
                >
                  Cargar Imagen
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Paper elevation={8}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
            quasi eum sit voluptatem. Ducimus reiciendis sint eaque laudantium
            accusamus sit illo, ea similique, modi deserunt amet rem, assumenda
            alias adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Explicabo quisquam non beatae maxime voluptas ipsum, totam
            exercitationem numquam quaerat pariatur consequatur temporibus animi
            facere neque odio at quae dolores facilis. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Rerum earum dolores reiciendis,
            assumenda soluta corporis dolor consequatur nobis veritatis
            cupiditate laborum laudantium praesentium dignissimos, accusamus
            minima cumque ex consectetur. Ipsa! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Asperiores veritatis officia, sit
            eligendi perspiciatis, ipsam reiciendis saepe placeat fugiat
            inventore dolorum? Inventore maxime, aspernatur omnis repudiandae
            ratione expedita odio sunt! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Odio sunt pariatur molestiae, eaque nisi aperiam
            laborum delectus sapiente, quam dolorem repellat incidunt eum
            maiores cum dicta ipsa voluptatem unde quidem. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quia dolor nisi consequatur
            dicta velit dolore eum iure illum perferendis consectetur, similique
            repudiandae ipsam optio dolorem? Inventore distinctio hic impedit
            voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quae, asperiores repudiandae neque qui quam cumque, ipsam
            perferendis, quo nobis illo repellat ut! Soluta, iure nihil!
            Quibusdam ratione eligendi tempore sunt. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Deserunt excepturi doloremque unde
            maxime assumenda nostrum culpa hic quae quaerat expedita quis
            repellat aliquam, similique mollitia et tenetur. Expedita, alias
            consectetur. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Amet possimus minus nihil dolore quos mollitia, soluta,
            pariatur, distinctio cupiditate consequuntur similique odio
            provident optio laborum enim voluptates porro nam eveniet!
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
