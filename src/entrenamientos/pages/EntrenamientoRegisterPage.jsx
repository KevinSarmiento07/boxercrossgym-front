import { useParams } from "react-router-dom";
import { EntrenamientoForm } from "../components/EntrenamientoForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const initialStateEntreno = { id: 0, titulo: "", fecha: "", bloques: [] };
export const EntrenamientoRegisterPage = () => {
  const { id } = useParams();
  const { isAdmin } = useSelector((state) => state.auth);
  const { entrenamientosByDay } = useSelector((state) => state.entrenamientos);
  const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] = useState(initialStateEntreno);
  useEffect(() => {
    if (id) {
      const entrenamientoSelect = entrenamientosByDay.find((item) => item.id == id);
      setEntrenamientoSeleccionado({ ...entrenamientoSelect });
    }
  }, [id]);
  return <>{isAdmin ? <EntrenamientoForm entrenamientoSeleccionado={entrenamientoSeleccionado}></EntrenamientoForm> : ""}</>;
};
