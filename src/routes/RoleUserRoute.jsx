import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import { DashboardUserPage } from "../roleUser/pages/DashboardUserPage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { EntrenamientoPage } from "../entrenamientos/pages/EntrenamientoPage";
import { HorarioAsistenciaPage } from "../horarios/pages/HorarioAsistenciaPage";
const navLinks = [
  {
    tittle: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    tittle: "Entrenamiento",
    path: "",
    icon: <FitnessCenterIcon />,
    child: [
      {
        tittle: "Registrados",
        path: "/training",
        icon: <FitnessCenterIcon />,
      },
    ],
  },
  {
    tittle: "Clases",
    path: "",
    icon: <ScheduleIcon />,
    child: [
      {
        tittle: "Horarios",
        path: "/class/schedule",
        icon: <ScheduleIcon />,
      },
      {
        tittle: "Asistencia",
        path: "/class/presence",
        icon: <PermContactCalendarIcon />,
      },
    ],
  },
];
export const RoleUserRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar navLinks={navLinks}></NavBar>}>
          <Route path="/dashboard" element={<DashboardUserPage />}></Route>
          <Route path="/" element={<Navigate to={"/dashboard"}></Navigate>} />
          <Route path="/training" element={<EntrenamientoPage />} />
          <Route path="/class/presence" element={<HorarioAsistenciaPage />} />
          <Route></Route>
        </Route>
      </Routes>
    </>
  );
};
