import { useDispatch, useSelector } from "react-redux";
import {
  findAllByDate,
  findDaysOfMonthWithTraining,
  saveEntrenamiento,
} from "../services/entrenamientoService";
import {
  initialEntrenamiento,
  loadBloques,
  initialEntrenamientoForm,
  addEntrenamiento,
} from "../store/slices/entrenamiento/entrenamentoSlice";

export const useEntrenamiento = () => {
  const { days } = useSelector((state) => state.entrenamientos);
  const dispath = useDispatch();

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
    try {
      const res = await saveEntrenamiento(entrenamiento);
      console.log(res);
      dispath(addEntrenamiento(res.data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return {
    getDaysForDate,
    days,
    getEntrenamientosByDate,
    initialEntrenamiento,
    handleLoadBloque,
    initialEntrenamientoForm,
    handleSaveEntrenamiento,
  };
};
