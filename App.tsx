import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { FavoritesProvider } from './src/store/FavoritesContext';
import { PlayerProvider } from './src/store/PlayerContext';
import { colors } from './src/theme';
import { StatusBar } from 'react-native';

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.primary,
    text: colors.text,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <PlayerProvider>
          <NavigationContainer theme={theme}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.background}
            />
            <RootNavigator />
          </NavigationContainer>
        </PlayerProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
