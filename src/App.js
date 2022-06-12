import React, { useState } from 'react';
import ThemeProvider from '@mui/system/ThemeProvider';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { createTheme } from '@mui/material/styles';

import './App.css';

import AboutPage from './AboutPage';
import CodeGroupsPage from './CodeGroupsPage';
import CodeGroupPage from './CodeGroupPage';
import NavBar from './NavBar';
import Navigation from './Navigation';
import HomePage from './HomePage';
import theme from './theme';

function App() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/ptcgo-scanner">
        <Box sx={{ display: 'flex' }}>

          <NavBar 
            theme={theme}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
          <Navigation theme={theme} drawerOpen={drawerOpen} />
          <Box sx={{ flexGrow: '1', pb: 7}}>
            <Toolbar />
            <Routes>
              <Route exact path="/" element={<HomePage activeGroup={activeGroup} setActiveGroup={setActiveGroup} />} />
              <Route exact path="/codes" element={<CodeGroupsPage />} />
              <Route path="/codes/:groupId" element={<CodeGroupPage setActiveGroup={setActiveGroup} />} />
              <Route exact path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;
