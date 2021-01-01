import React, { createContext, useContext, useMemo } from "react";
import { parseDocument } from "./graphql";

const GGFContext = React.createContext();

function useGGFContext() {
  return useContext(GGFContext);
}

function GGFProvider({
  children,
  graphQLDocument,
  validationSchema,
  translate,
}) {
  const value = useMemo(
    () => ({
      graphQLDocument,
      validationSchema,
      translate,
      schema: parseDocument(graphQLDocument),
    }),
    [graphQLDocument, validationSchema, translate]
  );

  return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
export { useGGFContext };
