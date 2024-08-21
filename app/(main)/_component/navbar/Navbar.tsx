"use client"
import { AppBar, Box, Drawer, List, ListItem, ListItemText, Toolbar, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Navhead from "./navhead/Navhead";
import Links from "./links/Links";

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box>
        <Navhead />
        {isMobile ? (
          <>
            <AppBar
              sx={{ top: "80px" }}
              position="fixed"
              className={`bg-mte`}
            >
              <Toolbar variant="dense">
                <Box onClick={toggleDrawer}>☰</Box>
              </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              <List>
                <ListItem onClick={toggleDrawer}>
                  <ListItemText>
                    <Links />
                  </ListItemText>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <AppBar
            sx={{ top: "80px" }}
            position="fixed"
            className={`bg-mte`}
          >
            <Toolbar variant="dense">
              <Links />
            </Toolbar>
          </AppBar>
        )}
      </Box>
    </>
  );
};

export default Navbar;
