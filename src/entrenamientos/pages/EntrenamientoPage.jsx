import { useParams } from "react-router-dom";
import { CalendarioEntrenamiento } from "../components/CalendarioEntrenamiento";

export const EntrenamientoPage = () => {
  const { id } = useParams();
  console.log(id);
  return <CalendarioEntrenamiento></CalendarioEntrenamiento>;
};
