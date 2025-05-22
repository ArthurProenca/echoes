"use client";
import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  getRandomTheme: () => Theme;
  allThemes: Theme[];
  setAllThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allThemes, setAllThemes] = useState<Theme[]>([]);

  function getRandomTheme() {
    const randomIndex = Math.floor(Math.random() * allThemes.length);

    return allThemes[randomIndex];
  }

  return (
    <ThemeContext.Provider value={{ getRandomTheme, allThemes, setAllThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemesProvider");
  }
  return context;
};
