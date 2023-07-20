import React, { createContext, useState } from "react";

const AddPostContext = createContext();

const AddPostProvider = ({ children }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <AddPostContext.Provider value={{ isAdding, setIsAdding }}>
      {children}
    </AddPostContext.Provider>
  );
};

export { AddPostContext, AddPostProvider };