/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { CalendarioEntrenamiento } from "../components/CalendarioEntrenamiento";

export const EntrenamientoPage = () => {
  const { id } = useParams();
  return <CalendarioEntrenamiento></CalendarioEntrenamiento>;
};
