import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Difficulty from './scenes/Difficulty';
import { Game } from './scenes/Game';
import InfoBox from './scenes/InfoBox';
import Shop from './scenes/Shop';
import { theme } from './theme';
// import { Routes, Route } from 'react-router-dom';

function App() {
  const [play, setPlay] = useState('not started'); //not started | started | paused | finished
  const [difficulty, setDifficulty] = useState('not chosen');
  const [volume, setVolume] = useState(false);
  const [information, setInformation] = useState(false);
  const [abilities, setAbilities] = useState({
    status: 'not chosen',
    radar: 0,
    kamikaze: 0,
    fortune: 0,
  });
  const [timer, setTimer] = useState('00:00');

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
  const [audio] = useState(new Audio(musicURL));
  audio.loop = true;
  audio.volume = 0.7;

  useEffect(() => {
    difficulty === 'Crazy' && captureAbilities([0, 0, 0]);
  }, [difficulty]);

  useEffect(() => {
    volume ? audio.play() : audio.pause();
  }, [volume, audio]);

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
    setAbilities({
      status: 'not chosen',
      radar: 0,
      kamikaze: 0,
      fortune: 0,
    });
  };

  const captureAbilities = ([radar, kamikaze, fortune]) => {
    setAbilities((prev) => ({ ...prev, status: 'chosen', radar: radar, kamikaze: kamikaze, fortune: fortune }));
  };
  const useAbility = (ability) => {
    //USING ABILITY...
    setAbilities((prev) => ({ ...prev, [ability]: prev[ability] - 1 }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navigation
          timer={timer}
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
        {play === 'started' && difficulty !== 'not chosen' && difficulty !== 'Crazy' && abilities.status === 'not chosen' && <Shop captureAbilities={captureAbilities} difficulty={difficulty} />}
        {play === 'started' && abilities.status !== 'not chosen' && <Game play={play} difficulty={difficulty} timer={timer} setTimer={setTimer} abilities={abilities} useAbility={useAbility} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
