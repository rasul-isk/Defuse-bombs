import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import { useEffect, useState } from 'react';
import Difficulty from './components/Difficulty';
import { Game } from './components/Game';
import InfoBox from './components/InfoBox';
import Navigation from './components/Navigation';
import Shop from './components/Shop';
import { theme } from './theme';
// import { Routes, Route } from 'react-router-dom';

function App() {
  const [play, setPlay] = useState('not started'); //not started | started | paused | finished
  const [volume, setVolume] = useState(false);
  const [information, setInformation] = useState(false);
  const [difficulty, setDifficulty] = useState('not chosen');
  const [abilities, setAbilities] = useState('not chosen');
  const [timer, setTimer] = useState('00:00');

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
  const [audio] = useState(new Audio(musicURL));
  audio.loop = true;
  audio.volume = 0.7;

  useEffect(() => {
    volume ? audio.play() : audio.pause();
  }, [volume]);

  const togglePlay = (state) => {
    setPlay(state);
    setInformation(false);
  };
  const toggleVolume = () => setVolume((prev) => !prev);
  const toggleInformation = () => {
    if (play === 'started') setPlay('paused');
    setInformation((prev) => !prev);
  };

  const restart = () => {
    setPlay('started');
    setDifficulty('not chosen');
    setTimer('00:00');
    setAbilities('not chosen');
    //magic happens and game restarts
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navigation
          difficulty={difficulty}
          information={information}
          play={play}
          restart={restart}
          volume={volume}
          togglePlay={togglePlay}
          toggleVolume={toggleVolume}
          toggleInformation={toggleInformation}
        />
        {information && <InfoBox />}
        {play === 'started' && difficulty === 'not chosen' && <Difficulty setDifficulty={setDifficulty} />}
        {play === 'started' && difficulty !== 'not chosen' && abilities === 'not chosen' && <Shop setAbilities={setAbilities} difficulty={difficulty} />}
        {play === 'started' && abilities !== 'not chosen' && <Game play={play} difficult={difficulty} timer={timer} setTimer={setTimer} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
