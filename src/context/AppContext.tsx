import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for your context state
type Professional = {
  id: string;
  name: string;
  profession: string;
};

type AppContextType = {
  professionals: Professional[];
  setProfessionals: React.Dispatch<React.SetStateAction<Professional[]>>;
};

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  return (
    <AppContext.Provider value={{ professionals, setProfessionals }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};