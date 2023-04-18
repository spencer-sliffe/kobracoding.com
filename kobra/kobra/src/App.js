import logo from './logo.svg';
import './App.css';
import AuthenticationView from "./views/AuthenticationView";
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Or any other color you'd like to use as your primary color
    },
  },
});

function App() {
  return (
  <ThemeProvider theme={theme}>
    <Router>
      <AuthenticationView />
    </Router>
	</ThemeProvider>
  );
}

export default App;
