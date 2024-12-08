import React, { createContext, useState } from 'react';

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  return (
    <BagContext.Provider value={{ bagItems, setBagItems }}>
      {children}
    </BagContext.Provider>
  );
};

