import { Tabs } from "expo-router";
import { BarChart3, CalendarClock, Settings } from "lucide-react-native";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

// Atomic Reanimated Icon Component
function AnimatedTabIcon({ focused, IconComponent }: { focused: boolean, IconComponent: any }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    // Spring physics for the pop effect, timing for the color fade
    scale.value = withSpring(focused ? 1.2 : 1, { damping: 12, mass: 0.8 });
    opacity.value = withTiming(focused ? 1 : 0.5, { duration: 200 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle} className="items-center justify-center pt-2">
      <IconComponent 
        size={24} 
        color={focused ? "#3b82f6" : "#64748b"} // Blue when active, Slate when inactive
        strokeWidth={focused ? 2.5 : 2}
      />
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f1f5f9",
          height: 85,
          elevation: 0, // Removes Android shadow for a cleaner look
          // Automatically handles RTL tab ordering
          flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon focused={focused} IconComponent={CalendarClock} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon focused={focused} IconComponent={BarChart3} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon focused={focused} IconComponent={Settings} />,
        }}
      />
    </Tabs>
  );
}