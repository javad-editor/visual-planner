import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    // This wrapper enables native swiping across the entire app
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="add-task" 
          options={{ 
            presentation: 'modal',
            title: 'New Task',
            headerShown: true
          }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}