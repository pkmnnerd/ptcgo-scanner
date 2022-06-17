import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MuiLink from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link, useLocation } from 'react-router-dom';

import CodeGroupMenu from './CodeGroupMenu';

import db from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import { copyCodes } from './common';

import theme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

const pathToTitle = (path) => {
  if (path.match(/\/codes\/.+/)) {
    return 'Scanned codes';
  }
  switch(path) {
    case '/codes':
    case '/codes/':
      return 'Saved codes';
    case '/about':
    case '/about/':
      return 'About';
    case '/':
    default:
      return 'PTCGO Scanner';
  }
}

export default function NavBar(props) {
  const { activeGroup, setActiveGroup, setSnackbarText } = props;
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);

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
    const groupId = parseInt(location.pathname.substring(7));
    db.groups.get(groupId).then((group) => {
      setTitle(group.name);
    })
    const handleCopy = () => {
      copyCodes(groupId);
      setMenuAnchor(null);
      setSnackbarText('Copied');
    }
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" sx={{ mr: 2 }} component={Link} to="/codes">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>{title}</Typography>
          <IconButton color="inherit">
            <EditIcon />
          </IconButton>
          <IconButton color="inherit" onClick={(event) => setMenuAnchor(event.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <CodeGroupMenu
            anchorEl={menuAnchor}
            handleClose={() => setMenuAnchor(null)}
            handleCopy={handleCopy}
            />
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