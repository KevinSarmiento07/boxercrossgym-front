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

const drawerWidth = 240;
const navLinks = [
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
    tittle: "Registro",
    path: "/users/register",
    icon: <GroupAddIcon />,
  },
];

export const NavBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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
          <Button variant="contained" color="error" sx={{}}>
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