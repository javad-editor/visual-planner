import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  className?: string;
}

export function AppText({ className = "", children, ...props }: AppTextProps) {
  return (
    <Text 
      // 'text-start' dynamically aligns text to the right in RTL, and left in LTR
      className={`text-base text-slate-800 text-start ${className}`} 
      {...props}
    >
      {children}
    </Text>
  );
}