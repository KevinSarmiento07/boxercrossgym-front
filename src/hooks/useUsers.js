import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { findAll } from "../services/userService";
import { loadingUsers } from "../store/slices/users/usersSlice";

export const useUsers = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

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

  return {
    getUsers,
    users,
  };
};
