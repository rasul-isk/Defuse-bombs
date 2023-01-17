import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import { useCallback, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Difficulty from './scenes/Difficulty';
import { Game } from './scenes/Game';
import InfoBox from './scenes/InfoBox';
import Shop from './scenes/Shop';
import { theme } from './theme';
// import { Routes, Route } from 'react-router-dom';

const countValue = (bombs, xy) => {
  let [x, y] = xy.split('-').map((el) => ~~el);
  // console.log(`BOMBS: ${Object.keys(bombs)}`);
  // console.log(`COORD: ${x}-${y}`);
  let possibilities = [`${x - 1}-${y}`, `${x}-${y - 1}`, `${x - 1}-${y - 1}`, `${x - 1}-${y + 1}`, `${x + 1}-${y}`, `${x}-${y + 1}`, `${x + 1}-${y + 1}`, `${x + 1}-${y - 1}`];
  // console.log(`POSS: ${possibilities}`);

  // let sum = 0;

  // for (let itr = 0; itr < possibilities.length; itr++) console.log(bombs[possibilities[itr]] === 'X' ? `EXIST BOMB ${bombs[possibilities[itr]]}` : `NO BOMB ${bombs[possibilities]}`);

  return possibilities.reduce((prev, cur) => prev + (bombs[cur] ? 1 : 0), 0).toString();
};

function App() {
  const [play, setPlay] = useState('not started'); //not started | started | paused | finished
  const [difficulty, setDifficulty] = useState('not chosen');
  const [volume, setVolume] = useState(false);
  const [information, setInformation] = useState(false);
  const [history, setHistory] = useState({});
  const [map, setMap] = useState({});
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

  const captureAbilities = useCallback(
    ([radar, kamikaze, fortune]) => {
      setAbilities((prev) => ({ ...prev, status: 'chosen', radar: radar, kamikaze: kamikaze, fortune: fortune }));

      if (Object.entries(map).length === 0) {
        let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[difficulty];
        let restFields = {};

        // 3. fill all other spaces with proper digits
        let bombs = {};
        while (Object.entries(bombs).length !== size) {
          //change calculation from array to object
          let newBomb = [Math.floor(Math.random() * size) + 1, Math.floor(Math.random() * size) + 1].join('-');
          if (Object.entries(bombs).filter((el) => el !== newBomb)) bombs[newBomb] = 'X';
        }
        // console.log(bombs);

        for (let y = 1; y <= size; y++) {
          for (let x = 1; x <= size; x++) {
            if (!bombs[`${x}-${y}`]) {
              restFields[`${x}-${y}`] = countValue(bombs, `${x}-${y}`);

              // console.log(`${x}-${y}: ` + countValue(bombs, `${x}-${y}`));
              // console.log(`BOMBS ${x}-${y}` + Object.entries(bombs));
            }
          }
        }
        // console.log(Object.entries(bombs) + '\n\n\n\n');

        setMap({ ...bombs, ...restFields });
      }
    },
    [difficulty, map]
  );

  console.log(Object.entries(map) + '\n\n\n\n');
  useEffect(() => {
    if (difficulty === 'Crazy' && abilities.status !== 'chosen') captureAbilities([0, 0, 0]);
  }, [difficulty, captureAbilities, abilities.status]);

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
    setMap({});
    setHistory({});
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
        {abilities.status !== 'not chosen' && (
          <Game
            map={map}
            play={play}
            setPlay={setPlay}
            difficulty={difficulty}
            timer={timer}
            setTimer={setTimer}
            abilities={abilities}
            useAbility={useAbility}
            history={history}
            setHistory={setHistory}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
