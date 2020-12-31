import React, { createContext, useContext, useMemo } from "react";
import { parseDocument } from "./graphql";

const GGFContext = React.createContext();

function useGGFContext() {
  return useContext(GGFContext);
}

function GGFProvider({ children, graphQLDocument, validationSchema }) {
  const value = useMemo(
    () => ({
      graphQLDocument,
      validationSchema,
      schema: parseDocument(graphQLDocument),
    }),
    [graphQLDocument, validationSchema]
  );

  return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
export { useGGFContext };
