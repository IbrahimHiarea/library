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
import { useLanguage } from "./LanguageProvider"; // import your language context
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

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
  const { direction } = useLanguage();
  const [mode, setMode] = useState<ThemeMode>(
    (localStorage.getItem("theme") as ThemeMode) || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  // Create RTL cache for Emotion
  const cacheRtl = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "muirtl" : "mui",
        stylisPlugins: direction === "rtl" ? [rtlPlugin] : [],
      }),
    [direction]
  );

  const theme: Theme = useMemo(() => {
    const palette = {
      mode,
      primary: {
        main: mode === "light" ? "#ee932b" : "#1d64c9",
        light: mode === "light" ? "#ee932b" : "#1d64c9",
        dark: mode === "light" ? "#875317ff" : "#163969",
        contrastText: "#fff",
      },
      secondary: {
        main: mode === "light" ? "#9c27b0" : "#f4eee1",
        light: mode === "light" ? "#ba68c8" : "#f3e5f5",
        dark: mode === "light" ? "#7b1fa2" : "#ab47bc",
        contrastText: "#fff",
      },
      background: {
        default: mode === "light" ? "#fbf9f4" : "#151d28",
        light: mode === "light" ? "#f5f5f5" : "#2d3643",
        paper: mode === "light" ? "#fff" : "#1f2733",
      },
      text: {
        primary: mode === "light" ? "#1D2530" : "#fff",
        secondary: mode === "light" ? "#1D2530" : "#98a4b3",
      },
      success: {
        main: mode === "light" ? "#1e3335" : "#81c784",
        dark: mode === "light" ? "#81c784" : "#1e3335",
      },
      error: {
        main: mode === "light" ? "#292631" : "#e57373",
        dark: mode === "light" ? "#e57373" : "#292631",
      },
      warning: {
        main: mode === "light" ? "#ffb74d" : "#ffb74d",
      },
      info: {
        main: mode === "light" ? "#2196f3" : "#64b5f6",
      },
    };
    const typography = {
      fontFamily: `"Roboto", "Cairo", sans-serif`,
      h1: { fontFamily: `"Roboto", "Cairo", sans-serif` },
      h2: { fontFamily: `"Roboto", "Cairo", sans-serif` },
      body1: { fontFamily: `"Roboto", "Cairo", sans-serif` },
      button: { fontFamily: `"Roboto", "Cairo", sans-serif` },
    };

    return createTheme({ palette, direction, typography });
  }, [mode, direction]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeMode must be used within ThemeProvider");
  return context;
};
