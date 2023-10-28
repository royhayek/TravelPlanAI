import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme, configureFonts } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

const fontConfig = {
  displaySmall: {
    fontSize: RFValue(36),
    lineHeight: RFValue(44),
  },
  displayMedium: {
    fontSize: RFValue(45),
    lineHeight: RFValue(52),
  },
  displayLarge: {
    fontSize: RFValue(57),
    lineHeight: RFValue(64),
  },
  headlineSmall: {
    fontSize: RFValue(24),
    lineHeight: RFValue(32),
    fontWeight: 'bold',
  },
  headlineMedium: {
    fontSize: RFValue(28),
    lineHeight: RFValue(36),
  },
  headlineLarge: {
    fontSize: RFValue(32),
    lineHeight: RFValue(40),
  },
  titleSmall: {
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
  },
  titleMedium: {
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
    fontWeight: 'bold',
  },
  titleLarge: {
    fontSize: RFValue(22),
    lineHeight: RFValue(28),
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: RFValue(11),
    lineHeight: RFValue(16),
  },
  labelMedium: {
    fontSize: RFValue(12),
    lineHeight: RFValue(16),
  },
  labelLarge: {
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
  },
  bodySmall: {
    fontSize: RFValue(12),
    lineHeight: RFValue(16),
  },
  bodyMedium: {
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
  },
  bodyLarge: {
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
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
    gray: '#808080',
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
    gray: '#A9A9A9',
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
