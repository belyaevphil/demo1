import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import { createTheme } from '../src/theme/Themes'
import { GlobalStyles } from '../src/theme/GlobalStyles'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen'
}

const theme = createTheme({})

export const decorators = [
  (Story) => (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    </Router>
  ),
];