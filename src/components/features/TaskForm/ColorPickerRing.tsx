import * as Haptics from "expo-haptics";
import { TouchableOpacity, View } from "react-native";
import { Task } from "../../../store/useTaskStore";
import { AppText } from "../../ui/AppText";

interface ColorPickerRingProps {
  selectedTheme: Task["theme"];
  onSelect: (theme: Task["theme"]) => void;
}

export function ColorPickerRing({ selectedTheme, onSelect }: ColorPickerRingProps) {
  const handlePress = (color: Task["theme"]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(color);
  };

  return (
    <View className="mb-6">
      <AppText className="text-slate-600 font-semibold mb-3 text-sm">Theme Color</AppText>
      <View className="flex-row gap-x-4">
        {/* Hardcoding literal strings ensures NativeWind ALWAYS compiles the color */}
        <ColorCircle color="blue" bgClass="bg-blue-500" hex="#3b82f6" selectedTheme={selectedTheme} onPress={handlePress} />
        <ColorCircle color="emerald" bgClass="bg-emerald-500" hex="#10b981" selectedTheme={selectedTheme} onPress={handlePress} />
        <ColorCircle color="amber" bgClass="bg-amber-500" hex="#f59e0b" selectedTheme={selectedTheme} onPress={handlePress} />
        <ColorCircle color="rose" bgClass="bg-rose-500" hex="#f43f5e" selectedTheme={selectedTheme} onPress={handlePress} />
      </View>
    </View>
  );
}

// Atomic sub-component for clean rendering
function ColorCircle({ color, bgClass, hex, selectedTheme, onPress }: any) {
  const isSelected = selectedTheme === color;
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(color)}
      className="items-center justify-center"
    >
      <View 
        className={`w-12 h-12 rounded-full ${bgClass} items-center justify-center`}
        style={{
          borderWidth: isSelected ? 4 : 0,
          borderColor: isSelected ? `${hex}60` : "transparent", // 60 adds a clean alpha transparency
          transform: [{ scale: isSelected ? 1.1 : 1 }]
        }}
      />
    </TouchableOpacity>
  );
}