"use client";
import { createContext, useContext, useState } from "react";

interface DevModeContextType {
  isDevMode: boolean;
  setIsDevMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDevMode, setIsDevMode] = useState<boolean>(false);
  return (
    <DevModeContext.Provider value={{ isDevMode, setIsDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error("useDevMode must be used within a DevModesProvider");
  }
  return context;
};
