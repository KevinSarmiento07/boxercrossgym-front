import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import {
  findAll,
  findAllByRole,
  findById,
  forgotPassword,
  getInfoUserAuthenticate,
  getNewUsers,
  getTotalUsersActives,
  getTotalUsersInactives,
  saveUser,
  sendEmails,
  updateUserS,
  uploadUserPhoto,
} from "../services/userService";
import { addUser, loadingError, loadingUsers, updateUser } from "../store/slices/users/usersSlice";
import { initialUserForm } from "../store/slices/users/usersSlice";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

export const useUsers = () => {
  const { users, errors, isLoading } = useSelector((state) => state.users);

  const { handlerLogout, login } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      dispatch(loadingUsers(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getUserById = async (id) => {
    try {
      const result = await findById(id);
      return result.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getUsersByRole = async (role) => {
    try {
      return await findAllByRole(role);
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddUser = async (user) => {
    try {
      if (user.id == 0) {
        const res = await saveUser(user);
        dispatch(addUser(res.data));
      } else {
        const res = await updateUserS(user);
        dispatch(updateUser(res.data));
      }

      Swal.fire(user.id === 0 ? "Usuario Creado" : "Usuario Actualizado", user.id === 0 ? "El usuario ha sido creado con exito!" : "El usuario ha sido actualizado con exito!", "success");

      if (login.isAdmin) {
        navigate("/users");
      }
      if (login.isEntrenador) {
        navigate("/");
      }

      if (login.user) {
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      } else if (error.response && error.response.status == 400) {
        dispatch(loadingError(error.response.data));
      } else if (error.response && error.response.status == 500 && (error.response.data?.error?.includes("constraint") || error.response.data?.error?.includes("truncation"))) {
        if (error.response.data?.error?.includes("email_UNIQUE")) {
          dispatch(loadingError({ email: "El correo electronico ya se encuentra registrado en la base de datos" }));
        }
        if (error.response.data?.error?.includes("cedula_UNIQUE")) {
          dispatch(loadingError({ cedula: "La cedula ya se encuentra registrado en la base de datos" }));
        }
        if (error.response.data?.error?.includes("telefono_UNIQUE")) {
          dispatch(loadingError({ telefono: "El telefono ya se encuentra registrado en la base de datos" }));
        }
        if (error.response.data?.error?.includes("long for column 'telefono'")) {
          dispatch(loadingError({ telefono: "El numero telefonico supera el limite de digitos (10)" }));
        }
        if (error.response.data?.error?.includes("long for column 'cedula'")) {
          dispatch(loadingError({ cedula: "El numero de documento supera el limite de digitos (45)" }));
        }
      }

      return;
    }
  };

  const getTotalUsersViewActive = async () => {
    try {
      const res = await getTotalUsersActives();
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getTotalUsersViewInactive = async () => {
    try {
      const res = await getTotalUsersInactives();
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getViewNewUsers = async () => {
    try {
      const res = await getNewUsers();
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getInfoUser = async () => {
    try {
      return await getInfoUserAuthenticate();
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerUploadUserPhoto = async (archivo, id) => {
    try {
      const res = await uploadUserPhoto(archivo, id);
      Swal.fire("Foto Subida", "La foto de perfil fue subida con exíto", "success");
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerSendEmails = async (usuarios, option, asunto, body) => {
    try {
      await sendEmails(usuarios, option, asunto, body);
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
      Swal.fire("Error", "Ocurrio un error al enviar los correos, intentalo de nuevo.", "error");
    }

    Swal.fire("Emails enviados", "Los correos fueron enviados corectamente", "success");
  };

  const handlerForgotPasword = async (email) => {
    try {
      return await forgotPassword(email);
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
      if (error.response?.status == 500) {
        Swal.fire("Error", "Ocurrio un error verifica el correo electronica e intentalo de nuevo.", "error");
      }
    }
  };

  return {
    getUsers,
    getUsersByRole,
    getUserById,
    users,
    initialUserForm,
    handlerAddUser,
    getTotalUsersViewActive,
    getTotalUsersViewInactive,
    getViewNewUsers,
    getInfoUser,
    handlerUploadUserPhoto,
    errors,
    isLoading,
    handlerSendEmails,
    handlerForgotPasword,
  };
};
