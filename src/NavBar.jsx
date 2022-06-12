import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MuiLink from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link, useLocation } from 'react-router-dom';

import db from './db';
import { useLiveQuery } from 'dexie-react-hooks';

import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const pathToTitle = (path) => {
  if (path.match(/\/codes\/.+/)) {
    return 'Scanned codes';
  }
  switch(path) {
    case '/codes':
    case '/codes/':
      return 'Scanned codes';
    case '/about':
    case '/about/':
      return 'About';
    case '/':
    default:
      return 'PTCGO Scanner';
  }
}

export default function NavBar(props) {
  const { activeGroup, setActiveGroup } = props;
  console.log(props);
  const location = useLocation();
  console.log(location);
  const [title, setTitle] = useState('');

  const useDesktopUi = useMediaQuery(theme.breakpoints.up('sm'));

  if ( useDesktopUi || location.pathname === '/') {
    if (activeGroup && !useDesktopUi) {
      return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" sx={{ mr: 2 }} onClick={() => setActiveGroup(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Scan codes</Typography>
          </Toolbar>
        </AppBar>
      );
    }
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{width:"100%"}} align="center">PTCGO Scanner</Typography>
        </Toolbar>
      </AppBar>
    )
  }

  if (location.pathname.match(/\/codes\/.+/)) {
    const groupId = location.pathname.substring(7);
    db.groups.get(parseInt(groupId)).then((group) => {
      setTitle(group.name);
    })
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" sx={{ mr: 2 }} component={Link} to="/codes">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
  )

  }
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6">{pathToTitle(location.pathname)}</Typography>
      </Toolbar>
    </AppBar>
  )
}