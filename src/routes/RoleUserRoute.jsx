import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import { DashboardUserPage } from "../roleUser/pages/DashboardUserPage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { EntrenamientoPage } from "../entrenamientos/pages/EntrenamientoPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ProfilePage } from "../pages/ProfilePage";
import { BookingPage } from "../booking/pages/BookingPage";
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
        tittle: "Reserva",
        path: "/class/booking",
        icon: <PermContactCalendarIcon />,
      },
    ],
  },
  {
    tittle: "Perfil",
    path: "/profile",
    icon: <AccountCircleIcon />,
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
          <Route path="/class/booking" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route></Route>
        </Route>
      </Routes>
    </>
  );
};
