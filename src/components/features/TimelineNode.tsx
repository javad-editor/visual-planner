import { View } from "react-native";
import { AppText } from "../ui/AppText";

interface TimelineNodeProps {
  title: string;
  timeString: string;
  duration: string;
  theme?: "blue" | "emerald" | "amber" | "rose";
  isFirst?: boolean;
  isLast?: boolean;
}

export function TimelineNode({ 
  title, 
  timeString, 
  duration, 
  theme = "blue", 
  isFirst = false, 
  isLast = false 
}: TimelineNodeProps) {
  
  // Safe-mapping colors for NativeWind's static analysis
  const themeColors = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500"
  };

  const cardColor = themeColors[theme];

  return (
    <View className="flex-row w-full min-h-[90px]">
      {/* 1. Time Column */}
      <View className="w-16 items-center pt-3">
        <AppText className="text-xs font-bold text-slate-500">{timeString}</AppText>
      </View>

      {/* 2. Timeline Line & Dot Column */}
      <View className="w-8 items-center">
        {/* Top Line (Hidden if first item) */}
        <View className={`w-0.5 flex-1 bg-slate-200 ${isFirst ? 'opacity-0' : ''}`} />
        
        {/* The Node Dot */}
        <View className={`w-3 h-3 rounded-full ${cardColor} my-1 ring-4 ring-slate-50`} />
        
        {/* Bottom Line (Hidden if last item) */}
        <View className={`w-0.5 flex-1 bg-slate-200 ${isLast ? 'opacity-0' : ''}`} />
      </View>

      {/* 3. Task Card Column */}
      <View className="flex-1 pb-4 pt-1 pe-4">
        {/* Notice we use opacity to make the background softer while keeping text sharp */}
        <View className={`w-full p-4 rounded-2xl ${cardColor} opacity-95 shadow-sm`}>
          <AppText className="text-white font-bold text-lg mb-1">{title}</AppText>
          <AppText className="text-white opacity-80 text-sm">{duration}</AppText>
        </View>
      </View>
    </View>
  );
}