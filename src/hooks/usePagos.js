/* eslint-disable no-useless-catch */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findAll,
  findAllPlan,
  getDifferenceMonthCurrentAndBefore,
  getLatestPayments,
  getTotalEntry,
  getTotalEntryByMonthAndYearBefore,
  getTotalEntryByMonthAndYearCurrent,
  savePago,
} from "../services/pagoService";
import {
  loadingPagos,
  initialPayForm,
  addPago,
} from "../store/slices/pagos/pagoSlice";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

export const usePagos = () => {
  const { pagos } = useSelector((state) => state.pagos);
  const { handlerLogout } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getPagos = async () => {
    try {
      const res = await findAll();
      dispatch(loadingPagos(res.data));
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
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
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getOverviewBudget = async () => {
    try {
      const res = await getDifferenceMonthCurrentAndBefore();
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getOverviewTotalCustomers = async () => {
    try {
      const res = await getTotalEntry();
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getOverviewSalesYearCurrent = async () => {
    try {
      const res = await getTotalEntryByMonthAndYearCurrent();
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getOverviewSalesYearBefore = async () => {
    try {
      const res = await getTotalEntryByMonthAndYearBefore();
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getOverviewNewPayments = async () => {
    try {
      const res = await getLatestPayments();
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  return {
    pagos,
    getPagos,
    initialPayForm,
    getPlanes,
    handlerAddPago,
    getOverviewBudget,
    getOverviewTotalCustomers,
    getOverviewSalesYearCurrent,
    getOverviewSalesYearBefore,
    getOverviewNewPayments,
  };
};
