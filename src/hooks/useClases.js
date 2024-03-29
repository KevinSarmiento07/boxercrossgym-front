import { useDispatch, useSelector } from "react-redux";
import { createClase, deleteClaseById, findAllClases, getBookings, updateClase, updateEnabled } from "../services/clasesService";
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
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
    Swal.fire("Horario añadito con éxito", "El horario se agregó correctamente", "success");
    navigate("/class/schedule");
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
    handlerAddClase,
    initialClaseForm,
    handlerUpdateEnabled,
    handlerDeleteClase,
    getBookingsData,
  };
};
