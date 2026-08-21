import { createTheme } from '@mui/material/styles';

const dashboardTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c770f0' },
    secondary: { main: '#c95bf5' },
    background: { default: '#0b0b14', paper: '#14142280' },
    success: { main: '#4caf50' }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700 }
      }
    }
  }
});

export default dashboardTheme;
