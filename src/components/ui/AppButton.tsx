import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { AppText } from "./AppText";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  className?: string;
}

export function AppButton({ 
  title, 
  variant = "primary", 
  isLoading = false, 
  className = "", 
  ...props 
}: AppButtonProps) {
  const baseClasses = "flex-row items-center justify-center rounded-xl px-6 py-4";
  const variantClasses = variant === "primary" 
    ? "bg-blue-600 active:bg-blue-700" 
    : "bg-slate-200 active:bg-slate-300";
    
  const textClasses = variant === "primary" 
    ? "text-white font-bold" 
    : "text-slate-900 font-semibold";

  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "black"} />
      ) : (
        <AppText className={textClasses}>{title}</AppText>
      )}
    </TouchableOpacity>
  );
}