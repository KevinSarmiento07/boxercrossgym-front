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
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { TestPage } from "../tests/pages/TestPage";
import { TestResultPage } from "../tests/pages/TestResultPage";
import { TestResultGeneralPage } from "../tests/pages/TestResultGeneralPage";
const navLinks = [
  {
    tittle: "Inicio",
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
    tittle: "Test",
    path: "",
    icon: <SportsScoreIcon />,
    child: [
      {
        tittle: "Test registrados",
        path: "/tests",
        icon: <FormatListBulletedIcon />,
      },
      {
        tittle: "Mis resultados",
        path: "/test/my-results",
        icon: <ScoreboardIcon />,
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
          <Route path="/tests" element={<TestPage />}></Route>
          <Route path="/test/my-results" element={<TestResultPage />} />
          <Route path="tests/:id" element={<TestResultGeneralPage />} />
          <Route></Route>
        </Route>
      </Routes>
    </>
  );
};
