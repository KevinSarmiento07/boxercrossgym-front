/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { deleteEntrenamiento, findAllByDate, findDaysOfMonthWithTraining, saveEntrenamiento, updateEntrenamiento } from "../services/entrenamientoService";
import { initialEntrenamiento, loadBloques, initialEntrenamientoForm, addEntrenamiento, cleanBloques, deleteBloque, loadEntrenamientosByDay } from "../store/slices/entrenamiento/entrenamentoSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useEntrenamiento = () => {
  const { days, entrenamientosByDay } = useSelector((state) => state.entrenamientos);

  const { handlerLogout } = useAuth();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const getDaysForDate = async (date) => {
    try {
      const res = await findDaysOfMonthWithTraining(date);
      //dispath(loadingDays(res.data));
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getEntrenamientosByDate = async (date) => {
    try {
      const res = await findAllByDate(date);
      dispath(loadEntrenamientosByDay(res.data));
      return res.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handleLoadBloque = (bloque) => {
    dispath(loadBloques(bloque));
  };

  const handleSaveEntrenamiento = async (entrenamiento) => {
    let res;
    try {
      if (entrenamiento.entrenamiento.id === 0) {
        res = await saveEntrenamiento(entrenamiento);
        dispath(addEntrenamiento(res.data));
      } else {
        res = await updateEntrenamiento(entrenamiento);
        dispath(addEntrenamiento(res.data));
      }

      Swal.fire("Entrenamiento Guardado", "El entrenamiento ha sido guardado con exito", "success");

      navigate("/");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerDeleteEntrenamiento = async (id) => {
    try {
      await deleteEntrenamiento(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCleanBloques = () => {
    dispath(cleanBloques());
  };

  const handleDeleteBloqueById = (id) => {
    dispath(deleteBloque(id));
  };
  return {
    getDaysForDate,
    days,
    getEntrenamientosByDate,
    initialEntrenamiento,
    handleLoadBloque,
    initialEntrenamientoForm,
    handleSaveEntrenamiento,
    handleCleanBloques,
    handleDeleteBloqueById,
    handlerDeleteEntrenamiento,
  };
};
