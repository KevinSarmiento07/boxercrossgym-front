import { useDispatch, useSelector } from "react-redux";
import { createClase, deleteClaseById, findAllClases, findAllClassEnabled, getBookings, updateClase, updateEnabled } from "../services/clasesService";
import { addClase, loadingClases, initialClaseForm, updateClaseSlice, deleteClase } from "../store/slices/clases/clasesSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

export const useClases = () => {
  const { clases } = useSelector((state) => state.clases);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handlerLogout } = useAuth();

  const getClases = async () => {
    try {
      const res = await findAllClases();
      dispatch(loadingClases(res.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getClassEnabled = async () => {
    try {
      return await findAllClassEnabled();
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddClase = async (clase) => {
    let res;
    try {
      if (clase.id === 0) {
        res = await createClase(clase);
        dispatch(addClase(res.data));
      } else {
        res = await updateClase(clase);
        dispatch(updateClaseSlice(res.data));
      }
      Swal.fire("Horario añadito con éxito", "El horario se agregó correctamente", "success");
      navigate("/class/schedule");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      } else if (error.response && error.response.status == 400) {
        //dispatch(loadingError(error.response.data));
      } else if (error.response && error.response.status == 500 && error.response.data?.error?.includes("constraint")) {
        if (error.response.data?.error?.includes("UK_usuario_horario")) {
          Swal.fire("Error", "Ya existe una clase con el mismo horario y entrenador reigstrada.", "error");
          //dispatch(loadingError({ email: "El correo electronico ya se encuentra registrado en la base de datos" }));
        }
      }
    }
  };

  const handlerUpdateEnabled = async (id) => {
    try {
      const res = await updateEnabled(id);
      dispatch(updateClaseSlice(res.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerDeleteClase = async (id) => {
    try {
      await deleteClaseById(id);
      dispatch(deleteClase(id));

      Swal.fire("Horario Eliminado", "Horario eliminado con exito", "success");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getBookingsData = async () => {
    try {
      const res = await getBookings();
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  return {
    clases,
    getClases,
    getClassEnabled,
    handlerAddClase,
    initialClaseForm,
    handlerUpdateEnabled,
    handlerDeleteClase,
    getBookingsData,
  };
};
