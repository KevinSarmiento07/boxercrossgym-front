import { useParams } from "react-router-dom";
import { EntrenamientoForm } from "../components/EntrenamientoForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const initialStateEntreno = { id: 0, titulo: "", fecha: "", bloques: [] };
export const EntrenamientoRegisterPage = () => {
  const { id } = useParams();
  console.log(id);
  const { entrenamientosByDay } = useSelector((state) => state.entrenamientos);
  console.log(entrenamientosByDay);
  const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] =
    useState(initialStateEntreno);
  console.log(entrenamientoSeleccionado);
  useEffect(() => {
    if (id) {
      const entrenamientoSelect = entrenamientosByDay.find(
        (item) => item.id == id
      );
      console.log(entrenamientoSelect);
      setEntrenamientoSeleccionado({ ...entrenamientoSelect });
      console.log(entrenamientoSeleccionado);
    }
  }, [id]);
  console.log(entrenamientoSeleccionado);
  return (
    <>
      <EntrenamientoForm
        entrenamientoSeleccionado={entrenamientoSeleccionado}
      ></EntrenamientoForm>
    </>
  );
};
