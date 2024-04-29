import "../global.css";
import { Slot } from "expo-router";
import { colorScheme, useColorScheme } from "nativewind";
import { Text, TextInput } from "react-native";
import { Stack } from 'expo-router/stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from '@dev-plugins/react-query';

import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";

export default function Layout() {

  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  TextInput.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.maxFontSizeMultiplier = 1.4;
  // @ts-ignore
  TextInput.defaultProps.maxFontSizeMultiplier = 1.4;

  const { colorScheme } = useColorScheme();

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes   
      },
      mutations: {
        onError: (error) => {
          if ("message" in error) {
            console.error(error.message);
          }
        }
      }
    },
  });

  useReactQueryDevTools(client);
  
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
