import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { forgotPassword } from "../../services/userService";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { TokenComponent } from "../TokenComponent";
import { NavLink } from "react-router-dom";
const defaultTheme = createTheme();
const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "#ccc",
  opacity: 0.5,
  zIndex: 1,
});

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [isVisibleFormToken, setIsVisibleFormToken] = useState(false);

  const onChangeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const onClickEnviar = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e);
    console.log(email);

    forgotPassword(email)
      .then((res) => {
        console.log(res);

        setLoading(false);
        setIsVisibleFormToken(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire("Error", "Ocurrió un error, revisa el correo electronico e intentalo de nuevo", "error");
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!loading || (
            <>
              <CircularProgress
                size={70}
                sx={{
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
                color="error"
              />
              <DisabledBackground />
            </>
          )}
          <div className="mb-4 ">
            <Typography variant={"h4"} fontSize={"42px"} fontWeight={"bold"}>
              BOXERCROSSGYM
            </Typography>
          </div>
          <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={"bold"}>
            REPURACIÓN DE CONTRASEÑA
          </Typography>

          {isVisibleFormToken ? (
            <TokenComponent />
          ) : (
            <div>
              <div className="pt-3">
                <Typography variant="subtitle1">Por favor, digite su correo electronico para enviarle un codigo de confirmación*.</Typography>
              </div>
              <Box component="form" sx={{ mt: 1 }} onSubmit={onClickEnviar} required>
                <TextField
                  margin="normal"
                  error={email != undefined && email?.length > 0}
                  value={email}
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  onChange={onChangeEmail}
                />

                <Button fullWidth type="submit" variant="contained" color="error" sx={{ mt: 3, mb: 2 }}>
                  Enviar
                </Button>
              </Box>
            </div>
          )}

          <NavLink to={"/"} className="text-red-600 underline cursor-pointer">
            Iniciar Sesión
          </NavLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
