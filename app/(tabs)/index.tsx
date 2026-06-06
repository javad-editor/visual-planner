import { Href, router } from "expo-router";
import { I18nManager, ScrollView, View } from "react-native";
import Animated, { FadeOut, LinearTransition } from "react-native-reanimated";
import { TimelineNode } from "../../src/components/features/Timeline/TimelineNode";
import { AppButton } from "../../src/components/ui/AppButton";
import { AppText } from "../../src/components/ui/AppText";
import { useTaskStore } from "../../src/store/useTaskStore";
import { formatDuration, getTaskStatus } from "../../src/utils/timeEngine";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleOpenModal = () => {
    router.push("/add-task" as Href);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-6 pt-16 pb-6 bg-white border-b border-slate-200 shadow-sm flex-row justify-between items-center">
        <View>
          <AppText className="text-3xl font-black text-slate-900">Today</AppText>
          <AppText className="text-slate-500 mt-1">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"} Scheduled
          </AppText>
        </View>
        
        <AppButton 
          title="+ Add Task" 
          onPress={handleOpenModal} 
          className="py-2 px-4 rounded-lg"
        />
      </View>

      <ScrollView className="flex-1 pt-6">
        {tasks.map((task, index) => {
          const status = getTaskStatus(task.timeString, task.durationMinutes);
          
          return (
            <Animated.View 
              key={task.id}
              layout={LinearTransition.springify().damping(14).mass(0.8)}
              exiting={FadeOut.duration(200)}
            >
              <TimelineNode 
                timeString={task.timeString} 
                duration={formatDuration(task.durationMinutes)} 
                title={task.title} 
                theme={task.theme} 
                iconName={task.iconName} // <-- Data passes through here
                isFirst={index === 0} 
                isLast={index === tasks.length - 1}
                isCompleted={status === "completed"}
                isActive={status === "active"}
                onPress={() => console.log(`Opening details for task ID: ${task.id}`)}
                onDelete={() => deleteTask(task.id)}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}