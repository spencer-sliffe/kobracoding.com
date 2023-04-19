import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthenticationView from './views/AuthenticationView';
import HomePageView from './views/HomePageView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route path="/" element={<AuthenticationView />} />
          <Route path="/home" element={<HomePageView />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
