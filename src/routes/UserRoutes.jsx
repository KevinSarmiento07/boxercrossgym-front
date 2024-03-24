import { Navigate, Route, Routes } from "react-router-dom";
import { UserPage } from "../usuarios/pages/UserPage";
import { RegisterPage } from "../usuarios/pages/RegisterPage";
import NavBar from "../components/layout/NavBar";
import { PagoPage } from "../pagos/pages/PagoPage";
import { PagoRegisterPage } from "../pagos/pages/PagoRegisterPage";
import { EntrenamientoPage } from "../entrenamientos/pages/EntrenamientoPage";
import { EntrenamientoRegisterPage } from "../entrenamientos/pages/EntrenamientoRegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HorarioPage } from "../horarios/pages/HorarioPage";
import { HorarioAsistenciaPage } from "../horarios/pages/HorarioAsistenciaPage";
import { Group } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PaidIcon from "@mui/icons-material/Paid";
import AddCardIcon from "@mui/icons-material/AddCard";
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
import EmailIcon from "@mui/icons-material/Email";
import { EmailPage } from "../emails/pages/EmailPage";
const navLinks = [
  {
    tittle: "Dashboard",
    path: "/Dashboard",
    icon: <DashboardIcon />,
  },
  {
    tittle: "Usuarios",
    path: "",
    icon: <Group />,
    child: [
      {
        tittle: "Usuarios",
        path: "/users",
        icon: <Group />,
      },
      {
        tittle: "Registro",
        path: "/users/register",
        icon: <GroupAddIcon />,
      },
    ],
  },
  {
    tittle: "Finanzas",
    path: "",
    icon: <PaidIcon />,
    child: [
      {
        tittle: "Pagos",
        path: "/payments",
        icon: <PaidIcon />,
      },
      {
        tittle: "Nuevo Pago",
        path: "/payments/register",
        icon: <AddCardIcon />,
      },
    ],
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
        tittle: "Horarios",
        path: "/class/schedule",
        icon: <ScheduleIcon />,
      },
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
    tittle: "Send Email",
    path: "/email",
    icon: <EmailIcon />,
  },
  {
    tittle: "Perfil",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
];
export const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar navLinks={navLinks}></NavBar>}>
          <Route path="/dashboard" element={<DashboardPage></DashboardPage>} />

          <Route path="/class/schedule" element={<HorarioPage></HorarioPage>} />
          <Route path="/class/schedule/:id" element={<HorarioPage></HorarioPage>} />
          <Route path="/class/presence" element={<HorarioAsistenciaPage></HorarioAsistenciaPage>} />
          <Route path="/class/booking" element={<BookingPage />} />
          <Route path="/users" element={<UserPage></UserPage>} />
          <Route path="/users/register" element={<RegisterPage></RegisterPage>} />
          <Route path="/users/edit/:id" element={<RegisterPage></RegisterPage>} />
          <Route path="/payments" element={<PagoPage></PagoPage>} />
          <Route path="/payments/edit/:id" element={<PagoRegisterPage></PagoRegisterPage>} />
          <Route path="/payments/register" element={<PagoRegisterPage></PagoRegisterPage>} />

          <Route path="/training" element={<EntrenamientoPage />} />
          <Route path="/training/edit/:id" element={<EntrenamientoRegisterPage />} />
          <Route path="/training/register" element={<EntrenamientoRegisterPage />} />

          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>

          <Route path="/tests" element={<TestPage />}></Route>
          <Route path="/test/register" element={<TestRegisterPage />} />
          <Route path="/test/my-results" element={<TestResultPage />} />
          <Route path="tests/:id" element={<TestResultGeneralPage />} />

          <Route path="/email" element={<EmailPage />} />

          <Route path="/" element={<Navigate to={"/dashboard"}></Navigate>} />
        </Route>
      </Routes>
    </>
  );
};
