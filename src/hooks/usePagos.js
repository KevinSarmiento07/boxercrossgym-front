import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findAll, findAllPlan } from "../services/pagoService";
import { loadingPagos, initialPayForm } from "../store/slices/pagos/pagoSlice";

export const usePagos = () => {
  const { pagos } = useSelector((state) => state.pagos);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getPagos = async () => {
    try {
      const res = await findAll();
      console.log(res);
      dispatch(loadingPagos(res.data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getPlanes = async () => {
    return await findAllPlan();
  };

  return {
    pagos,
    getPagos,
    initialPayForm,
    getPlanes,
  };
};
