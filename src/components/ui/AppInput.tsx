import { TextInput, TextInputProps, View } from "react-native";
import { AppText } from "./AppText";

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function AppInput({ label, error, className = "", ...props }: AppInputProps) {
  return (
    <View className={`w-full mb-4 ${className}`}>
      <AppText className="text-slate-600 font-semibold mb-2 text-sm">{label}</AppText>
      <TextInput
        // 'text-start' forces RTL text typing direction natively
        className={`bg-white border text-start ${
          error ? 'border-rose-500' : 'border-slate-200'
        } rounded-xl px-4 py-3 text-slate-900 text-base focus:border-blue-500`}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {error && <AppText className="text-rose-500 text-xs mt-1">{error}</AppText>}
    </View>
  );
}