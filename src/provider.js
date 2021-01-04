import React, { createContext, useContext, useMemo } from 'react';
import { parseDocument } from './graphql';
import { addValidationToSchema } from './validation';

const GGFContext = React.createContext();

function useGGFContext() {
	return useContext(GGFContext);
}

function GGFProvider({ children, graphQLDocument, validationSchema, translate }) {
	const value = useMemo(
		() => {
			const schemaWithoutValidation = parseDocument(graphQLDocument);
			const schema = addValidationToSchema(validationSchema, schemaWithoutValidation, translate);

			return {
				schema,
				translate
			};
		},
		[ graphQLDocument, validationSchema, translate ]
	);

	return <GGFContext.Provider value={value}>{children}</GGFContext.Provider>;
}

export default GGFProvider;
export { useGGFContext };
