import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme } from 'react-native-paper';

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
    lightGray: 'lightgray',
    darkBlue: '#906FE7',
    pieBlue: '#9b59b6',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#469BF8',
    primaryLight: '#469BF820',
    blueLight: '#469BF875',
    secondary: 'gray',
    white: '#FFFFFF',
    black: '#000029',
    lightGray: 'lightgray',
    darkBlue: '#906FE7',
    pieBlue: '#9b59b6',
  },
};
