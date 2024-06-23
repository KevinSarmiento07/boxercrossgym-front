/* eslint-disable no-useless-catch */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findAll,
  findAllPlan,
  getDifferenceMonthCurrentAndBefore,
  getLastPaymentAuth,
  getLatestPayments,
  getTotalEntry,
  getTotalEntryByMonthAndYearBefore,
  getTotalEntryByMonthAndYearCurrent,
  savePago,
  updatePagoS,
  uploadPhoto,
} from "../services/pagoService";
import { loadingPagos, initialPayForm, addPago, updatePago } from "../store/slices/pagos/pagoSlice";
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
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getPlanes = async () => {
    return await findAllPlan();
  };

  const handlerAddPago = async (pago, fotoSelected) => {
    try {
      if (pago.id == 0) {
        const res = await savePago(pago);
        if (fotoSelected != undefined && fotoSelected != null && fotoSelected?.name?.length > 0) {
          handlerUploadPaymentPhoto(fotoSelected, res.data.id).then(() => {
            getPagos();
          });
        }

        dispatch(addPago(res.data));
      } else {
        await updatePagoS(pago);
        dispatch(updatePago(pago));
      }

      Swal.fire("Pago Creado", "El pago ha sido creado con exito", "success");

      navigate("/payments");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
      if (error.response?.status == 409) {
        Swal.fire("ERROR", "La persona tiene pagos vigentes activos", "error");
      }
    }
  };

  const getOverviewBudget = async () => {
    try {
      const res = await getDifferenceMonthCurrentAndBefore();
      return res.data;
    } catch (error) {
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
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getLastPaymentUserAuth = async () => {
    try {
      return await getLastPaymentAuth();
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerUploadPaymentPhoto = async (archivo, id) => {
    try {
      return await uploadPhoto(archivo, id);
    } catch (error) {
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
    getLastPaymentUserAuth,
    handlerUploadPaymentPhoto,
  };
};
