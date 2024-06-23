import { useDispatch, useSelector } from "react-redux";
import { addTest, initialTestForm, loadingTests, onCloseForm, onOpenForm, removeTest } from "../store/slices/test/testSlice";
import { useAuth } from "./useAuth";
import { deleteTest, findAll, saveTest } from "../services/testService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getUserTestAuth, getUserTestByIdTest, saveUserTest } from "../services/usertestService";
import { addUserTest, loadingUserTest } from "../store/slices/test/usertestSlice";

export const useTests = () => {
  const { tests, visibleForm, testSelected } = useSelector((state) => state.tests);

  const { usertests } = useSelector((state) => state.usertests);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handlerLogout } = useAuth();

  const getTests = async () => {
    try {
      const res = await findAll();
      dispatch(loadingTests(res.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerAddTest = async (test) => {
    try {
      const res = await saveTest(test);
      dispatch(addTest(res.data));

      Swal.fire("Test Creado", "El test ha sido creado con éxito", "success");
      handlerCloseForm();
      navigate("/tests");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerDeleteTest = async (id) => {
    Swal.fire({
      title: "¿Esta seguro que desea eliminar?",
      text: "¡Cuidado el test sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTest(id);
          dispatch(removeTest(id));
          Swal.fire("!Test Eliminado!", "El test ha sido eliminado con exito", "success");
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  const handlerCloseForm = () => {
    dispatch(onCloseForm());
  };
  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  //UserTest
  const handlerSaveUserTest = async (usuarioTest) => {
    try {
      const res = await saveUserTest(usuarioTest);
      dispatch(addUserTest(res.data));
      Swal.fire("Resultado guardado", "El resultado ha sido guardado satisfactoriamente", "success");
      navigate("/test/my-results");
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getUserTest = async () => {
    try {
      const res = await getUserTestAuth();
      dispatch(loadingUserTest(res.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getResultTestById = async (id) => {
    try {
      return await getUserTestByIdTest(id);
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  return {
    initialTestForm,
    tests,
    visibleForm,
    testSelected,
    handlerAddTest,
    handlerOpenForm,
    handlerCloseForm,
    getTests,
    handlerDeleteTest,
    usertests,
    handlerSaveUserTest,
    getUserTest,
    getResultTestById,
  };
};
