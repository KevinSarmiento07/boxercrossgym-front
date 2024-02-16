import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import {
  findAll,
  getInfoUserAuthenticate,
  getNewUsers,
  getTotalUsersActives,
  getTotalUsersInactives,
  saveUser,
  updateUserS,
} from "../services/userService";
import {
  addUser,
  loadingUsers,
  updateUser,
} from "../store/slices/users/usersSlice";
import { initialUserForm } from "../store/slices/users/usersSlice";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

export const useUsers = () => {
  const { users } = useSelector((state) => state.users);

  const { handlerLogout } = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      dispatch(loadingUsers(result.data));
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddUser = async (user) => {
    console.log(user);
    try {
      if (user.id == 0) {
        const res = await saveUser(user);
        dispatch(addUser(res.data));
      } else {
        const res = await updateUserS(user);
        dispatch(updateUser(res.data));
      }

      Swal.fire(
        user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
        user.id === 0
          ? "El usuario ha sido creado con exito!"
          : "El usuario ha sido actualizado con exito!",
        "success"
      );

      navigate("/users");
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getTotalUsersViewActive = async () => {
    try {
      const res = await getTotalUsersActives();
      return res.data;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getInfoUser = async () => {
    try {
      return await getInfoUserAuthenticate();
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  return {
    getUsers,
    users,
    initialUserForm,
    handlerAddUser,
    getTotalUsersViewActive,
    getTotalUsersViewInactive,
    getViewNewUsers,
    getInfoUser,
  };
};
