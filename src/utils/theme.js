const colors = {
  blue: {
    100: '#E0F2F5',
    200: '#D4ECF0',
    300: '#BDE7EE',
    400: '#9BF2FF',
    500: '#82EAFA',
    600: '#58E3F8',
    700: '#17D9F6',
    800: '#00C6E3',
    900: '#0095FF',
    1000: '#0099BD',
    1100: '#007FA4',
    1200: '#006583',
  },
  green: {
    100: '#EDFBF0',
    200: '#E5F6E8',
    300: '#C5F1CE',
    400: '#96F9A9',
    500: '#70EB88',
    600: '#5BDD74',
    700: '#4CCA64',
    800: '#38B350',
    900: '#2D9F43',
    1000: '#287E3C',
    1100: '#235C35',
    1200: '#165028',
  },
  yellow: {
    100: '#FFF8ED',
    200: '#FEF3E2',
    300: '#FFEACB',
    400: '#FFE3A6',
    500: '#FFDB8A',
    600: '#FFD373',
    700: '#FFCB58',
    800: '#FFC139',
    900: '#FFB81C',
    1000: '#E8990E',
    1100: '#D07A00',
    1200: '#AF6109',
  },
  red: {
    100: '#FEEEEE',
    200: '#F9E8E8',
    300: '#FAD7D7',
    400: '#FFAFAF',
    500: '#F58787',
    600: '#FB6262',
    700: '#FB4545',
    800: '#DD2929',
    900: '#CC1B1B',
    1000: '#AF1212',
    1100: '#930B0B',
    1200: '#740C0C',
  },
}

const colorTypes = {
  success: colors.green,
  info: colors.blue,
  warning: colors.yellow,
  error: colors.red,
}

const colorKeys = {
  background: 200,
  backgroundLight: 100,
  backgroundDark: 300,
  main: 800,
  mainLight: 700,
  mainDark: 900,
  text: 1100,
}

// props.theme.colors.red[800]
// props.theme.color.types.error[800]
// props.theme.color.types.error[props.theme.color.keys.main]

const lightTheme = {
  colors: {
    ...colors,
    types: colorTypes,
    keys: colorKeys,
  },
}

const darkTheme = {
  colors: {
    ...colors,
    types: colorTypes,
    keys: colorKeys,
  },
}

export default { lightTheme, darkTheme }
