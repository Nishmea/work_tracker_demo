import { createMuiTheme } from '@material-ui/core/styles';

import primary_hue from '@material-ui/core/colors/teal';
import secondary_hue from '@material-ui/core/colors/yellow';
import confirm_hue from '@material-ui/core/colors/green';
import warning_hue from '@material-ui/core/colors/yellow';
import error_hue from '@material-ui/core/colors/red';
import neutral_hue from '@material-ui/core/colors/blueGrey';

export const palette = {
  //primary: primary_hue[800],
  primary: '#0C3444',
  //secondary: secondary_hue[800],
  secondary: '#C6A94F',
  highlight_primary: primary_hue[50],
  highlight_secondary: secondary_hue[800],
  text_primary: neutral_hue[50],
  text_secondary: neutral_hue[800],
  in: confirm_hue[600],
  'IN': confirm_hue[600],
  out: error_hue[800],
  'OUT': error_hue[800],
  error: error_hue[700],
  warning: warning_hue[600],
  confirm: confirm_hue['A400'],
  affirmative: confirm_hue['A400'],
  white: neutral_hue[50],
  black: neutral_hue[900],
  //background: blueGrey[100],
  //paper: blueGrey[100],
  background: neutral_hue[300],
  paper: neutral_hue[100],
  disabled: neutral_hue[200],
};

export const primary_font = 'Lexend Deca, sans-serif';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: primary_font,
  },
  palette: {
    primary: {
      main: palette.primary,
    },
    secondary: {
      main: palette.secondary,
    },
    error: {
      main: palette.error,
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: palette.background,
      },
    },
    MuiInputBase: {
      root: {
        '&$disabled': {
          color: palette.white,
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: palette.paper,
      },
    },
    MuiTableCell: {
      head: {
        fontSize: '1em',
        fontVariant: 'small-caps',
        position: 'sticky',
        top: '0px',
        zIndex: '1',
        color: palette.black,
        backgroundColor: palette.background,
      },
      footer: {
        fontSize: '1em',
        fontVariant: 'small-caps',
        position: 'sticky',
        bottom: '0px',
        zIndex: '1',
        color: palette.black,
        backgroundColor: palette.background,
      },
    },
    MuiTypography: {
      root: {
        fontFamily: primary_font,
      },
      h4: {
        fontSize: '30px',
        fontStyle: 'italic',
        fontWeight: 700,
      },
      h5: {
        fontSize: '20px',
        fontWeight: 500,
      },
      h6: {
        fontSize: '15px',
        fontWeight: 500,
      },
    },
  },
});
