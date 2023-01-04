import { createTheme } from '@mui/material/styles';

export const colors = {
  teal: {
    100: '#d2f4ff',
    200: '#a5e9ff',
    300: '#79ddff',
    400: '#4cd2ff',
    500: '#1fc7ff',
    600: '#199fcc',
    700: '#137799',
    800: '#0c5066',
    900: '#062833',
  },
  green: {
    100: '#d2fff1',
    200: '#a5ffe3',
    300: '#79ffd4',
    400: '#4cffc6',
    500: '#1fffb8',
    600: '#19cc93',
    700: '#13996e',
    800: '#0c664a',
    900: '#063325',
  },
  red: {
    100: '#f8d8d6',
    200: '#f1b0ae',
    300: '#e98985',
    400: '#e2615d',
    500: '#db3a34',
    600: '#af2e2a',
    700: '#83231f',
    800: '#581715',
    900: '#2c0c0a',
  },
  primary: {
    //yellow
    100: '#fff0d2',
    200: '#ffe1a5',
    300: '#ffd279',
    400: '#ffc34c',
    500: '#ffb41f',
    600: '#cc9019',
    700: '#996c13',
    800: '#66480c',
    900: '#332406',
  },
  black: {
    100: '#d6d6d6',
    200: '#adacad',
    300: '#848383',
    400: '#5b595a',
    500: '#323031',
    600: '#282627',
    700: '#1e1d1d',
    800: '#141314',
    900: '#0a0a0a',
  },
};

export const themeSettings = {
  palette: {
    mode: 'dark',
    ...{
      primary: {
        main: colors.primary[500],
      },
      secondary: {
        main: colors.red[500],
      },
      neutral: {
        dark: colors.green[700],
        main: colors.green[500],
        light: colors.green[300],
      },
      background: {
        default: colors.teal[500],
      },
    },
  },
  typography: {
    fontFamily: ['Press Start 2P', 'cursive'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Press Start 2P', 'cursive'].join(','),
      fontSize: 40,
    },
    h2: {
      fontFamily: ['Press Start 2P', 'cursive'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['Sourcse Sans Pro', 'sans-serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['Sourcse Sans Pro', 'sans-serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['Sourcse Sans Pro', 'sans-serif'].join(','),
      fontSize: 16,
    },
    h6: {
      fontFamily: ['Sourcse Sans Pro', 'sans-serif'].join(','),
      fontSize: 14,
    },
  },
};

export const theme = createTheme(themeSettings, []);
