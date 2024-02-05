import * as React from "react";
import { CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import { Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { NavListDrawer } from "./NavListDrawer";
import { Button } from "@mui/material";
import { Group } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PaidIcon from "@mui/icons-material/Paid";
import AddCardIcon from "@mui/icons-material/AddCard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useAuth } from "../../hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const drawerWidth = 240;
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
    ],
  },
];

export const NavBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { login, handlerLogout } = useAuth();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Responsive drawer
          </Typography>
          <Button
            onClick={handlerLogout}
            variant="contained"
            color="error"
            sx={{}}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <NavListDrawer
        mobileOpen={mobileOpen}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
        navLinks={navLinks}
      ></NavListDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavBar;
