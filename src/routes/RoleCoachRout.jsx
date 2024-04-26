import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import { EntrenamientoPage } from "../entrenamientos/pages/EntrenamientoPage";
import { EntrenamientoRegisterPage } from "../entrenamientos/pages/EntrenamientoRegisterPage";
import { HorarioAsistenciaPage } from "../horarios/pages/HorarioAsistenciaPage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BookingPage } from "../booking/pages/BookingPage";
import { ProfilePage } from "../pages/ProfilePage";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { TestPage } from "../tests/pages/TestPage";
import { TestRegisterPage } from "../tests/pages/TestRegisterPage";
import { TestResultPage } from "../tests/pages/TestResultPage";
import { TestResultGeneralPage } from "../tests/pages/TestResultGeneralPage";
import { DashboardUserPage } from "../roleUser/pages/DashboardUserPage";
const navLinks = [
  {
    tittle: "Inicio",
    path: "/Dashboard",
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
      {
        tittle: "Nuevo Entrenamiento",
        path: "/training/register",
        icon: <AddIcon />,
      },
    ],
  },
  {
    tittle: "Clases",
    path: "",
    icon: <ScheduleIcon />,
    child: [
      {
        tittle: "Asistencia",
        path: "/class/presence",
        icon: <PermContactCalendarIcon />,
      },
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
export const RoleCoachRout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar navLinks={navLinks}></NavBar>}>
          <Route path="/dashboard" element={<DashboardUserPage />}></Route>

          <Route path="/class/presence" element={<HorarioAsistenciaPage></HorarioAsistenciaPage>} />
          <Route path="/class/booking" element={<BookingPage />} />

          <Route path="/training" element={<EntrenamientoPage />} />
          <Route path="/training/edit/:id" element={<EntrenamientoRegisterPage />} />
          <Route path="/training/register" element={<EntrenamientoRegisterPage />} />

          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>

          <Route path="/tests" element={<TestPage />}></Route>
          <Route path="/test/register" element={<TestRegisterPage />} />
          <Route path="/test/my-results" element={<TestResultPage />} />
          <Route path="tests/:id" element={<TestResultGeneralPage />} />

          <Route path="/" element={<Navigate to={"/dashboard"}></Navigate>} />
        </Route>
      </Routes>
    </>
  );
};
