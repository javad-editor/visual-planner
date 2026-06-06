import * as Icons from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../../ui/AppText";

interface TimelineCardProps {
  title: string;
  duration: string;
  themeColorClass: string;
  isActive: boolean;
  isCompleted: boolean;
  iconName?: string;
  onPress?: () => void;
}

export function TimelineCard({ 
  title, 
  duration, 
  themeColorClass, 
  isActive, 
  isCompleted, 
  iconName = "Briefcase", 
  onPress 
}: TimelineCardProps) {
  
  const cardOpacity = isCompleted ? "opacity-40" : (isActive ? "opacity-100 shadow-md" : "opacity-90");
  const IconComponent = (Icons as any)[iconName] || Icons.Briefcase;

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress}
      className={`w-full p-4 rounded-2xl ${themeColorClass} ${cardOpacity}`}
    >
      <View className="flex-row items-center justify-between mb-1">
        <AppText className={`text-white font-bold text-lg flex-1 ${isCompleted ? 'line-through' : ''}`}>
          {title}
        </AppText>
        
        <View className="bg-white/20 p-2 rounded-xl ms-3">
          <IconComponent size={20} color="#ffffff" strokeWidth={2.5} />
        </View>
      </View>
      
      <AppText className="text-white opacity-80 text-sm">
        {duration}
      </AppText>
    </TouchableOpacity>
  );
}