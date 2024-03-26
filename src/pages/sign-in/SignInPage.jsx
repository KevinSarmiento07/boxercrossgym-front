import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const defaultTheme = createTheme();
const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "#ccc",
  opacity: 0.5,
  zIndex: 1,
});

export const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const { handlerLogin } = useAuth();

  function handleOpen() {
    setLoading(true);
  }

  function handleFalse() {
    setLoading(false);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpen();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    handlerLogin({ username, password }, handleFalse).catch((error) => {
      console.log(error);
      setLoading(false);
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
          <Typography component="h1" variant="h5">
            Inicio de Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="username" label="Correo Electronico" name="username" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="error" sx={{ mt: 3, mb: 2 }}>
              INICIAR SESIÓN
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" color={"error"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to={"/register"} className="text-red-600 underline cursor-pointer">
                  Registrarse
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
