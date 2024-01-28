import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { findAll, saveUser, updateUserS } from "../services/userService";
import {
  addUser,
  loadingUsers,
  updateUser,
} from "../store/slices/users/usersSlice";
import { initialUserForm } from "../store/slices/users/usersSlice";
import Swal from "sweetalert2";

export const useUsers = () => {
  const { users } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const result = await findAll();
      console.log(result);
      dispatch(loadingUsers(result.data));
    } catch (error) {
      console.log(error);
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
      throw error;
    }
  };

  return {
    getUsers,
    users,
    initialUserForm,
    handlerAddUser,
  };
};