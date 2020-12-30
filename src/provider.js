import React, { createContext, useContext } from "react";
import { parseGraphQLSchema } from "./graphql";

const GGFContext = React.createContext();

function useGGFContext() {
  return useContext(GGFContext);
}

function GGFProvider({ children, graphQLSchema, validationSchema }) {
  const value = {
    schema: parseGraphQLSchema(graphQLSchema),
  };

  return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
export { useGGFContext };
