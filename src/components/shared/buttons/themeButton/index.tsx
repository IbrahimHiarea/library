import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AppButton } from "..";
import { useThemeMode } from "@providers/ThemeProvider";

export const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppButton
      onClick={toggleTheme}
      startIcon={mode === "light" ? <MdLightMode /> : <MdDarkMode />}
      sx={{ minWidth: 40, padding: "6px 12px" }}
    />
  );
};
