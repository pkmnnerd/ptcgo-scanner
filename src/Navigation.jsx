import React, { useEffect, useState } from 'react'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import Toolbar from '@mui/material/Toolbar';

import { Link } from 'react-router-dom';
import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function Navigation(props) {
  console.log(theme);
  const [value, setValue] = useState(0);

  const useNavRail = useMediaQuery(theme.breakpoints.up('sm'));

  if (useNavRail) {
  const width = theme.spacing(7);
    return (
      <Drawer variant="permanent" 
        sx={{
          width: `calc(${width} + 1px)`,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: `calc(${width} + 1px)`, boxSizing: 'border-box' },
      }}
      >
        <Toolbar />
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{minHeight: '48px'}} component={Link} to="/">
                <ListItemIcon sx={{minWidth: '0px'}}>
                  <QrCodeScannerIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{minHeight: '48px'}} component={Link} to="/codes">
                <ListItemIcon sx={{minWidth: '0px'}}>
                  <FormatListBulletedIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{minHeight: '48px'}} component={Link} to="/about">
                <ListItemIcon sx={{minWidth: '0px'}}>
                  <InfoIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

    );

  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.drawer }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Scan" icon={<QrCodeScannerIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Codes" icon={<FormatListBulletedIcon />} component={Link} to="/codes" />
        <BottomNavigationAction label="About" icon={<InfoIcon />} component={Link} to="/about" />
      </BottomNavigation>
    </Paper>
  )

}