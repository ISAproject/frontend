import { createTheme, colors } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue[500],
    },
    secondary: {
      main: colors.teal[900],
    },
    accent: {
      main: colors.grey[50],
    },
  },
  // Add more theme configurations as needed
});

export default theme;
