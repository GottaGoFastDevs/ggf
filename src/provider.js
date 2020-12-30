import React, { createContext } from "react";

const GGFContext = React.createContext();

function GGFProvider({ children, graphQLSchema, validationSchema }) {
  const value = {
    graphQLSchema,
    validationSchema,
  };

  return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
