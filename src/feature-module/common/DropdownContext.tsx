// DropdownContext.tsx
import React, { createContext, useContext, useState } from 'react';

const DropdownContext = createContext({
  activeSubMenu: "",
  setActiveSubMenu: (menu: string) => {},
});

export const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSubMenu, setActiveSubMenu] = useState("");

  return (
    <DropdownContext.Provider value={{ activeSubMenu, setActiveSubMenu }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
