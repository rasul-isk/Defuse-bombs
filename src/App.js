import { theme } from './theme';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'; //CssBaseline - resets CSS to defaults
import Header from './components/Header';
import { useState } from 'react';
import InfoBox from './components/InfoBox';
// import { Routes, Route } from 'react-router-dom';

function App() {
  const [play, setPlay] = useState('not started');//GAME START MECHANISM 'not started' -> 'started'->'onPause'->'finished'
  const [volume, setVolume] = useState(false);
  const [information, setInformation] = useState(false);

  const togglePlay = () => setPlay((prev) => !prev);
  const toggleVolume = () => setVolume((prev) => !prev);
  const toggleInformation = () => setInformation((prev) => !prev);

  const restart = () => {
    //magic happens and game restarts
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header play={play} restart={restart} volume={volume} togglePlay={togglePlay} toggleVolume={toggleVolume} toggleInformation={toggleInformation} />
        {information && <InfoBox />}
      </div>
    </ThemeProvider>
  );
}

export default App;
