/* eslint-disable no-useless-catch */
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/authService";
import { onLogin, onLogout } from "../store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { user, isAdmin, isAuth, isEntrenador } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlerLogin = async ({ username, password }, handleFalse) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      const user = { username: claims.sub };
      dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          isEntrenador: claims.isEntrenador,
          user,
        })
      );

      sessionStorage.setItem("token", `Bearer ${token}`);

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Hola ${user.username}`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (error) {
      handleFalse();
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error, usuario inactivo o credenciales erroneas.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const handlerLogout = () => {
    dispatch(onLogout());

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login");
    sessionStorage.clear();
  };

  return {
    login: {
      user,
      isAdmin,
      isEntrenador,
      isAuth,
    },
    handlerLogin,
    handlerLogout,
  };
};
