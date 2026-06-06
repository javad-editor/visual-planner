import * as Haptics from "expo-haptics";
import { TouchableOpacity } from "react-native";
import Reanimated, { Extrapolation, interpolate, runOnJS, SharedValue, useAnimatedReaction, useAnimatedStyle } from "react-native-reanimated";

interface SwipeActionProps {
  dragX: SharedValue<number>;
  onDelete?: () => void;
}

export function SwipeAction({ dragX, onDelete }: SwipeActionProps) {
  // Fire success haptic when the user actually taps the delete button
  const handleDeletePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onDelete?.();
  };

  // Watch the swipe gesture. Fire a light haptic tap exactly when the user 
  // crosses the visual threshold (-60px), giving them tactile feedback.
  useAnimatedReaction(
    () => Math.abs(dragX.value) > 60,
    (isOverThreshold, wasOverThreshold) => {
      if (isOverThreshold && !wasOverThreshold) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  );

  const animatedTextStyle = useAnimatedStyle(() => {
    // Math.abs perfectly neutralizes the directional math, making this 
    // interpolation completely bulletproof for both LTR and RTL layouts.
    const scale = interpolate(
      Math.abs(dragX.value),
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity 
      onPress={handleDeletePress} 
      // Replaced 'ml-4' and 'pr-6' with logical 'ms-4' and 'pe-6'
      className="bg-rose-500 justify-center items-end rounded-2xl mb-4 mt-1 w-24 pe-6 ms-4"
    >
      <Reanimated.Text style={animatedTextStyle} className="text-white font-bold">
        Delete
      </Reanimated.Text>
    </TouchableOpacity>
  );
}