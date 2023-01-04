import { theme } from './theme';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'; //CssBaseline - resets CSS to defaults
import Header from './components/Header';
// import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Header title="RESCUER" subtitle="RESCUER" />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
