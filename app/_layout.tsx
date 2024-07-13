import { Stack } from "expo-router";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen   name="index" />
    </Stack>
  );
}
