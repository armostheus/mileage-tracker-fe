import { createTheme } from '@mui/material/styles';
import { purple, green } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: 'orange'
  }
});

export default theme