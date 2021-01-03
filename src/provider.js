import React, { createContext, useContext, useMemo } from "react";
import { parseDocument } from "./graphql";
import { graphQLSchemaToValidationSchema } from "./validation";

const GGFContext = React.createContext();

function useGGFContext() {
  return useContext(GGFContext);
}

function GGFProvider({
  children,
  graphQLDocument,
  validationSchemaFile,
  translate,
}) {
  const value = useMemo(() => {
    // graphQL schema
    const graphqlSchema = parseDocument(graphQLDocument);
    // validation schema
    const validationSchema = graphQLSchemaToValidationSchema(validationSchemaFile, graphqlSchema)
    console.log(validationSchema)


    return {
      graphQLDocument,
      validationSchemaFile,
      translate,
      schema: graphqlSchema,
      structs,
    };
  }, [graphQLDocument, validationSchemaFile, translate]);

  return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
export { useGGFContext };
