import { View } from "react-native";

interface TimelineSpineProps {
  isActive: boolean;
  isCompleted: boolean;
  isFirst: boolean;
  isLast: boolean;
  themeColorClass: string;
}

export function TimelineSpine({ isActive, isCompleted, isFirst, isLast, themeColorClass }: TimelineSpineProps) {
  const dotRing = isActive ? "ring-4 ring-blue-100 scale-125" : "ring-4 ring-slate-50";
  const dotColor = isCompleted ? "bg-slate-300" : themeColorClass;
  const lineColor = isCompleted ? "bg-slate-100" : "bg-slate-200";

  return (
    <View className="w-8 items-center">
      <View className={`w-0.5 flex-1 ${lineColor} ${isFirst ? 'opacity-0' : ''}`} />
      <View className={`w-3 h-3 rounded-full ${dotColor} my-1 transition-all ${dotRing}`} />
      <View className={`w-0.5 flex-1 ${lineColor} ${isLast ? 'opacity-0' : ''}`} />
    </View>
  );
}