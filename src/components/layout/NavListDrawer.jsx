/* eslint-disable react/prop-types */

import { Box, Collapse, TextField } from "@mui/material";
import {
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton,
  Drawer,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const NavListDrawer = ({
  handleDrawerClose,
  mobileOpen,
  handleDrawerTransitionEnd,
  navLinks,
}) => {
  const drawerWidth = 240;
  const [open, setOpen] = useState({});

  const handleClick = (id, name) => {
    console.log(name);
    setOpen({
      [name]: !open[name],
    });
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <nav>
          <Toolbar sx={{ justifyContent: "center" }}>
            <img src="/images/logo.png" style={{ width: 100 }}></img>
          </Toolbar>
          <Divider />
          <List>
            {navLinks.map((item, i) => {
              if (item.child?.length > 0) {
                return (
                  <div key={i}>
                    <ListItemButton onClick={() => handleClick(i, item.tittle)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.tittle} />
                      {open[item.tittle] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={open[item.tittle]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.child.map((itemChild, j) => {
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={j}
                              component={NavLink}
                              to={itemChild.path}
                              onClick={() => setOpen({ [item.title]: !open })}
                            >
                              <ListItemIcon>{itemChild.icon}</ListItemIcon>
                              <ListItemText primary={itemChild.tittle} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                );
              } else {
                return (
                  <ListItem key={i} disablePadding>
                    <ListItemButton component={NavLink} to={item.path}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.tittle} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        </nav>
        <Divider />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <nav>
          <Toolbar sx={{ justifyContent: "center" }}>
            <img src="/images/logo.png" style={{ width: 100 }}></img>
          </Toolbar>
          <Divider />
          <List>
            {navLinks.map((item, i) => {
              if (item.child?.length > 0) {
                return (
                  <div key={i}>
                    <ListItemButton onClick={() => handleClick(i, item.tittle)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.tittle} />
                      {open[item.tittle] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={open[item.tittle]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.child.map((itemChild, j) => {
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={j}
                              component={NavLink}
                              to={itemChild.path}
                              onClick={() => setOpen({ [item.title]: !open })}
                            >
                              <ListItemIcon>{itemChild.icon}</ListItemIcon>
                              <ListItemText primary={itemChild.tittle} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </div>
                );
              } else {
                return (
                  <ListItem key={i} disablePadding>
                    <ListItemButton component={NavLink} to={item.path}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.tittle} />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        </nav>
        <Divider />
      </Drawer>
    </Box>
  );
};
