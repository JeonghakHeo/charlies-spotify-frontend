import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954',
    },
    secondary: {
      main: '#b2b2b2',
    },
    dark: {
      main: '#000',
    },
    white: {
      main: '#fff',
    },
  },
  typography: {
    h1: {
      color: '#fff',
      fontSize: '6.5rem',
      fontWeight: '800',
    },
    h2: {
      color: '#fff',
      fontSize: '1.25rem',
      fontWeight: '800',
    },
    h3: {
      color: '#fff',
      fontSize: '0.8rem',
      letterSpacing: '2px',
    },
    h4: {
      color: '#fff',
      fontSize: '0.8rem',
      fontWeight: '800',
    },
    body1: {
      color: '#fff',
      fontSize: '1rem',
    },
    subtitle1: {
      color: '#b2b2b2',
      fontSize: '1rem',
    },
    body2: {
      color: '#fff',
      fontSize: '0.9rem',
    },
    subtitle2: {
      color: '#b2b2b2',
      fontSize: '0.7rem',
    },
  },
})

export default theme
