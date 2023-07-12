import React, { createContext, useState, useEffect } from 'react';

export const FullNameContext = createContext();

export const FullNameProvider = ({ children }) => {
  const [fullName, setFullName] = useState(() => localStorage.getItem('fullName') || '');

  useEffect(() => {
    localStorage.setItem('fullName', fullName);
  }, [fullName]);

  return (
    <FullNameContext.Provider value={{ fullName, setFullName }}>
      {children}
    </FullNameContext.Provider>
  );
};