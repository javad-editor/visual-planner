import { TouchableOpacity, View } from "react-native";
import { AppText } from "../ui/AppText";

interface TimelineNodeProps {
  title: string;
  timeString: string;
  duration: string;
  theme?: "blue" | "emerald" | "amber" | "rose";
  isFirst?: boolean;
  isLast?: boolean;
  isActive?: boolean;     // NEW: Highlights the current task
  isCompleted?: boolean;  // NEW: Dims past tasks
  onPress?: () => void;   // NEW: Makes the card tappable
}

export function TimelineNode({ 
  title, 
  timeString, 
  duration, 
  theme = "blue", 
  isFirst = false, 
  isLast = false,
  isActive = false,
  isCompleted = false,
  onPress
}: TimelineNodeProps) {
  
  const themeColors = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500"
  };

  const cardColor = themeColors[theme];

  // Visual logic for the timeline dot
  const dotRing = isActive ? "ring-4 ring-blue-100 scale-125" : "ring-4 ring-slate-50";
  const dotColor = isCompleted ? "bg-slate-300" : cardColor;

  // Visual logic for the card
  const cardOpacity = isCompleted ? "opacity-40" : (isActive ? "opacity-100 shadow-md" : "opacity-90");

  return (
    <View className="flex-row w-full min-h-[90px]">
      {/* 1. Time Column */}
      <View className="w-16 items-center pt-3">
        <AppText className={`text-xs font-bold ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
          {timeString}
        </AppText>
      </View>

      {/* 2. Timeline Line & Dot Column */}
      <View className="w-8 items-center">
        <View className={`w-0.5 flex-1 ${isCompleted ? 'bg-slate-100' : 'bg-slate-200'} ${isFirst ? 'opacity-0' : ''}`} />
        
        {/* The dynamic dot */}
        <View className={`w-3 h-3 rounded-full ${dotColor} my-1 transition-all ${dotRing}`} />
        
        <View className={`w-0.5 flex-1 ${isCompleted ? 'bg-slate-100' : 'bg-slate-200'} ${isLast ? 'opacity-0' : ''}`} />
      </View>

      {/* 3. Task Card Column (Now Tappable) */}
      <View className="flex-1 pb-4 pt-1 pe-4">
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={onPress}
          className={`w-full p-4 rounded-2xl ${cardColor} ${cardOpacity}`}
        >
          <AppText 
            className={`text-white font-bold text-lg mb-1 ${isCompleted ? 'line-through' : ''}`}
          >
            {title}
          </AppText>
          <AppText className="text-white opacity-80 text-sm">
            {duration}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}