import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { ColorPickerRing } from "../src/components/features/TaskForm/ColorPickerRing";
import { IconSelectorGrid } from "../src/components/features/TaskForm/IconSelectorGrid";
import { AppButton } from "../src/components/ui/AppButton";
import { AppInput } from "../src/components/ui/AppInput";
import { Task, useTaskStore } from "../src/store/useTaskStore";

export default function AddTaskScreen() {
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [timeString, setTimeString] = useState("");
  const [duration, setDuration] = useState("");
  const [theme, setTheme] = useState<Task["theme"]>("blue");
  const [iconName, setIconName] = useState("Briefcase");

  const handleSave = () => {
    if (!title || !timeString || !duration) return;

    addTask({
      title,
      timeString,
      durationMinutes: parseInt(duration, 10),
      theme,
      iconName,
    });

    router.back();
  };

  return (
    <ScrollView 
      className="flex-1 bg-slate-50 px-6 pt-6" 
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <AppInput 
        label="Task Title" 
        placeholder="e.g., Deep Work" 
        value={title}
        onChangeText={setTitle}
      />
      
      <View className="flex-row gap-x-4">
        <View className="flex-1">
          <AppInput 
            label="Start Time" 
            placeholder="09:00" 
            value={timeString}
            onChangeText={setTimeString}
            keyboardType="numbers-and-punctuation"
          />
        </View>
        <View className="flex-1">
          <AppInput 
            label="Duration (Min)" 
            placeholder="45" 
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
        </View>
      </View>

      <IconSelectorGrid selectedIcon={iconName} onSelect={setIconName} />
      <ColorPickerRing selectedTheme={theme} onSelect={setTheme} />

      <AppButton 
        title="Create Task" 
        onPress={handleSave} 
        className="mt-4"
      />
    </ScrollView>
  );
}