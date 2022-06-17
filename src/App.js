import React, { useState } from 'react';
import ThemeProvider from '@mui/system/ThemeProvider';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import AboutPage from './AboutPage';
import CodeGroupsPage from './CodeGroupsPage';
import CodeGroupPage from './CodeGroupPage';
import ErrorBoundary from './ErrorBoundary';
import NavBar from './NavBar';
import Navigation from './Navigation';
import HomePage from './HomePage';
import theme from './theme';

function App() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
      <BrowserRouter basename="/ptcgo-scanner">
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

          <NavBar 
            theme={theme}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setSnackbarText={setSnackbarText}
          />
          <Navigation theme={theme} drawerOpen={drawerOpen} />
          <Box sx={{ flexGrow: '1', pb: 7}}>
            <Toolbar />
            <Routes>
              <Route exact path="/" element={<HomePage activeGroup={activeGroup} setActiveGroup={setActiveGroup} />} />
              <Route exact path="/codes" element={<CodeGroupsPage />} />
              <Route path="/codes/:groupId" element={<CodeGroupPage setActiveGroup={setActiveGroup} setSnackbarText={setSnackbarText} />} />
              <Route exact path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Snackbar
              open={!!snackbarText}
              autoHideDuration={3000}
              onClose={() => setSnackbarText(null)}
              message={snackbarText}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => setSnackbarText(null)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          </Box>
        </Box>
      </BrowserRouter>
      </ErrorBoundary>     
    </ThemeProvider>
  );
}

export default App;
