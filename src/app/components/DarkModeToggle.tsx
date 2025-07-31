// src/components/DarkModeToggle.tsx
"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Switch checked={theme === "dark"} onCheckedChange={val => setTheme(val ? "dark" : "light")} />
      <span className="text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
    </div>
  );
};
