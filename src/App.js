import { theme } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import Navigation from './components/Navigation';
import { useState } from 'react';
import InfoBox from './components/InfoBox';
import { Game } from './components/Game';
import Difficulty from './components/Difficulty';
import Shop from './components/Shop';
// import { Routes, Route } from 'react-router-dom';

function App() {
  const [play, setPlay] = useState('not started'); //not started | started | paused | finished
  const [volume, setVolume] = useState(false);
  const [information, setInformation] = useState(false);
  const [difficulty, setDifficulty] = useState('not chosen');
  const [abilities, setAbilities] = useState('not chosen');
  const [timer, setTimer] = useState('00:00');

  const togglePlay = (state) => {
    setPlay(state);
    setInformation(false);
  };
  const toggleVolume = () => setVolume((prev) => !prev);
  const toggleInformation = () => setInformation((prev) => !prev);

  const restart = () => {
    setPlay('not started');
    setDifficulty('not chosen');
    setTimer('00:00');
    setAbilities('not chosen');
    //magic happens and game restarts
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navigation timer={timer} information={information} play={play} restart={restart} volume={volume} togglePlay={togglePlay} toggleVolume={toggleVolume} toggleInformation={toggleInformation} />
        {information && <InfoBox />}
        {play === 'started' && difficulty === 'not chosen' && <Difficulty setDifficulty={setDifficulty} />}
        {play === 'started' && difficulty !== 'not chosen' && abilities === 'not chosen' && <Shop setAbilities={setAbilities} difficulty={difficulty} />}
        {abilities !== 'not chosen' && <Game play={play} difficult={difficulty} setTimer={setTimer} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
