import { Href, router } from "expo-router";
import { I18nManager, ScrollView, View } from "react-native";
import { TimelineNode } from "../src/components/features/TimelineNode";
import { AppButton } from "../src/components/ui/AppButton";
import { AppText } from "../src/components/ui/AppText";
import { useTaskStore } from "../src/store/useTaskStore";
import { formatDuration, getTaskStatus } from "../src/utils/timeEngine";

// Architecturally forcing RTL at the root level to ensure all 
// logical properties (start/end) map correctly for Arabic/Persian testing.
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function Home() {
  // Extracting only the array to prevent unnecessary re-renders
  const tasks = useTaskStore((state) => state.tasks);

  // Trigger the native stack modal
  const handleOpenModal = () => {
    router.push("/add-task" as Href);
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Top Navigation Header */}
      <View className="px-6 pt-16 pb-6 bg-white border-b border-slate-200 shadow-sm flex-row justify-between items-center">
        <View>
          <AppText className="text-3xl font-black text-slate-900">Today</AppText>
          <AppText className="text-slate-500 mt-1">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"} Scheduled
          </AppText>
        </View>
        
        {/* Action Button */}
        <AppButton 
          title="+ Add Task" 
          onPress={handleOpenModal} 
          className="py-2 px-4 rounded-lg"
        />
      </View>

      {/* The Dynamic Timeline */}
      <ScrollView className="flex-1 pt-6">
        {tasks.map((task, index) => {
          // The Brain: Evaluating real-time status dynamically against the system clock
          const status = getTaskStatus(task.timeString, task.durationMinutes);
          
          return (
            <TimelineNode 
              key={task.id}
              timeString={task.timeString} 
              // Convert the integer back to a localized, readable string format
              duration={formatDuration(task.durationMinutes)} 
              title={task.title} 
              theme={task.theme} 
              isFirst={index === 0} 
              isLast={index === tasks.length - 1}
              // The Muscle: Applying the computed visual state
              isCompleted={status === "completed"}
              isActive={status === "active"}
              onPress={() => console.log(`Opening details for task ID: ${task.id}`)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}