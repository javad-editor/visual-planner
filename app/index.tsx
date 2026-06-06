import { I18nManager, ScrollView, View } from "react-native";
import { TimelineNode } from "../src/components/features/TimelineNode";
import { AppText } from "../src/components/ui/AppText";

// Keeping RTL forced for our UI layout testing phase
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function Home() {
  return (
    <View className="flex-1 bg-slate-50">
      {/* Static Header */}
      <View className="px-6 pt-16 pb-6 bg-white border-b border-slate-200 shadow-sm">
        <AppText className="text-3xl font-black text-slate-900">Today</AppText>
        <AppText className="text-slate-500 mt-1">3 Tasks Remaining</AppText>
      </View>

      {/* Scrollable Timeline */}
      <ScrollView className="flex-1 pt-6">
        <TimelineNode 
          timeString="09:00" 
          duration="45 min" 
          title="Daily Standup" 
          theme="blue" 
          isFirst 
        />
        <TimelineNode 
          timeString="10:00" 
          duration="2 hours" 
          title="Deep Work: React Native Architecture" 
          theme="emerald" 
        />
        <TimelineNode 
          timeString="13:30" 
          duration="30 min" 
          title="Lunch Break" 
          theme="amber" 
          isLast 
        />
      </ScrollView>
    </View>
  );
}