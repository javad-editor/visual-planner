import { TouchableOpacity } from "react-native";
import { AppText } from "../../ui/AppText";

interface TimelineCardProps {
  title: string;
  duration: string;
  themeColorClass: string;
  isActive: boolean;
  isCompleted: boolean;
  onPress?: () => void;
}

export function TimelineCard({ title, duration, themeColorClass, isActive, isCompleted, onPress }: TimelineCardProps) {
  const cardOpacity = isCompleted ? "opacity-40" : (isActive ? "opacity-100 shadow-md" : "opacity-90");

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress}
      className={`w-full p-4 rounded-2xl ${themeColorClass} ${cardOpacity}`}
    >
      <AppText className={`text-white font-bold text-lg mb-1 ${isCompleted ? 'line-through' : ''}`}>
        {title}
      </AppText>
      <AppText className="text-white opacity-80 text-sm">
        {duration}
      </AppText>
    </TouchableOpacity>
  );
}