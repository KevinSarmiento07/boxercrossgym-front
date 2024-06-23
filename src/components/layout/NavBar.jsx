/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { NavListDrawer } from "./NavListDrawer";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const NavBar = ({ navLinks = [] }) => {
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
      <ThemeProvider theme={darkTheme}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "black",
          }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              BOXERCROSSGYM APP
            </Typography>
            <Button onClick={handlerLogout} variant="contained" color="error" sx={{}}>
              CERRAR SESIÓN
            </Button>
          </Toolbar>
        </AppBar>

        <NavListDrawer mobileOpen={mobileOpen} handleDrawerTransitionEnd={handleDrawerTransitionEnd} handleDrawerClose={handleDrawerClose} navLinks={navLinks}></NavListDrawer>
      </ThemeProvider>
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
