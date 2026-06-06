import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      {/* Our main timeline screen. We hide the default header to use our custom one. */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      
      {/* Our new Add Task screen. We tell the native OS to present this as a modal. */}
      <Stack.Screen 
        name="add-task" 
        options={{ 
          presentation: 'modal',
          title: 'New Task',
          headerShown: true // We'll let Expo handle the close button for this one
        }} 
      />
    </Stack>
  );
}