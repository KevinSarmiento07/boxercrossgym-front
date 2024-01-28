/* eslint-disable react/prop-types */

import { Box, Collapse } from "@mui/material";
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

  const handleClick = (id) => {
    setOpen({
      ...open,
      [id]: !open[id],
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
          <Toolbar />
          <Divider />
          <List>
            {navLinks.map((item, i) => {
              if (item.child?.length > 0) {
                return (
                  <div key={i}>
                    <ListItemButton onClick={() => handleClick(i)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.tittle} />
                      {open[i] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[i]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.child.map((itemChild, j) => {
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={j}
                              component={NavLink}
                              to={itemChild.path}
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
                <ListItem key={i}>
                  <ListItemButton component={NavLink} to={item.path}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.tittle} />
                  </ListItemButton>
                </ListItem>;
              }
            })}
          </List>
        </nav>
        <Divider />
        <nav>
          <List>{/*Aqui puede ir otra seccion de menus*/}</List>
        </nav>
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
          <Toolbar />
          <Divider />
          <List>
            {navLinks.map((item, i) => {
              if (item.child?.length > 0) {
                return (
                  <div key={i}>
                    <ListItemButton onClick={() => handleClick(i)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.tittle} />
                      {open[i] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[i]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.child.map((itemChild, j) => {
                          return (
                            <ListItemButton
                              sx={{ pl: 4 }}
                              key={j}
                              component={NavLink}
                              to={itemChild.path}
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
                <ListItem key={i}>
                  <ListItemButton component={NavLink} to={item.path}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.tittle} />
                  </ListItemButton>
                </ListItem>;
              }
            })}
          </List>
        </nav>
        <Divider />
        <nav>
          <List>{/*Aqui puede ir otra seccion de menus*/}</List>
        </nav>
      </Drawer>
    </Box>
  );
};
