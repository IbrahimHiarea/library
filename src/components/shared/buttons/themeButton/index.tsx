import { useThemeMode } from "@providers/ThemeProvider";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { AppButton } from "..";

export const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppButton
      onClick={toggleTheme}
      startIcon={mode === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
      sx={{
        minHeight: "35px",
        minWidth: "35px",
        padding: 0,
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        border: "1px solid",
        borderColor: (theme) => theme.palette.text.secondary,
        borderRadius: "10px",

        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          border: "none",
        },

        "& .MuiButton-startIcon": {
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        "& .MuiButton-endIcon": {
          margin: 0,
        },
      }}
    />
  );
};
