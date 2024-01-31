/* eslint-disable no-useless-catch */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findAll, findAllPlan, savePago } from "../services/pagoService";
import {
  loadingPagos,
  initialPayForm,
  addPago,
} from "../store/slices/pagos/pagoSlice";
import Swal from "sweetalert2";

export const usePagos = () => {
  const { pagos } = useSelector((state) => state.pagos);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getPagos = async () => {
    try {
      const res = await findAll();
      dispatch(loadingPagos(res.data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getPlanes = async () => {
    return await findAllPlan();
  };

  const handlerAddPago = async (pago) => {
    try {
      const res = await savePago(pago);
      dispatch(addPago(res.data));

      Swal.fire("Pago Creado", "El pago ha sido creado con exito!", "success");

      navigate("/payments");
    } catch (error) {
      throw error;
    }
  };

  return {
    pagos,
    getPagos,
    initialPayForm,
    getPlanes,
    handlerAddPago,
  };
};
