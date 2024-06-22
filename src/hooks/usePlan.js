import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { deletePlanS, initialPlanForm, loadingPlans } from "../store/slices/plans/planSlice";
import { deletePlan, findAllPlan, savePlan } from "../services/planService";
import { addPago } from "../store/slices/pagos/pagoSlice";
import Swal from "sweetalert2";

export const usePlan = () => {
  const { plans } = useSelector((state) => state.plan);
  const { handlerLogout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPlans = async () => {
    try {
      const res = await findAllPlan();
      dispatch(loadingPlans(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddPlan = async (plan) => {
    try {
      const res = await savePlan(plan);
      dispatch(addPago(res.data));

      navigate("/planes");
    } catch (error) {
      if (error.response?.status === 401) {
        handlerLogout();
      }
    }
  };

  const handlerDeletePlan = async (id) => {
    try {
      await deletePlan(id);
      dispatch(deletePlanS(id));
    } catch (error) {
      if (error.response?.status === 401) {
        handlerLogout();
      } else {
        Swal.fire("ERROR", "El plan contiene pagos ya registrados", "error");
        return;
      }
    }
    Swal.fire("Eliminado", "Se ha eliminado el plan correctamente", "success");
  };
  return {
    initialPlanForm,
    getPlans,
    handlerAddPlan,
    plans,
    handlerDeletePlan,
  };
};
