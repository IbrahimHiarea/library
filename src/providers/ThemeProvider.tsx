import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  type Theme,
} from "@mui/material/styles";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem("theme") as ThemeMode) || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme: Theme = useMemo(() => {
    const palette = {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
        light: mode === "light" ? "#42a5f5" : "#e3f2fd",
        dark: mode === "light" ? "#1565c0" : "#42a5f5",
        contrastText: "#fff",
      },
      secondary: {
        main: mode === "light" ? "#9c27b0" : "#ce93d8",
        light: mode === "light" ? "#ba68c8" : "#f3e5f5",
        dark: mode === "light" ? "#7b1fa2" : "#ab47bc",
        contrastText: "#fff",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
        secondary: mode === "light" ? "#555" : "#ccc",
      },
      success: {
        main: mode === "light" ? "#4caf50" : "#81c784",
      },
      error: {
        main: mode === "light" ? "#f44336" : "#e57373",
      },
      warning: {
        main: mode === "light" ? "#ff9800" : "#ffb74d",
      },
      info: {
        main: mode === "light" ? "#2196f3" : "#64b5f6",
      },
    };

    return createTheme({ palette });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeMode must be used within ThemeProvider");
  return context;
};
