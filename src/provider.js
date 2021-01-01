import React, { createContext, useContext, useMemo } from "react";
import { parseDocument } from "./graphql";
import { schemaToStructs } from "./validation";

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
  const value = useMemo(() => {
    const schema = parseDocument(graphQLDocument);
    const structs = schemaToStructs(schema);

    return {
      graphQLDocument,
      validationSchema,
      translate,
      schema,
      structs,
    };
  }, [graphQLDocument, validationSchema, translate]);

  return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
export { useGGFContext };
