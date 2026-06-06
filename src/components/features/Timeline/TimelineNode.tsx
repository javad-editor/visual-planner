import { I18nManager, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";
import { AppText } from "../../ui/AppText";
import { SwipeAction } from "./SwipeAction";
import { TimelineCard } from "./TimelineCard";
import { TimelineSpine } from "./TimelineSpine";

export interface TimelineNodeProps {
  title: string;
  timeString: string;
  duration: string;
  theme?: "blue" | "emerald" | "amber" | "rose";
  iconName?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
}

const themeColors: Record<NonNullable<TimelineNodeProps["theme"]>, string> = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500"
};

export function TimelineNode({ 
  title, 
  timeString, 
  duration, 
  theme = "blue", 
  iconName,
  isFirst = false, 
  isLast = false,
  isActive = false,
  isCompleted = false,
  onPress,
  onDelete
}: TimelineNodeProps) {
  
  // A strict switch statement guarantees NativeWind extracts the classes
  const getThemeClass = (colorTheme: string) => {
    switch (colorTheme) {
      case "emerald": return "bg-emerald-500";
      case "amber": return "bg-amber-500";
      case "rose": return "bg-rose-500";
      case "blue": 
      default: return "bg-blue-500";
    }
  };

  const themeColorClass = getThemeClass(theme);

  const renderTrailingAction = (progress: SharedValue<number>, dragX: SharedValue<number>) => (
    <SwipeAction dragX={dragX} onDelete={onDelete} />
  );

  return (
    <View className="flex-row w-full min-h-[90px]">
      <View className="w-16 items-center pt-3">
        <AppText className={`text-xs font-bold ${isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
          {timeString}
        </AppText>
      </View>

      <TimelineSpine 
        isActive={isActive} 
        isCompleted={isCompleted} 
        isFirst={isFirst} 
        isLast={isLast} 
        themeColorClass={themeColorClass} 
      />

      <View className="flex-1 pb-4 pt-1 pe-4">
        <ReanimatedSwipeable 
          renderRightActions={I18nManager.isRTL ? undefined : renderTrailingAction}
          renderLeftActions={I18nManager.isRTL ? renderTrailingAction : undefined}
          overshootRight={false}
          overshootLeft={false}
        >
          <TimelineCard 
            title={title}
            duration={duration}
            themeColorClass={themeColorClass}
            isActive={isActive}
            isCompleted={isCompleted}
            iconName={iconName}
            onPress={onPress}
          />
        </ReanimatedSwipeable>
      </View>
    </View>
  );
}