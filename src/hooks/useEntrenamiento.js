/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  findAllByDate,
  findDaysOfMonthWithTraining,
  saveEntrenamiento,
  updateEntrenamiento,
} from "../services/entrenamientoService";
import {
  initialEntrenamiento,
  loadBloques,
  initialEntrenamientoForm,
  addEntrenamiento,
  cleanBloques,
  deleteBloque,
  loadEntrenamientosByDay,
} from "../store/slices/entrenamiento/entrenamentoSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useEntrenamiento = () => {
  const { days, entrenamientosByDay } = useSelector(
    (state) => state.entrenamientos
  );

  const dispath = useDispatch();
  const navigate = useNavigate();
  const getDaysForDate = async (date) => {
    try {
      const res = await findDaysOfMonthWithTraining(date);
      console.log(res);
      //dispath(loadingDays(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getEntrenamientosByDate = async (date) => {
    try {
      const res = await findAllByDate(date);
      dispath(loadEntrenamientosByDay(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleLoadBloque = (bloque) => {
    console.log(bloque);
    dispath(loadBloques(bloque));
  };

  const handleSaveEntrenamiento = async (entrenamiento) => {
    console.log(entrenamiento);
    let res;
    try {
      if (entrenamiento.entrenamiento.id === 0) {
        res = await saveEntrenamiento(entrenamiento);
        console.log(res);
        dispath(addEntrenamiento(res.data));
      } else {
        res = await updateEntrenamiento(entrenamiento);
        console.log(res);
        dispath(addEntrenamiento(res.data));
      }

      Swal.fire(
        "Entrenamiento Guardado",
        "El entrenamiento ha sido guardado con exito",
        "success"
      );

      navigate("/users");
    } catch (error) {
      console.log(error);
      throw error;
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
  };
};
