import * as Haptics from "expo-haptics";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../../ui/AppText";
// Importing specific icons to keep the bundle size small
import { BookOpen, Briefcase, Code, Coffee, Dumbbell, Phone, ShoppingCart, Users } from "lucide-react-native";

interface IconSelectorGridProps {
  selectedIcon: string;
  onSelect: (iconName: string) => void;
}

const availableIcons = [
  { name: "Briefcase", component: Briefcase },
  { name: "Code", component: Code },
  { name: "Coffee", component: Coffee },
  { name: "Dumbbell", component: Dumbbell },
  { name: "BookOpen", component: BookOpen },
  { name: "ShoppingCart", component: ShoppingCart },
  { name: "Phone", component: Phone },
  { name: "Users", component: Users },
];

export function IconSelectorGrid({ selectedIcon, onSelect }: IconSelectorGridProps) {
  const handlePress = (iconName: string) => {
    Haptics.selectionAsync();
    onSelect(iconName);
  };

  return (
    <View className="mb-6">
      <AppText className="text-slate-600 font-semibold mb-3 text-sm">Task Icon</AppText>
      <View className="flex-row flex-wrap gap-3">
        {availableIcons.map((icon) => {
          const isSelected = selectedIcon === icon.name;
          const IconComponent = icon.component;
          
          return (
            <TouchableOpacity
              key={icon.name}
              activeOpacity={0.7}
              onPress={() => handlePress(icon.name)}
              className={`w-14 h-14 rounded-2xl items-center justify-center border ${
                isSelected ? "bg-blue-50 border-blue-500" : "bg-white border-slate-200"
              }`}
            >
              <IconComponent 
                size={24} 
                color={isSelected ? "#3b82f6" : "#64748b"} 
                strokeWidth={isSelected ? 2.5 : 2}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}