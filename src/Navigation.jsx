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

import { Link, useLocation } from 'react-router-dom';
import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function Navigation() {
  const [value, setValue] = useState(0);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      setValue(0);
    }
    if (location.pathname === '/about') {
      setValue(2);
    }
    if (location.pathname.startsWith('/codes')) {
      setValue(1);
    }
  }, [location, setValue])

  const useNavRail = useMediaQuery(theme.breakpoints.up('sm'));

  if (useNavRail) {
    const width = theme.spacing(8);
    const actions = [
      {label: 'Scan', icon: <QrCodeScannerIcon />, to: '/'},
      {label: 'Codes', icon: <FormatListBulletedIcon />, to: '/codes'},
      {label: 'About', icon: <InfoIcon />, to: '/about'}
    ];

    return (
      <Paper
        sx={{
          width,
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`
        }}
        elevation={0}
      >
        <Toolbar />
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            width,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            position: 'fixed'
          }}
        >
          {actions.map((action, index) => (
            <BottomNavigationAction
              sx={{
                padding: '12px 0px',
                minWidth: '40px'
              }}
              key={action.label}
              label={value === index ? action.label : ''}
              icon={action.icon}
              component={Link}
              to={action.to}
            />
          ))}
        </BottomNavigation>
      </Paper>
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