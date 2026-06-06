import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/* Mounts the entire tab bar interface. We hide the header so the tabs handle their own. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Modals and full-screen overlays sit on top of the tabs */}
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