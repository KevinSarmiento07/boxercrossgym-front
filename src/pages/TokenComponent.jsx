/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { changePassword, validateToken } from "../services/userService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialPass = {
  password: "",
  confirmPass: "",
};
export const TokenComponent = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const [pass, setPass] = useState(initialPass);
  const onChangeToken = ({ target }) => {
    const { value } = target;
    setToken(value);
  };

  const onChangePassword = ({ target }) => {
    const { name, value } = target;

    setPass({
      ...pass,
      [name]: value,
    });
  };

  const onSubmitValidateToken = (e) => {
    e.preventDefault();

    validateToken(token)
      .then((res) => {
        setIsVisiblePass(true);
      })
      .catch(() => {
        Swal.fire("Error", "TOKEN INVALIDO", "error");
      });
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();
    const { password, confirmPass } = pass;

    if (password !== confirmPass) {
      Swal.fire("Error", "Las contraseñas son diferentes", "error");
      return;
    }

    if (password.length <= 0) {
      Swal.fire("Error", "Las contraseñas no puede estar vacia", "error");
      return;
    }
    const data = {
      token,
      password,
    };

    changePassword(data)
      .then(() => {
        Swal.fire("Confirmado", "Contraseña cambiada correctamente", "success");
        navigate("/");
      })
      .finally(() => {
        isVisiblePass(false);
        setPass(initialPass);
      });
  };
  return (
    <div>
      <Box component="form" sx={{ mt: 1 }} required onSubmit={onSubmitValidateToken}>
        <div className="mt-4">
          <Typography variant="subtitle1" fontWeight={"bold"}>
            Por favor, revisa el correo electronico y digita el codigo enviado.
          </Typography>

          <div>
            <TextField
              margin="normal"
              error={token != undefined && token?.length > 0}
              value={token}
              required
              fullWidth
              id="token"
              label="Token"
              name="token"
              type="number"
              autoComplete="token"
              autoFocus
              onChange={onChangeToken}
            />
          </div>

          <Button fullWidth type="submit" variant="contained" color="error" sx={{ mt: 3, mb: 2 }} disabled={isVisiblePass}>
            Validar Token
          </Button>
        </div>
      </Box>

      {isVisiblePass ? (
        <div className="my-4">
          <Typography variant="subtitle1" fontWeight={"bold"}>
            Token Validado!
          </Typography>

          <Box component={"form"} onSubmit={onSubmitPassword}>
            <div>
              <TextField
                margin="normal"
                error={pass.password != undefined && pass.password?.length > 0}
                value={pass.password}
                required
                fullWidth
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                autoComplete="Contraseña"
                autoFocus
                onChange={onChangePassword}
              />
            </div>

            <div>
              <TextField
                margin="normal"
                error={pass.confirmPass != undefined && pass.confirmPass?.length > 0}
                value={pass.confirmPass}
                required
                fullWidth
                id="confirmPass"
                label="Confirmar Contraseña"
                name="confirmPass"
                type="password"
                autoComplete="Confirmar Contraseña"
                autoFocus
                onChange={onChangePassword}
              />
            </div>

            <div className="text-center">
              <Button type="submit" variant="outlined" color="error">
                Cambiar Contraseña
              </Button>
            </div>
          </Box>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
