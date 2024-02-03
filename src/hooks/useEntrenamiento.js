import { useDispatch, useSelector } from "react-redux";
import {
  findAllByDate,
  findDaysOfMonthWithTraining,
} from "../services/entrenamientoService";
import { loadingDays } from "../store/slices/entrenamiento/entrenamentoSlice";

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
  return {
    getDaysForDate,
    days,
    getEntrenamientosByDate,
  };
};
