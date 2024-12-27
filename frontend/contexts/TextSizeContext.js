import React, { createContext, useContext, useState } from 'react';

// Create a Context for Text Size
const TextSizeContext = createContext();

// Custom Hook to access text size and set it
export const useTextSize = () => useContext(TextSizeContext);

// Provider Component
export const TextSizeProvider = ({ children }) => {
  const [textSize, setTextSize] = useState(18);  // Default text size

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};
