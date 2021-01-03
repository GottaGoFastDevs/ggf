import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loader } from 'graphql.macro';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { createIntl, createIntlCache } from 'react-intl';
import messages from './compiled-lang/en.json';
import { GGFProvider } from '@ggf/ggf';
import validationSchema from './validation.json';

const theme = createMuiTheme({
	components: {
		MuiTextField: {
			defaultProps: {
				margin: 'normal',
				variant: 'outlined',
				fullWidth: true
			}
		}
	}
});

const graphQLDocument = loader('./document.graphql');

const cache = createIntlCache();

const intl = createIntl(
	{
		locale: 'en',
		messages
	},
	cache
);

function translate({ id, type, value }) {
	if (type === 'label') {
		const fieldName = id.split('.')[1];
		const words = fieldName.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
		return words.charAt(0).toUpperCase() + words.slice(1);
	}
	if (type === 'error') {
		switch (id) {
			case 'null':
				return 'Le champ ne doit pas être nul';
			case 'greaterThan':
				return 'Le nombre doit être plus grand que ' + value;
			default:
				return id;
		}
	}

	return intl.formatMessage({ id });
}

ReactDOM.unstable_createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GGFProvider graphQLDocument={graphQLDocument} validationSchema={validationSchema} translate={translate}>
				<CssBaseline />

				<App />
			</GGFProvider>
		</ThemeProvider>
	</React.StrictMode>
);

reportWebVitals();
