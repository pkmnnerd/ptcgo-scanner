import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import ThemeProvider from '@mui/system/ThemeProvider';

import { createTheme } from '@mui/material/styles';

import logo from './logo.svg';
import './App.css';

import Scanner from './Scanner';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6f60',
      main: '#e53935',
      dark: '#ab000d',
      contrastText: '#000',
    },
  },
});

function App() {
  return (<ThemeProvider theme={theme}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">PTCGO Scanner</Typography>

      </Toolbar>

    </AppBar>
    <Container sx={{py: '1em'}}>
      <Typography variant="h4" align="left">Scan codes</Typography>
      <Scanner />

    </Container>
  </ThemeProvider>);
}

export default App;
