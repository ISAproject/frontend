
import { createTheme,colors } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.green[500], 
    },
    secondary: {
      main: colors.orange[500], 
    },
  },
  // Add more theme configurations as needed
});

export default theme;
