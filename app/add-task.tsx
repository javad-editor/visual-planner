import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { AppButton } from "../src/components/ui/AppButton";
import { AppInput } from "../src/components/ui/AppInput";
import { AppText } from "../src/components/ui/AppText";
import { Task, useTaskStore } from "../src/store/useTaskStore";

export default function AddTaskScreen() {
  const addTask = useTaskStore((state) => state.addTask);

  // Local state for the form
  const [title, setTitle] = useState("");
  const [timeString, setTimeString] = useState("");
  const [duration, setDuration] = useState("");
  const [theme, setTheme] = useState<Task["theme"]>("blue");

  const handleSave = () => {
    // Basic validation
    if (!title || !timeString || !duration) return;

    addTask({
      title,
      timeString,
      durationMinutes: parseInt(duration, 10),
      theme,
    });

    // Close the modal and return to the timeline
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 px-6 pt-6">
      <AppInput 
        label="Task Title" 
        placeholder="e.g., Deep Work" 
        value={title}
        onChangeText={setTitle}
      />
      
      <AppInput 
        label="Start Time (HH:MM)" 
        placeholder="09:00" 
        value={timeString}
        onChangeText={setTimeString}
        keyboardType="numbers-and-punctuation"
      />
      
      <AppInput 
        label="Duration (Minutes)" 
        placeholder="e.g., 45" 
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      {/* Theme Selector */}
      <View className="mb-8">
        <AppText className="text-slate-600 font-semibold mb-2 text-sm">Theme Color</AppText>
        <View className="flex-row gap-x-4">
          {(["blue", "emerald", "amber", "rose"] as const).map((color) => (
            <AppButton
              key={color}
              title="" // Empty title, we just want the colored circle
              className={`w-12 h-12 rounded-full ${theme === color ? 'ring-4 ring-offset-2 ring-slate-300' : ''}`}
              style={{ backgroundColor: color === 'blue' ? '#3b82f6' : color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#f43f5e' }}
              onPress={() => setTheme(color)}
            />
          ))}
        </View>
      </View>

      <AppButton 
        title="Create Task" 
        onPress={handleSave} 
      />
    </ScrollView>
  );
}