import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  headlineSmall: {
    fontWeight: 'bold',
  },
  titleMedium: {
    fontWeight: 'bold',
  },
  titleLarge: {
    fontWeight: '600',
  },
};

const fonts = configureFonts({ config: fontConfig });

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#469BF8',
    primaryLight: '#469BF820',
    blueLight: '#469BF875',
    secondary: 'gray',
    white: '#FFFFFF',
    black: '#000029',
    background: '#FFFFFF',
    card: '#F9F9F9',
    lightGray: 'lightgray',
    inputBg: '#ECECEC',
    darkBlue: '#906FE7',
    pieBlue: '#9b59b6',
    star: '#FBBC04',
  },
  fonts: {
    ...DefaultTheme.fonts,
    fonts,
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#469BF8',
    primaryLight: '#469BF820',
    blueLight: '#469BF875',
    card: '#F9F9F9',
    secondary: 'gray',
    white: '#FFFFFF',
    black: '#000029',
    lightGray: 'lightgray',
    inputBg: '#ECECEC',
    darkBlue: '#906FE7',
    pieBlue: '#9b59b6',
    star: '#FBBC04',
  },
  fonts: {
    ...DefaultTheme.fonts,
    fonts,
  },
};
