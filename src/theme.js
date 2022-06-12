import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6d6d6d', main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
      contrastText: '#ffffff',
    },
  },
});

export default theme;